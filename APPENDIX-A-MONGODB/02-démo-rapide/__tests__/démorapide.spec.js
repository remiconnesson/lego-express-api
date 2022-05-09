const { connexion, déconnexion, User } = require("../démorapide");
const mongoose = require("mongoose");

describe("User model", () => {
  const userAvantMongoose = {
    name: "Alice",
    age: "34",
    country: "fRaNcE",
    pasDansLeSchema: "Cette propriété ne doit pas être insérée dans MongoDB",
  };

  beforeAll(async () => {
    await connexion();
  });

  afterAll(async () => {
    await User.remove({});
    await déconnexion();
  });

  test("les propriétés non présentes dans le Schéma ne doivent pas être présentes dans les documents", () => {
    const user = User(userAvantMongoose);

    expect("pasDansLeSchema" in user).not.toBe(true);
  });

  test("Le pays (qui dans le schema est annoté comme lowercase:true) doit être en minuscule", () => {
    const user = User(userAvantMongoose);

    expect(user.country).toBe("france");
  });

  test("L'age doit être un nombre.", () => {
    const user = User(userAvantMongoose);

    expect(user.age).toBe(34);
  });

  test("Mongoose doit ajouter un champ _id lorsqu'on crée le document", () => {
    expect("_id" in userAvantMongoose).not.toBe(true);

    const user = User(userAvantMongoose);

    expect("_id" in user).toBe(true);
  });

  test("Doit Sauvegarder en DB", async () => {
    const user = User(userAvantMongoose);

    expect(user).toMatchObject({ name: "Alice", age: 34, country: "france" });

    await user.save();

    const results = await User.find();

    expect(results[0]).toMatchObject({
      name: "Alice",
      age: 34,
      country: "france",
    });
  });
});
