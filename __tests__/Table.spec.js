const Table = require("../Table");

describe("Table", () => {
  describe("insertOne", () => {
    it("should automatically increment the ID key", () => {
      const testTable = new Table("testTable");
      let startId = testTable.id;
      testTable.insertOne({});
      expect(testTable.id).toBe(startId + 1);
    });

    it("should insert the passed objet and return it alongside it's id in the DB", () => {
      const testTable = new Table("testTable");
      const obj = { name: "Rémi" };
      const { id, inserted } = testTable.insertOne(obj);
      expect(testTable.getOne(id)).toEqual(obj);
      expect(inserted).toEqual(obj);
    });
  });

  describe("searchByProperty", () => {
    it("should find an object stored with matching propertyName and value if it's present amongst objects with same schema.", () => {
      const testTable = new Table("testTable");

      // we should not match the following objects
      testTable.insertOne({ notThisProperty: "Rémi", name: "Alice" });
      testTable.insertOne({ notThisProperty: "Rémi", name: "Bob" });
      testTable.insertOne({ notThisProperty: "Rémi", name: "Charlie" });
      // the one we are looking for
      let { id, inserted } = testTable.insertOne({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
      let match = testTable.findByProperty("name", "Rémi");
      console.log(match);
      expect(match.id).toBe(id);
      expect(match.found).toMatchObject({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
    });

    it("should find an object stored with matching propertyName and value if it's present amongst objects with not the same schema.", () => {
      const testTable = new Table("testTable");

      // we should not match the following objects
      testTable.insertOne({ notThisProperty: "Rémi" });
      testTable.insertOne({ name: "Bob" });
      testTable.insertOne({ notThisProperty: "Rémi", name: "Charlie" });
      // the one we are looking for
      let { id, inserted } = testTable.insertOne({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
      let match = testTable.findByProperty("name", "Rémi");
      console.log(match);
      expect(match.id).toBe(id);
      expect(match.found).toMatchObject({
        notThisProperty: "Rémi",
        name: "Rémi",
      });
    });
    it("should return {} if there's no match", () => {
      const testTable = new Table("testTable");

      // we should match none of the following objects
      testTable.insertOne({ notThisProperty: "Rémi" });
      testTable.insertOne({ name: "Bob" });
      testTable.insertOne({ notThisProperty: "Rémi", name: "Charlie" });
      let { id, inserted } = testTable.insertOne({
        notThisProperty: "Rémi",
        name: "Rémiiii",
      });
      let match = testTable.findByProperty("name", "Rémi");
      expect(match).toEqual({});
    });
  });
});
