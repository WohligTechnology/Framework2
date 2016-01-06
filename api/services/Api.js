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
    index: false
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
                    callback(null, data);
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
    Project.findOneAndUpdate({
      "Api": data._id
    }, {
      $pull: {
        Api: data._id
      }
    }, function(err, data) {

      Api.findOneAndRemove({
        _id: data._id
      }, function(err, data) {

        if (err) {
          callback(err, false);
        } else {
          callback(null, data);
        }
      });

    });

  },
  callApi: function(project, url, jsonData, callback) {
    Project.findOne({
      alias: project,
    }, function(err, data) {
      if (err) {
        callback("ERR", data);
      } else {
        if (_.isEmpty(data)) {
          callback("ERR", data);
        } else {
          Api.find({
            url: url,
          }, function(err, data) {
            console.log(data);
            if (_.isEmpty(data)) {
              callback("ERROR", data);
            } else {
              var iscallback = false;
              _.each(data, function(n) {
                if(_.isEmpty(jsonData)) {
                  if(_.isEmpty(n.Response.request)) {
                    iscallback = true;
                    callback(err,n);
                  }
                }
                else {
                  if(n.Response.request) {
                    var obj = JSON.parse(_.unescape(n.Response.request));
                    if (_.isEqual(obj, jsonData)) {
                      iscallback = true;
                      callback(err, n);
                    }
                  }
                }


              });
              if (!iscallback) {
                callback("ERR", null);
              }

            }


          });
        }

      }
    });

  }

};

module.exports = _.assign(module.exports, models);
