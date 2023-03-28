const request = require("supertest");
const app = require("../../src/app");

describe("GET /proxy/audio-server", () => {
  it("returns audio data as buffer", async () => {
    const audioURL = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/music/Samurai-Techno-by-fizzd/music.mp3`;

    const response = await request(app).get(
      `/proxy/audio-server?url=${audioURL}`,
    );

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("audio/mpeg");
    expect(response.body).toBeInstanceOf(Buffer);
  });

  it("returns 400 error if missing audio URL", async () => {
    const response = await request(app).get("/proxy/audio-server?url=");

    expect(response.status).toBe(400);
    expect(response.text).toBe("Missing audio URL");
  });
});
