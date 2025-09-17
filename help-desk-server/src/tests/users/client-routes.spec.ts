import request from "supertest";
import app from "@src/server";

describe("client tests", () => {
  let createdClientId: string;
  it("should create a new client", async () => {
    const response = await request(app).post("/clients").send({
      username: "Teste new client",
      email: "testnewclient@gmail.com",
      password: "testnewclient",
    });

    expect(response.status).toBe(201);
    createdClientId = await response.body.id;
  });

  it("should put the client", async () => {
    const updateUser = {
      username: "Teste New Client",
      email: "testnewclient@gmail.com",
    };

    const response = await request(app)
      .put(`/clients/${createdClientId}`)
      .send(updateUser);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("id", createdClientId);
    expect(response.body.user).toHaveProperty(
      "username",
      updateUser.username
    );
    expect(response.body.user).toHaveProperty("email", updateUser.email);
  });

  it("should delete the client", async () => {
    const response = await request(app).delete(`/clients/${createdClientId}`);
    expect(response.status).toBe(200);
  });
});
