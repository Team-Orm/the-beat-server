const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");
const verifyToken = require("../../src/routes/middlewares/verifyToken");

describe("verifyToken middleware", () => {
  it("returns 403 status code when no token is provided", async () => {
    const response = await request(app)
      .get("/api/rooms/new")
      .set("authorization", "Bearer ");
    expect(response.status).toEqual(403);
    expect(response.body.message).toEqual("Unauthorized user");
  });

  it("passes through to next middleware when token is valid", () => {
    const req = {
      headers: {
        authorization: "Bearer validtoken",
      },
    };

    const res = {
      send: jest.fn(),
    };

    const next = jest.fn();

    jest
      .spyOn(jwt, "verify")
      .mockReturnValueOnce({ uid: "652df1ac5bfa32a524169098" });

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();

    expect(res.send).not.toHaveBeenCalled();
  });
});
