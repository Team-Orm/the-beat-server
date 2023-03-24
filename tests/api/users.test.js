const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/User");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

describe("POST /api/users/login", () => {
  let createdUser;

  afterAll(async () => {
    await User.findByIdAndDelete(createdUser.uid);
  });

  describe("when user data is valid", () => {
    it("returns a 201 response with all users and a token if the user does not already exist", async () => {
      const accessToken = jwt.sign(
        { uid: "641df1ac5bfa32a524169098" },
        secretKey,
      );

      const response = await request(app).post("/api/users/login").send({
        accessToken,
        uid: "641df1ac5bfa32a524169098",
        displayName: "Charlie Brown",
        photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
      });

      expect(response.status).toBe(201);
      expect(response.body.users).toBeDefined();
      expect(response.body.token).toBeDefined();

      createdUser = await User.findOne({ uid: "641df1ac5bfa32a524169098" });
      expect(createdUser).toBeDefined();
      expect(createdUser.name).toBe("Charlie Brown");
      expect(createdUser.photoURL).toBe(
        "https://www.peanuts.com/sites/default/files/cb-color.jpg",
      );
    });
  });

  describe("when user data is invalid", () => {
    it("returns a 401 response with an error message if any of user data is missing", async () => {
      const response = await request(app).post("/api/users/login").send({
        uid: "641df1ac5bfa32a524169098",
        displayName: "Charlie Brown",
        photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Invalid user" });
    });
  });
});
