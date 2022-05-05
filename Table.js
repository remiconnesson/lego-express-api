class Table {
  constructor(tableName) {
    this.tableName = tableName;
    this.memoryDb = new Map();
    this.id = 0;
  }
  insertOne(obj) {
    this.memoryDb.set(this.id, obj);
    return {id: id++, inserted: obj}
  }
  exists(id) {
    return this.memoryDb.has(id);
  }
  updateOne(id, obj) {
    if (this.exists(id)) {
      this.memoryDb.set(id, obj);
    } else {
      throw new Error(`Key ${id} doesn't not exists`);
    }
  }
  deleteOne(id) {
    if (this.exists(id)) {
      this.memoryDb.delete(id);
    } else {
      throw new Error(`Key ${id} doesn't not exists`);
    }
  }

  getAll() {
    return Object.fromEntries(this.memoryDb);
  }
}

module.exports = Table;
