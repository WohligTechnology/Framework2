var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: String,
  email: String,
  password: String,
  accessLevel: String,
  dob: Date,
  profilePic: String,
  status: Number,
  notification: {
    type: [{
      timestamp: Date,
      os: String,
      notificationId: String
    }],
    index: true
  },
  oathLogin: {
    type: [{
      socialId: String,
      oauthId: String
    }],
    index: true
  }
});

module.exports = mongoose.model('User', schema);
var models = {

};

module.exports = _.assign(models,module.exports);
