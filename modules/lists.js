var path = require("path"),
    fs = require("fs"),
    file_path = path.resolve(path.dirname(__dirname), "data/lists.json");

module.exports = {
  __readFile: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8"));
  },

  getLastID: function() {
    return this.__readFile().last_list_id;
  },

  get: function() {
    return this.__readFile().data;
  },

  set: function(data) {
    data.list_id = this.getLastID() + 1;
    fs.writeFileSync(file_path, JSON.stringify({
      last_list_id: data.list_id,
      data: data
    }), "utf8");
  }
}
