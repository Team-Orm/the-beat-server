const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/User");
const mongoMemoryServer = require("../../mongoMemoryServer");

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  beforeEach(async () => {
    const mockUser = {
      accessToken: "access-token",
      uid: "641df1ac5bfa32a524169090",
      name: "Charlie Black",
      photoURL: "https://www.pbb/cb-color.jpg",
    };

    await User.create(mockUser);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("returns a 201 response with all users and a token if the user does not exist", async () => {
    const mockUser = {
      accessToken: "access-token",
      uid: "641df1ac5bfa32a524169098",
      name: "Charlie Brown",
      photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
    };

    const usersBefore = await User.find({});

    const response = await request(app)
      .post("/api/users/login")
      .send({
        accessToken: mockUser.accessToken,
        uid: mockUser.uid,
        displayName: mockUser.name,
        photoURL: mockUser.photoURL,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    expect(response.body.users).toBeDefined();
    expect(response.body.token).toBeDefined();

    const usersAfter = await User.find({});
    const addedUser = await User.findOne({
      uid: mockUser.uid,
    });

    expect(usersAfter.length).toEqual(usersBefore.length + 1);
    expect(addedUser).toBeDefined();
  });

  it("return a 401 response with an error message if any of user data is missing", async () => {
    const mockUser = {
      uid: "641df1ac5bfa32a524169098",
      name: "Charlie Brown",
      photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
    };

    const response = await request(app).post("/api/users/login").send({
      uid: mockUser.uid,
      displayName: mockUser.name,
      photoURL: mockUser.photoURL,
    });

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: "Invalid user" });
  });
});
