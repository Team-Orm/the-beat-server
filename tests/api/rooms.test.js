const request = require("supertest");
const app = require("../../src/app");
const mongoMemoryServer = require("../../mongoMemoryServer");
const BattleRoom = require("../../src/models/BattleRoom");
const Song = require("../../src/models/Song");

describe("Room Test /api/rooms", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  beforeEach(async () => {
    const songOne = {
      notes: [],
      title: "Fake Love",
      audioURL: "https://bucketname.s3.location.amazonaws/music/fakelove",
      imageURL: "https://bucketname.s3.location.amazonaws/image/fakelove",
      artist: "BTS",
    };

    const songTwo = {
      notes: [],
      title: "왕벌의 비행",
      audioURL: "https://bucketname.s3.location.amazonaws/music/memory",
      imageURL: "https://bucketname.s3.location.amazonaws/image/memory",
      artist: "Rimsky-Korsakov",
    };

    const songThree = {
      notes: [],
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

    const roomOne = new BattleRoom({
      song: addedSongOne._id,
      createdBy: "최연석",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq2",
    });

    const roomTwo = new BattleRoom({
      song: addedSongTwo._id,
      createdBy: "복달",
      uid: "G30XEWAkD9eJTSDdluAoISMcPVC2",
    });

    const roomThree = new BattleRoom({
      song: addedSongThree._id,
      createdBy: "송미르",
      uid: "M5ZW3tB2FQPfeQJMG97TWmyHLGQ2",
    });

    await BattleRoom.create(roomOne);
    await BattleRoom.create(roomTwo);
    await BattleRoom.create(roomThree);
  });

  afterEach(async () => {
    await Song.deleteMany({});
    await BattleRoom.deleteMany({});
  });

  it("GET /api/rooms", async () => {
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
    await BattleRoom.deleteMany({});
    const sampleRoom = new BattleRoom({
      song: "invalidId",
      createdBy: "최연소",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq5",
    });

    try {
      await BattleRoom.create(sampleRoom);
    } catch (e) {
      const errorMessage = e;
      expect(errorMessage).toBeDefined();
    }
  });
});
