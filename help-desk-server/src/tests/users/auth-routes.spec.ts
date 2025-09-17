import request from "supertest";
import app from "@src/server";

describe("should sign-in", () => {
  let cookie: string;
  beforeAll(async () => {
    const login = await request(app).post("/sign-in").send({
      email: "Admin@gmail.com",
      password: "AdminPassword",
    });
    cookie = login.headers["set-cookie"][0];
    expect(login.status).toBe(200);
  });
  it("should verify if the users keep logged.", async () => {
    const check = await request(app).get("/me").set("Cookie", cookie);
    expect(check.status).toBe(200);
    expect(check.body.role).toBe("ADMIN")
  });
  afterAll(async () => {
    const logout = await request(app).post("/sign-out").send();
    expect(logout.status).toBe(200);
  });
});
