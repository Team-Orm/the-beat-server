const request = require("supertest");
const app = require("../../src/app");
const mongoMemoryServer = require("../../mongoMemoryServer");
const BattleRoom = require("../../src/models/BattleRoom");
const Song = require("../../src/models/Song");

describe("GET /api/rooms", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  afterEach(async () => {
    await BattleRoom.deleteMany({});
  });

  it("returns all rooms", async () => {
    const songOne = new Song({
      notes: [],
      title: "Fake Love",
      audioURL: "https://bucketname.s3.location.amazonaws/music/fakelove",
      imageURL: "https://bucketname.s3.location.amazonaws/image/fakelove",
      artist: "BTS",
    });

    await songOne.save();

    const songTwo = new Song({
      notes: [],
      title: "왕벌의 비행",
      audioURL: "https://bucketname.s3.location.amazonaws/music/memory",
      imageURL: "https://bucketname.s3.location.amazonaws/image/memory",
      artist: "Rimsky-Korsakov",
    });

    await songTwo.save();

    const songThree = new Song({
      notes: [],
      title: "Your Song",
      audioURL: "https://bucketname.s3.location.amazonaws/music/yoursong",
      imageURL: "https://bucketname.s3.location.amazonaws/image/yoursong",
      artist: "Elton John",
    });

    await songThree.save();

    const roomOne = new BattleRoom({
      song: songOne._id,
      createdBy: "최연석",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq2",
    });

    const roomTwo = new BattleRoom({
      song: songTwo._id,
      createdBy: "복달",
      uid: "G30XEWAkD9eJTSDdluAoISMcPVC2",
    });

    const roomThree = new BattleRoom({
      song: songThree._id,
      createdBy: "송미르",
      uid: "M5ZW3tB2FQPfeQJMG97TWmyHLGQ2",
    });

    await BattleRoom.create(roomOne);
    await BattleRoom.create(roomTwo);
    await BattleRoom.create(roomThree);

    const response = await request(app).get("/api/rooms");
    expect(response.status).toEqual(200);
    expect(response.body.rooms).toHaveLength(3);

    const expectedRooms = [
      { createdBy: roomOne.createdBy, uid: roomOne.uid },
      { createdBy: roomTwo.createdBy, uid: roomTwo.uid },
      { createdBy: roomThree.createdBy, uid: roomThree.uid },
    ];

    response.body.rooms.forEach((room, index) => {
      expect(room.createdBy).toEqual(expectedRooms[index].createdBy);
      expect(room.song).toBeDefined();
      expect(room.song).toBeInstanceOf(Object);
      expect(room.uid).toEqual(expectedRooms[index].uid);
    });
  });

  it("returns an error if BattleRoom model or song field is missing", async () => {
    const songPath = BattleRoom.schema.paths.song;
    BattleRoom.schema.remove("song");

    const roomOne = new BattleRoom({
      createdBy: "최연석",
      uid: "m5zw3tb2fqpfeqjmg97twmyhlgq2",
    });

    await BattleRoom.create(roomOne);

    const response = await request(app).get("/api/rooms");

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual(
      "BattleRoom model or song field is missing",
    );

    BattleRoom.schema.add({ song: songPath });
  });
});
