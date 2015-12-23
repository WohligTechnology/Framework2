/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req,res) {
    passport.authenticate('local', { failureRedirect: '/login' },function() {
      
    })(req,res);
  },
  logout: function(req,res) {

  }
};
