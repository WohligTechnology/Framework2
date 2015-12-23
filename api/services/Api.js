var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  status: Number,
  type: String,
  url: String,
  Project: { type: Schema.Types.ObjectId, ref: 'Project' },
  Response: {
    type: [{
      request: String,
      response: String,
      session: String,
      comment: String
    }],
    index:true
  }
});

module.exports = mongoose.model('Api', schema);
var models = {

};

module.exports = _.assign(models,module.exports);
