const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");
const User = require("../../src/models/User");
const mongoMemoryServer = require("../../mongoMemoryServer");
const verifyToken = require("../../src/routes/middlewares/verifyToken");

describe("verifyToken middleware", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("returns 403 status code when no token is provided", async () => {
    const response = await request(app)
      .get("/api/rooms/new")
      .set("authorization", "Bearer ");
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Unauthorized user");
  });

  it("passes through to next middleware when token is valid", async () => {
    const mockUser = {
      uid: "641df1ac5bfa32a524169090",
      name: "Charlie Black",
      photoURL: "https://www.pbb/cb-color.jpg",
    };

    await User.create(mockUser);

    const loginResponse = await request(app)
      .post("/api/users/local/login")
      .send({
        uid: mockUser.uid,
        name: mockUser.name,
        photoURL: mockUser.photoURL,
      });

    const token = loginResponse.body.token;

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {
      send: jest.fn(),
    };

    const next = jest.fn();

    jest.spyOn(jwt, "verify").mockReturnValueOnce(mockUser.uid);

    await verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();

    expect(res.send).not.toHaveBeenCalled();
  });
});
