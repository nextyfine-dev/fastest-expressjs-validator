import request from "supertest";
import app from "./app";
import mockData from "./app.mock";

describe("Testing fastest expressjs validator middleware", () => {
  it("Should return 200 status code with valid query", async () => {
    const { name } = mockData.query;
    const res = await request(app).get(`/?name=${name}`);
    expect(res.statusCode).toEqual(200);
  });
  it("Should return 422 status code without query while validate query", async () => {
    const res = await request(app).get(`/`);
    expect(res.statusCode).toEqual(422);
  });

  it("Should return 200 status code with valid body", async () => {
    const res = await request(app).post("/login").send(mockData.body);
    expect(res.statusCode).toEqual(200);
  });

  it("Should return 422 status code without body", async () => {
    const res = await request(app).post("/login");
    expect(res.statusCode).toEqual(422);
  });

  it("Should return 422 status code without valid body", async () => {
    const res = await request(app)
      .post("/login")
      .send({ ...mockData.body, test: false });
    expect(res.statusCode).toEqual(422);
  });

  it("Should return 200 status code with valid params", async () => {
    const res = await request(app).get(`/getUser/${mockData.param}`);
    expect(res.statusCode).toEqual(200);
  });
  it("Should return 404 status code without params", async () => {
    const res = await request(app).get(`/getUser`);
    expect(res.statusCode).toEqual(404);
  });

  it("Should return 201 status code with valid body and query", async () => {
    const res = await request(app)
      .post(`/signup?randomStr=${mockData.query.randomStr}`)
      .send(mockData.body);
    expect(res.statusCode).toEqual(201);
  });

  it("Should return 422 status code without valid body and query", async () => {
    const res = await request(app)
      .post(`/signup?randomStr=${mockData.query.randomStr}&test=false`)
      .send({ ...mockData.body, test: false });
    expect(res.statusCode).toEqual(422);
  });

  it("Should return 422 status code without body and query", async () => {
    const res = await request(app).post(`/signup`);
    expect(res.statusCode).toEqual(422);
  });

  it("Should return 200 status code with valid header and param", async () => {
    const res = await request(app)
      .post(`/headers/${mockData.param}`)
      .set(mockData.headers);
    console.log('res.text :>> ', res.text);
    expect(res.statusCode).toEqual(200);
  });

  it("Should return 422 status code without header", async () => {
    const res = await request(app).post(`/headers/${mockData.param}`);
    expect(res.statusCode).toEqual(422);
  });
});
