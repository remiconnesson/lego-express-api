const { app, Accounts } = require("../app");
const request = require("supertest");

describe("POST /signup", () => {
  it.each([
    { name: "AZ", password: "azertez" },
    { pass: "secret23", name: "dqsdqsdq" },
    { name: "", password: "" },
    { name: 123, password: "azertyuioiuy" },
    { name: "PasdeMotpasse" },
    { password: "PasdeName" },
  ])("should refuse %p without inserting it.", async (invalidObject) => {
    const idDébutTest = Accounts.id;
    const result = await request(app)
      .post("/signup")
      .send(invalidObject)
      .expect(400);
    const idFinTest = Accounts.id;
    expect(idFinTest).toBe(idDébutTest);
  });

  it("should add to DB and return username without password", async () => {
    const id = Accounts.id;
    expect(Accounts.exists(id)).toBe(false);
    const result = await request(app)
      .post("/signup")
      .send({ name: "Deadpool", password: "secret1234" })
      .expect(201);
    expect(Accounts.exists(id)).toBe(true);
    expect(Accounts.getOne(id)).toEqual({
      name: "Deadpool",
      password: "secret1234",
    });
    expect(result.body).toEqual({ name: "Deadpool" });
  });
});
