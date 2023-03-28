const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/User");
const mongoMemoryServer = require("../../mongoMemoryServer");
const bcrypt = require("bcrypt");

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
    const newMockUser = {
      accessToken: "access-token",
      uid: "641df1ac5bfa32a524169098",
      name: "Charlie Brown",
      photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
    };

    const usersBefore = await User.find({});

    const response = await request(app)
      .post("/api/users/login")
      .send({
        accessToken: newMockUser.accessToken,
        uid: newMockUser.uid,
        displayName: newMockUser.name,
        photoURL: newMockUser.photoURL,
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(201);
    expect(response.body.users).toBeDefined();
    expect(response.body.token).toBeDefined();

    const usersAfter = await User.find({});
    const addedUser = await User.findOne({
      uid: newMockUser.uid,
    });

    expect(usersAfter.length).toEqual(usersBefore.length + 1);
    expect(addedUser).toBeDefined();
  });

  it("returns a 401 response with an error message if any of user data is missing", async () => {
    const invalidMockUser = {
      uid: "641df1ac5bfa32a524169098",
      name: "Charlie Brown",
      photoURL: "https://www.peanuts.com/sites/default/files/cb-color.jpg",
    };

    const response = await request(app).post("/api/users/login").send({
      uid: invalidMockUser.uid,
      displayName: invalidMockUser.name,
      photoURL: invalidMockUser.photoURL,
    });

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: "Invalid user" });
  });
});

describe("POST /api/users/logout", () => {
  it("logs out the user and returns a 204 response", async () => {
    const response = await request(app).post("/api/users/logout");

    expect(response.status).toBe(204);
    expect(response.headers["set-cookie"][0]).toContain("jwt=;");
  });
});

describe("POST api/users/local/register", () => {
  let mockUser;

  beforeAll(async () => {
    await mongoMemoryServer.connect();
    mockUser = {
      uid: "652df1ac5bfa32a524169098",
      password: "testpassword",
      displayName: "Test User",
      photoURL: "http://example/com/test.jpg",
    };
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoMemoryServer.closeDatabase();
  });

  it("returns 201 on successful registration", async () => {
    const response = await request(app).post("/api/users/local/register").send({
      uid: mockUser.uid,
      password: mockUser.password,
      displayName: mockUser.displayName,
      photoURL: mockUser.photoURL,
    });

    const userFound = await User.find({ uid: "652df1ac5bfa32a524169098" });

    expect(response.status).toEqual(201);
    expect(response.body.result).toEqual("Success");
    expect(userFound[0]).toBeDefined();
    expect(userFound[0].uid).toEqual(mockUser.uid);
    expect(userFound[0].name).toEqual(mockUser.displayName);
    expect(userFound[0].photoURL).toEqual(mockUser.photoURL);
  });
});

describe("POST /api/users/local/login", () => {
  beforeAll(async () => {
    await mongoMemoryServer.connect();

    mockUser = {
      uid: "652df1ac5bfa32a524169098",
      password: "testpassword",
      displayName: "Test User",
      photoURL: "http://example/com/test.jpg",
    };

    const password = await bcrypt.hash(mockUser.password, 10);

    await User.create({
      uid: mockUser.uid,
      password: password,
      name: mockUser.displayName,
      photoURL: mockUser.photoURL,
    });
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it("should return 201 and user info on successful login", async () => {
    const response = await request(app).post("/api/users/local/login").send({
      uid: mockUser.uid,
      password: mockUser.password,
    });

    const userFound = await User.find({ uid: mockUser.uid });

    expect(response.status).toBe(201);
    expect(response.body.user.uid).toEqual(mockUser.uid);
    expect(response.body.user.name).toEqual(mockUser.displayName);
    expect(userFound).toBeDefined();
  });

  it("should return 400 on unsuccessful login", async () => {
    const password = await bcrypt.hash(mockUser.password, 10);

    await User.create({
      uid: mockUser.uid,
      password: password,
      name: mockUser.displayName,
      photoURL: mockUser.photoURL,
    });

    const response = await request(app).post("/api/users/local/login").send({
      password: "wrongpassword",
      uid: mockUser.uid,
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      "No user with that email or password",
    );
  });
});

describe("DELETE /api/users/delete", () => {
  let mockUser;
  beforeAll(async () => {
    await mongoMemoryServer.connect();
    mockUser = {
      uid: "652df1ac5bfa32a524169098",
      password: "testpassword",
      name: "Test User",
      photoURL: "http://example/com/test.jpg",
    };

    await User.create(mockUser);
  });

  afterAll(async () => {
    await mongoMemoryServer.closeDatabase();
  });

  it("deletes the user and return 204 code", async () => {
    const userBefore = await User.findOne({ uid: mockUser.uid });

    const response = await request(app).delete("/api/users/delete").send({
      email: mockUser.uid,
    });

    const userAfter = await User.findOne({ uid: mockUser.uid });

    expect(response.status).toEqual(204);
    expect(userBefore).toBeDefined();
    expect(userAfter).toEqual(null);
  });
});
