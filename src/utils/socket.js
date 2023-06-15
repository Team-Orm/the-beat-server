const BattleRoom = require("../models/BattleRoom");
const {
  UPDATE_ROOMS,
  SEND_CHAT,
  BROADCAST_CHAT,
  UPDATE_USER,
  LOBBY_ROOMS,
  BEAT,
  RECEIVE_LOBBY_USERS,
  ROOM_FULL,
  SEND_CONNECT,
  DELETE_ROOM,
  RECEIVE_DELETE,
  OPPONENT_KEY_PRESS,
  RECEIVE_OPPONENT_KEY_PRESS,
  OPPONENT_KEY_RELEASE,
  RECEIVE_OPPONENT_KEY_RELEASE,
  RECEIVE_USER,
  SEND_START,
  RECEIVE_START,
  SEND_READY,
  RECEIVE_READY,
  SEND_BATTLES,
  RECEIVE_BATTLES,
  FROM_BATTLEROOM,
  SEND_USER,
  USER_LEFT,
  SEND_RESULTS,
  RECEIVE_RESULTS,
} = require("../constants/eventName");

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.SECRET_MONGODB_ID;

module.exports = function setupSocketServer(io) {
  const battles = io.of("/battles/");
  const results = io.of("/results/");
  const battleRooms = {};
  const usersInRoom = {};
  let usersInLobby = {};

  (async () => {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(BEAT);
    const collection = db.collection("battlerooms");

    const changeStream = collection.watch();

    changeStream.on("change", async () => {
      try {
        const rooms = await BattleRoom.find().populate("song");

        io.of("/").emit(UPDATE_ROOMS, rooms);
      } catch (err) {
        next(err);
      }
    });
  })();

  io.on("connection", (socket) => {
    const { displayName, photoURL, uid } = socket.handshake.query;
    socket.join(uid);

    if (!usersInLobby[uid]) {
      usersInLobby = {
        ...usersInLobby,
        [uid]: { displayName, photoURL },
      };
    }

    const convertedRooms = Object.keys(battleRooms).reduce((acc, key) => {
      acc[key] = { users: Array.from(battleRooms[key].users) };
      return acc;
    }, {});

    io.emit(LOBBY_ROOMS, convertedRooms);

    socket.on(RECEIVE_LOBBY_USERS, () => {
      io.emit(LOBBY_ROOMS, convertedRooms);
      io.emit(UPDATE_USER, Object.values(usersInLobby));
    });

    socket.on(SEND_CHAT, ({ user, chat }) => {
      io.emit(BROADCAST_CHAT, user, chat);
    });

    socket.on("reconnect", () => {
      if (!usersInLobby[uid]) {
        usersInLobby = {
          ...usersInLobby,
          [uid]: { displayName, photoURL },
        };
        io.emit(UPDATE_USER, Object.values(usersInLobby));
      }
    });

    socket.on("disconnect", () => {
      const { uid } = socket.handshake.query;
      delete usersInLobby[uid];

      io.emit(UPDATE_USER, Object.values(usersInLobby));
    });
  });

  battles.on("connection", (socket) => {
    const { photoURL, displayName, uid, roomId } = socket.handshake.query;
    socket.join(roomId);

    const user = { photoURL, displayName, uid };

    const room = battleRooms[roomId] || { users: new Set() };
    room.users.add(uid);
    battleRooms[roomId] = room;

    if (room.users.size > 2) {
      socket.emit(ROOM_FULL);
      socket.leave(roomId);
      return;
    }

    const convertedRooms = Object.keys(battleRooms).reduce((acc, key) => {
      acc[key] = { users: Array.from(battleRooms[key].users) };
      return acc;
    }, {});

    if (!usersInRoom[roomId]) {
      usersInRoom[roomId] = [];
    }
    usersInRoom[roomId].push(user);

    socket.on(SEND_CONNECT, () => {
      io.emit(LOBBY_ROOMS, convertedRooms);
    });

    socket.on(SEND_USER, () => {
      socket.to(roomId).emit(RECEIVE_USER, usersInRoom[roomId]);
    });

    socket.on(DELETE_ROOM, () => {
      socket.to(roomId).emit(RECEIVE_DELETE);
    });

    socket.on(OPPONENT_KEY_PRESS, (key) => {
      socket.to(roomId).emit(RECEIVE_OPPONENT_KEY_PRESS, key);
    });

    socket.on(OPPONENT_KEY_RELEASE, (key) => {
      socket.to(roomId).emit(RECEIVE_OPPONENT_KEY_RELEASE, key);
    });

    socket.on(SEND_START, () => {
      socket.to(roomId).emit(RECEIVE_START);
    });

    socket.on(SEND_READY, () => {
      socket.to(roomId).emit(RECEIVE_READY);
    });

    socket.on(SEND_BATTLES, (score, combo, word) => {
      socket.to(roomId).emit(RECEIVE_BATTLES, score, combo, word);
    });

    io.of("/").emit(FROM_BATTLEROOM, convertedRooms);

    socket.on("disconnect", () => {
      const { uid, roomId } = socket.handshake.query;
      room.users.delete(uid);
      battleRooms[roomId] = room;

      usersInRoom[roomId] = usersInRoom[roomId].filter((u) => u.uid !== uid);

      socket.to(roomId).emit(USER_LEFT, uid);
      socket.to(roomId).emit(RECEIVE_BATTLES, null);
    });
  });

  results.on("connection", (socket) => {
    const { photoURL, displayName, uid, resultId } = socket.handshake.query;
    socket.join(resultId);

    const user = { photoURL, displayName, uid };

    socket.on(SEND_RESULTS, (comboResults, totalScore) => {
      socket.to(resultId).emit(RECEIVE_RESULTS, comboResults, totalScore, user);
    });

    socket.on("disconnect", () => {
      delete usersInRoom[resultId];
    });
  });
};
