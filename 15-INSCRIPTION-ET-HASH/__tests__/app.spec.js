const { app, Accounts } = require("../app");
const request = require("supertest");

describe("POST /signup", () => {
  it.each([{ name: "PasdeMotpasse" }, { password: "PasdeName" }])(
    "should refuse %p without inserting it.",
    async (invalidObject) => {
      const idDébutTest = Accounts.id;
      const result = await request(app)
        .post("/signup")
        .send(invalidObject)
        .expect(400);
      const idFinTest = Accounts.id;
      expect(idFinTest).toBe(idDébutTest);
    }
  );

  it("should add to DB and return username without password", async () => {
    const result = await request(app)
      .post("/signup")
      .send({ name: "Deadpool", password: "secret1234" })
      .expect(201);
    expect(result.body).toEqual({ name: "Deadpool" });
  });

  it("should add to DB with hashed password", async () => {
    const result = await request(app)
      .post("/signup")
      .send({ name: "Geralt", password: "secret1234" })
      .expect(201);

    const {id, found:account } = Accounts.findByProperty("name", "Geralt")
    const hashedPassword = account.password;
    // Je vérifie que le HashedPassword ne contient pas le mots de passe original.
    expect(hashedPassword).not.toMatch(/secret1234/); 
  });
});
