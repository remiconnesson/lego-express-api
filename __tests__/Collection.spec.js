const Collection = require("../Collection");

describe("Collection", () => {
  describe("insertOne", () => {
    it("should automatically increment the ID key", () => {
      const testCollection = new Collection("testCollection");
      let startId = testCollection.id;
      testCollection.insertOne({});
      expect(testCollection.id).toBe(startId + 1);
    });

    it("should insert the passed objet and return it alongside it's id in the DB", () => {
      const testCollection = new Collection("testCollection");
      const obj = { name: "Rémi" };
      const { id, inserted } = testCollection.insertOne(obj);
      expect(testCollection.getOne(id)).toEqual(obj);
      expect(inserted).toEqual(obj);
    });
  });

  describe("searchByProperty", () => {
    it("should find an object stored with matching propertyName and value if it's present amongst objects with same schema.", () => {
      const testCollection = new Collection("testCollection");

      // we should not match the following objects
      testCollection.insertOne({ notThisProperty: "Rémi", name: "Alice" });
      testCollection.insertOne({ notThisProperty: "Rémi", name: "Bob" });
      testCollection.insertOne({ notThisProperty: "Rémi", name: "Charlie" });
      // the one we are looking for
      let { id, inserted } = testCollection.insertOne({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
      let match = testCollection.findByProperty("name", "Rémi");
      console.log(match);
      expect(match.id).toBe(id);
      expect(match.found).toMatchObject({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
    });

    it("should find an object stored with matching propertyName and value if it's present amongst objects with not the same schema.", () => {
      const testCollection = new Collection("testCollection");

      // we should not match the following objects
      testCollection.insertOne({ notThisProperty: "Rémi" });
      testCollection.insertOne({ name: "Bob" });
      testCollection.insertOne({ notThisProperty: "Rémi", name: "Charlie" });
      // the one we are looking for
      let { id, inserted } = testCollection.insertOne({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
      let match = testCollection.findByProperty("name", "Rémi");
      console.log(match);
      expect(match.id).toBe(id);
      expect(match.found).toMatchObject({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
    });
    it("should return {} if there's no match", () => {
      const testCollection = new Collection("testCollection");

      // we should match none of the following objects
      testCollection.insertOne({ notThisProperty: "Rémi" });
      testCollection.insertOne({ name: "Bob" });
      testCollection.insertOne({ notThisProperty: "Rémi", name: "Charlie" });
      let { id, inserted } = testCollection.insertOne({
        notThisProperty: "Rémi",
        name: "Rémiiii",
      });
      let match = testCollection.findByProperty("name", "Rémi");
      expect(match).toEqual({});
    });
  });
});
