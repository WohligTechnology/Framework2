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


    Api.findOneAndRemove({
      _id: data._id
    }, function(err, data2) {

      if (err) {
        callback(err, false);
      } else {

        Project.findOneAndUpdate({
          "Api": data._id
        }, {
          $pull: {
            Api: data._id
          }
        }, function(err, data3) {
          if (err) {
            callback(err, false);
          } else {
            callback(null, data2);
          }


        });


      }
    });



  },
  callApi: function(project, url, jsonData, callback) {
    Project.findOne({
      alias: project,
    }).populate("Api").exec(function(err, data) {
      if (err) {
        callback("ERR", data);
      } else {
        if (_.isEmpty(data)) {
          callback("ERR", data);
        } else {

          var data2 = _.filter(data.Api,function(n) {
            return (n.url == url);
          });
          var iscallback = false;
          _.each(data2, function(n) {

            if (!iscallback) {
              if (_.isEmpty(jsonData)) {
                if (_.isEmpty(n.Response.request)) {
                  iscallback = true;
                  callback(err, n);
                  return 0;
                }
              } else {
                if (n.Response.request) {
                  var obj = JSON.parse(_.unescape(n.Response.request));
                  if (_.isEqual(obj, jsonData)) {
                    iscallback = true;
                    callback(err, n);
                    return 0;
                  }
                }
              }
            }


          });
          if (!iscallback) {
            callback("ERR", null);
          }
        }

      }
    });

  }

};

module.exports = _.assign(module.exports, models);
