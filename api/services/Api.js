var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  status: Number,
  type: String,
  url: String,
  Response: {
    type: {
      request: String,
      response: String,
      session: String,
      comment: String
    },
    index: true
  },
  comment: String
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
      if (data.project) {
        var projectid = data.project;
        delete data.project;
        api.save(function(err, data) {
          if (err) {
            callback(err, false);
          } else {

            Project.findOne({
              _id: projectid
            }, function(err, data3) {
              if (err) {
                callback("There is an Error", data);
              } else {
                data3.Api.push(data._id);
                data3.save(function(err, data2) {
                  if (err) {
                    callback(err, false);
                  } else {
                    callback(null, data3);
                  }
                });
              }
            });

          }
        });

      } else {
        callback("No Project Selected", false);
      }

    }
  },
  deleteData: function(data, callback) {
    Project.findOne({"Api":data._id},function(err,data) {
      if(err)
      {
        callback("ERR",data);
      }
      else {
        console.log(data);
        data.Api.pull(data._id);
      }
    });
    Api.findOneAndRemove({
      _id: data._id
    }, function(err, data) {

      if (err) {
        callback(err, false);
      } else {
        console.log(data);
        callback(null, data);
      }
    });
  }

};

module.exports = _.assign(module.exports, models);
