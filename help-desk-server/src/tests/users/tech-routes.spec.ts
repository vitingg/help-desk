import request from "supertest";
import app from "@src/server";

describe("tech tests", () => {
  let cookie: string;
  let createdTechId: number;

  beforeAll(async () => {
    const login = await request(app).post("/sign-in").send({
      email: "Admin@gmail.com",
      password: "AdminPassword",
    });

    cookie = login.headers["set-cookie"][0];
  });

  it("should create a new tech", async () => {
    const response = await request(app)
      .post("/techs")
      .set("Cookie", `${cookie}`)
      .send({
        username: "Test tech",
        email: "testtech@gmail.com",
        password: "testtech",
      });

    expect(response.status).toBe(201);
    createdTechId = await response.body.id;
    expect(response.body.username).toBe("Test tech");
  });

  it("should get all techs", async () => {
    const res = await request(app).get("/techs");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should update the tech", async () => {
    const updatedData = {
      username: "Updated Test tech",
      email: "updatedtech@gmail.com",
    };

    const res = await request(app)
      .put(`/techs/${createdTechId}`)
      .set("Cookie", cookie)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe(updatedData.username);
  });

  it("should delete the tech", async () => {
    const response = await request(app)
      .delete(`/techs/${createdTechId}`)
      .set("Cookie", `${cookie}`);

    expect(response.status).toBe(200);
  });
});
