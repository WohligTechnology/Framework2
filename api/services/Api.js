var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  status: Number,
  type: String,
  url: String,
  Response: {
    type: [{
      request: String,
      response: String,
      session: String,
      comment: String
    }],
    index: true
  }
});

module.exports = mongoose.model('Api', schema);

var models = {
  saveData: function(data, callback) {
    var api = this(data);
    if (data._id) {
      this.findOneAndUpdate({
        _id: data._id
      }, data, callback);
    } else {
      api.save(function(err, data) {
        if (err) {
          callback(err, false);
        } else {
          callback(null, data);
        }
      });
    }
  },
  deleteData: function(data, callback) {
    Api.findOneAndRemove({
      _id: data._id
    }, function(err, data) {
      if (err) {
        callback(err, false);
      } else {
        callback(null, data);
      }
    });
  }

};

module.exports = _.assign(module.exports, models);
