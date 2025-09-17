import request from "supertest";
import app from "@src/server";

describe("category tests", () => {
  let categoryId: number;

  it("should create a new category", async () => {
    const response = await request(app).post("/category").send({
      name: "Test category",
      basePrice: 100,
    });

    expect(response.status).toBe(201);
    categoryId = await response.body.id;
  });
  it("should get the categories", async () => {
    const response = await request(app).get("/available-categories");
    expect(response.status).toBe(200);
  });
  it("should get only active categories for clients", async () => {
    const response = await request(app).get("/available-categories");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((cat: any) => {
      expect(cat.isActive).toBe(true);
    });
  });
  it("should return an error when creating a category with missing name", async () => {
    const response = await request(app).post("/category").send({
      basePrice: 100,
    });
    expect(response.status).toBe(400);
  });
  it("should return 400 when trying to toggle a non-existent category", async () => {
    const response = await request(app).put(`/category/toggle/999999`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Fail on search for category!");
  });
  it("should return 400 when trying to update a non-existent category", async () => {
    const response = await request(app).put(`/category/999999`).send({
      name: "Non-existent",
      basePrice: 99,
    });
    expect(response.status).toBe(400);
  });
  it("should delete the category", async () => {
    const response = request(app).delete(`/category/${categoryId}`);
    expect((await response).status).toBe(200);
  });

});
