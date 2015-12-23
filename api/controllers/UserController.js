/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  fail: function(req, res) {
    res.json({
      value: false
    });
  },
  success: function(req, res) {
    res.json({
      value: true
    });
  },
  register: function(req, res) {
    var callback = function(err, data) {
      if (err || _.isEmpty(data)) {
        res.json({
          error: err,
          value: false
        });
      } else {
        res.json({
          data: data,
          value: true
        });
      }
    };
    User.register(req.body, callback);
  },
  login: function(req, res) {
    passport.authenticate('local', {
      failureRedirect: '/login'
    }, function(err, data) {
      if (err || _.isEmpty(data)) {
        res.redirect("user/fail");
        console.log("Error");
      } else {
        res.redirect("user/success");
      }
    })(req, res);
  },
  logout: function(req, res) {
    res.session.destroy(function(err) {
      if (err) {
        res.json({
          value: false,
          error: err
        });
      } else {
        res.json({
          value: true
        });
      }
    });
  }
};
