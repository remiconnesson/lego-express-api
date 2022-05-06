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
      .send({
        name: "Deadpool",
        password: "secret1234",
        email: "deadpool@gmail.com",
      })
      .expect(201);
    expect(result.body).toEqual({
      name: "Deadpool",
      email: "deadpool@gmail.com",
    });
  });

  it("should add to DB with hashed password", async () => {
    const result = await request(app)
      .post("/signup")
      .send({
        name: "Geralt",
        password: "secret1234",
        email: "geralt@gmail.com",
      })
      .expect(201);

    const { id, found: account } = Accounts.findByProperty("name", "Geralt");
    const hashedPassword = account.password;
    expect(hashedPassword).not.toMatch(/secret1234/);
  });
});

/* 
TODO : Tester ce qui a été rajouté dans signups.
SIGNUP : vérifier que je ne peux pas signup avec un email déjà existant dans la BDD. // le test manquant pour tester l'unicité

TODO : Tester la route POST SIGNING

condition initiale:
http :3000/signup name=Zorro password=secret1234 email=a.b@gmail.com
les tests manuels qu'on a fait ci dessous.
http :3000/signin email=a.b@gmail.com password=""
[X] déjà automatisé : http :3000/signin email=a.b@gmail.com password=secret12345
http :3000/signin email=a.b@gmail.com password=secret1234
http :3000/signin email=a.c@gmail.com password=secret1234


*/

describe('POST /signin', () => {
  it('Ne doit pas accepter les connexions à un compte existant mais avec le mauvais mot de passe', async ()=>{

    // ATTENTION ici test@gmail.com ne doit pas exister sinon erreur non lié au code.
    const inscription = await request(app)
      .post('/signup')
      .send({email: "test@gmail.com", name: "Test", password:'secret1234'})

    const connexion = await request(app)
      .post('/signin')
      .send({email:"test@gmail.com" , password:'secret12345'})
      .expect(400)
  })
});
