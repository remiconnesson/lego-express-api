const Collection = require("../Collection");

describe("Collection", () => {
  describe("updateOne", () => {
    it("should refuse update when id does not exist", () => {
      const testCollection = new Collection("test");
      // id 1000 does not exits
      expect(() => {
        testCollection.updateOne(1000);
      }).toThrow(/1000/);
    });
    it("should do the update if ID exists", () => {
      const testCollection = new Collection("test");
      const { id } = testCollection.insertOne({ state: "Created" });
      testCollection.updateOne(id, { state: "Updated" });
      expect(testCollection.getOne(id)).toEqual({ state: "Updated" });
    });
  });

  describe("deleteOne", () => {
    it("should refuse to delete when id does not exist", () => {
      const testCollection = new Collection("test");
      // id 1000 does not exits
      expect(() => {
        testCollection.updateOne(1000);
      }).toThrow(/1000/);
    });
    it("should delete the target if ID exists", () => {
      const testCollection = new Collection("test");
      const { id } = testCollection.insertOne({ state: "Created" });
      testCollection.deleteOne(id);
      expect(testCollection.exists(id)).toBe(false);
    });
  });

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
