process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let wash = { name: "Wash", price: 1.99 };

beforeEach(function () {
  items.push(wash);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [wash] });
  });
});

describe("GET /items/:name", () => {
  test("Get item by name", async () => {
    const res = await request(app).get(`/items/${wash.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: wash });
  });
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/icecube`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creating a item", async () => {
    const newItem = { name: "wash", price: 1.99 };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: newItem });
  });
  test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({ name: null, price: "1.99" });
    expect(res.statusCode).toBe(400);
  });
});

describe("/PATCH /items/:name", () => {
  test("Updating an item's name", async () => {
    const res = await request(app).patch(`/items/${wash.name}`).send({ name: "monster", price: 1.99 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "monster", price: 1.99 } });
  });
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app).patch(`/items/piggles`).send({ name: "Monster", price: 1.99 });
    expect(res.statusCode).toBe(404);
  });
});

describe("/DELETE /items/:name", () => {
  test("Deleting an item", async () => {
    const res = await request(app).delete(`/items/${wash.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/turkeybravo`);
    expect(res.statusCode).toBe(404);
  });
});
