var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  status: Number,
  alias: String,
  serverUrl: String
});

module.exports = mongoose.model('Project', schema);
var models = {

};

module.exports = _.assign(models,module.exports);
