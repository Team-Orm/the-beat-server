const request = require("supertest");
const app = require("../../src/app");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/User");
const mongoMemoryServer = require("../../mongoMemoryServer");

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  const mockUser = {
    uid: "641df1ac5bfa32a524169098",
    name: "Charlie Brown",
    photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
  };

  jest.mock("../../src/routes/middlewares/verifyToken", () => {
    return jest.fn((req, res, next) => {
      req.user = { accessToken: "mocked-token" };
      next();
    });
  });

  it("returns a 201 response with all users and a token if the user does not exist", async () => {
    jest.spyOn(jwt, "sign").mockReturnValue("mocked-token");
    const user = new User(mockUser);
    await user.save();

    const response = await request(app)
      .post("/api/users/login")
      .send({
        accessToken: "mocked-access-token",
        uid: mockUser.uid,
        displayName: mockUser.name,
        photoURL: mockUser.photoURL,
      })
      .set("Authorization", "Bearer mocked-token")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    expect(response.body.users).toBeDefined();
    expect(response.body.token).toEqual("mocked-token");

    const users = await User.find({});
    expect(users.length).toEqual(1);
    expect(users[0].uid).toEqual(mockUser.uid);
    expect(users[0].name).toEqual(mockUser.name);
    expect(users[0].photoURL).toEqual(mockUser.photoURL);
  });

  it("return a 401 response with an error message if any of user data is missing", async () => {
    const response = await request(app).post("/api/users/login").send({
      uid: mockUser.uid,
      displayName: mockUser.name,
      photoURL: mockUser.photoURL,
    });

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: "Invalid user" });
  });
});
