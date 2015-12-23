var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  status: Number,
  alias: String,
  serverUrl: String,
  Api: [{
    type: Schema.Types.ObjectId,
    ref: 'Api',
    index: true
  }]
});

module.exports = mongoose.model('Project', schema);
var models = {

};

module.exports = _.assign(models, module.exports);
