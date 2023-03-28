const request = require("supertest");
const app = require("../../src/app");
const appTest = require("../../app.test");
const mongoMemoryServer = require("../../mongoMemoryServer");
const BattleRoom = require("../../src/models/BattleRoom");
const Song = require("../../src/models/Song");
const Note = require("../../src/models/Note");

describe("GET /api/rooms", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
    await BattleRoom.deleteMany({});
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  beforeEach(async () => {
    const songOne = {
      title: "Fake Love",
      audioURL: "https://bucketname.s3.location.amazonaws/music/fakelove",
      imageURL: "https://bucketname.s3.location.amazonaws/image/fakelove",
      artist: "BTS",
    };

    const songTwo = {
      title: "왕벌의 비행",
      audioURL: "https://bucketname.s3.location.amazonaws/music/memory",
      imageURL: "https://bucketname.s3.location.amazonaws/image/memory",
      artist: "Rimsky-Korsakov",
    };

    const songThree = {
      title: "Your Song",
      audioURL: "https://bucketname.s3.location.amazonaws/music/yoursong",
      imageURL: "https://bucketname.s3.location.amazonaws/image/yoursong",
      artist: "Elton John",
    };

    await Song.create(songOne);
    await Song.create(songTwo);
    await Song.create(songThree);

    const addedSongOne = await Song.findOne({
      title: "Fake Love",
    });

    const addedSongTwo = await Song.findOne({
      title: "왕벌의 비행",
    });

    const addedSongThree = await Song.findOne({
      title: "Your Song",
    });

    const roomOne = {
      song: addedSongOne._id,
      createdBy: "최연석",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq2",
    };

    const roomTwo = {
      song: addedSongTwo._id,
      createdBy: "복달",
      uid: "G30XEWAkD9eJTSDdluAoISMcPVC2",
    };

    const roomThree = {
      song: addedSongThree._id,
      createdBy: "송미르",
      uid: "M5ZW3tB2FQPfeQJMG97TWmyHLGQ2",
    };

    await BattleRoom.create(roomOne);
    await BattleRoom.create(roomTwo);
    await BattleRoom.create(roomThree);
  });

  afterEach(async () => {
    await Song.deleteMany({});
    await BattleRoom.deleteMany({});
  });

  it("returns all the existing battle rooms", async () => {
    const response = await request(app).get("/api/rooms");
    expect(response.status).toEqual(200);
    expect(response.body.rooms).toHaveLength(3);

    const expectedRooms = await BattleRoom.find({});

    response.body.rooms.forEach((room, index) => {
      expect(room.createdBy).toEqual(expectedRooms[index].createdBy);
      expect(room.song).toBeDefined();
      expect(room.song).toBeInstanceOf(Object);
      expect(room.uid).toEqual(expectedRooms[index].uid);
    });
  });

  it("returns an error if BattleRoom model or song field is missing", async () => {
    const sampleRoom = {
      song: "invalidId",
      createdBy: "anonymous",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq5",
    };

    try {
      await BattleRoom.create(sampleRoom);
    } catch (err) {
      const errorMessage = err;
      expect(errorMessage).toBeDefined();
    }
  });
});

describe("GET /api/rooms/new", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
  });

  afterAll(async () => {
    await Song.deleteMany();
    await mongoMemoryServer.closeDatabase();
  });

  it("returns a list of songs with their corresponding audio and image URLs", async () => {
    const response = await request(appTest).get("/api/rooms/new");

    expect(response.status).toBe(200);
    expect(response.body.songs.length).toEqual(3);
    response.body.songs.forEach((song) => {
      expect(song).toHaveProperty("_id");
      expect(song).toHaveProperty("title");
      expect(typeof song.title).toEqual("string");
      expect(song.title.length).toBeGreaterThan(1);
      expect(song).toHaveProperty("audioURL");
      expect(song).toHaveProperty("imageURL");
      expect(song).toHaveProperty("artist");
      expect(typeof song.artist).toEqual("string");
      expect(song.artist.length).toBeGreaterThan(1);
    });
  });
});

describe("POST /api/rooms/new", () => {
  let addedSong;

  beforeAll(async () => {
    await mongoMemoryServer.connect();

    const testSong = {
      title: "Billie Jean",
      audioURL: "https://bucketname.s3.location.amazonaws/music/billiejean",
      imageURL: "https://bucketname.s3.location.amazonaws/image/billiejean",
      artist: "Micheal Jackson",
    };

    await Song.create(testSong);

    addedSong = await Song.findOne({
      title: "Billie Jean",
    });
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  afterEach(async () => {
    await BattleRoom.deleteMany({});
  });

  it("creates a new battle room with valid request data and returns 201 status code", async () => {
    const roomListBefore = await BattleRoom.find({});

    const newRoom = {
      song: addedSong._id,
      createdBy: "artist",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq3",
    };

    const response = await request(appTest)
      .post("/api/rooms/new")
      .send(newRoom);

    const roomListAfter = await BattleRoom.find({});

    const addedRoom = await BattleRoom.find({
      uid: newRoom.uid,
    });

    expect(response.status).toEqual(201);
    expect(addedRoom).toBeDefined();
    expect(roomListAfter.length).toEqual(roomListBefore.length + 1);
  });

  it("returns a 400 status when the request body is missing a field", async () => {
    const newRoom = {
      song: addedSong._id,
      createdBy: "artist",
    };

    const response = await request(appTest)
      .post("/api/rooms/new")
      .send(newRoom);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "Invalid requested body" });
  });
});

describe("GET /api/rooms/:roomId", () => {
  let idFound;

  beforeAll(async () => {
    await mongoMemoryServer.connect();
    const sampleSong = {
      title: "Billie Jean",
      audioURL: "https://bucketname.s3.location.amazonaws/music/billiejean",
      imageURL: "https://bucketname.s3.location.amazonaws/image/billiejean",
      artist: "Micheal Jackson",
    };

    await Song.create(sampleSong);

    const addedSong = await Song.findOne({
      title: sampleSong.title,
    });

    const newNote = {
      title: sampleSong.title,
      note: [
        {
          time: 0.2,
          key: "s",
          positionY: 0,
        },
        {
          time: 0.3,
          key: "d",
          positionY: 0,
        },
      ],
    };

    await Note.create(newNote);

    const newRoom = {
      song: addedSong._id,
      createdBy: "artist",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq3",
    };

    await BattleRoom.create(newRoom);

    const roomIdFound = await BattleRoom.findOne({
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq3",
    });

    idFound = roomIdFound._id.toString();
  });

  afterAll(async () => {
    await Song.deleteMany({});
    await BattleRoom.deleteMany({});
    await Note.deleteMany({});
    await mongoMemoryServer.closeDatabase();
  });

  it("returns a 400 error when given an invalid roomId", async () => {
    const response = await request(appTest).get("/api/rooms/invalidId");

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Invalid URL");
  });

  it("returns a room, song, and note when given a valid roomId", async () => {
    const response = await request(appTest).get(`/api/rooms/${idFound}`);

    expect(response.status).toEqual(200);
    expect(response.body.song).toBeDefined();
    expect(response.body.room).toBeDefined();
    expect(response.body.note).toBeDefined();
  });
});

describe("DELETE /api/rooms/:roomId", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();

    const testSong = {
      title: "Hey Ya!",
      audioURL: "https://bucketname.s3.location.amazonaws/music/heyya",
      imageURL: "https://bucketname.s3.location.amazonaws/image/heyya",
      artist: "OutKast",
    };

    await Song.create(testSong);

    const addedSongOne = await Song.findOne({
      title: "Hey Ya!",
    });

    const testRoom = {
      song: addedSongOne._id,
      createdBy: "도레미",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq7",
    };

    await BattleRoom.create(testRoom);
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  it("deletes a battle room and return 204 status code", async () => {
    const roomIdFound = await BattleRoom.findOne({
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq7",
    });

    const idFound = roomIdFound._id.toString();

    const response = await request(appTest).delete(`/api/rooms/${idFound}`);
    const deletedRoom = await BattleRoom.findOne({
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq7",
    });

    expect(response.status).toEqual(204);
    expect(deletedRoom).toEqual(null);
  });

  it("returns 400 status code if invalid roomId is provided", async () => {
    const response = await request(appTest).delete(
      `/api/rooms/invalid-room-id`,
    );
    expect(response.status).toBe(400);
  });
});
