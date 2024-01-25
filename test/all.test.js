const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js");
const portfinder = require("portfinder");

describe("ALL", () => {
  let server;
  let port;
  let userId;
  let commentId;
  let profileId;

  beforeAll(async () => {
    port = await portfinder.getPortPromise();
    server = app.listen(port);
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  it("should create a new profile", async () => {
    const profile = {
      name: "Luiz Happy",
      description: "Luiz is a nice guy",
      mbti: "ISFJ",
      enneagram: "9w3",
      variant: "sp/so",
      tritype: 725,
      socionics: "SEE",
      sloan: "RCOEN",
      psyche: "FEVL",
    };
    const response = await request(app).post("/profile").send(profile);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Profile created");

    profileId = response.body.data.id;
  }, 100000);

  it("should get a specific profile", async () => {

    const response = await request(server).get(`/profile/${profileId}`);

    expect(response.status).toBe(200);
  }, 100000);

  it("should create a new user", async () => {
    const response = await request(app).post("/user").send({ name: "luiz" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created");
    expect(response.body.data.name).toBe("luiz");

    userId = response.body.data.id;
  }, 100000);

  it("should not create a user without name", async () => {
    const response = await request(app).post("/user").send({});

    expect(response.status).toBe(422);
  });

  it("should create a new comment", async () => {
    const response = await request(server)
      .post("/comment")
      .send({ userId, comment: "Test Comment" });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Commennt created");
    expect(response.body.data).toHaveProperty("comment", "Test Comment");

    commentId = response.body.data.id;
  }, 100000);

  it("should get comments with sorting", async () => {
    const response = await request(server).get(`/comment/${userId}?sortBy=new`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0]).toHaveProperty("comment", "Test Comment");
  }, 100000);

  it("should like a comment", async () => {
    const response = await request(server).put(`/comment/like`).send({
      commentId,
      userId,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Commennt liked");
  }, 100000);

  it("should unlike a comment", async () => {
    const response = await request(server).put(`/comment/unlike`).send({
      commentId,
      userId,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Commennt unliked");
  });
});
