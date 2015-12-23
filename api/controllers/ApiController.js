module.exports = {
  save: function(req, res) {
    function callback(err, data) {
      if (err) {
        res.json({
          error: err,
          value: data
        });
      } else {
        res.json({
          data: data,
          value: true
        });
      }
    }
    Api.saveData(req.body, callback);
  },
  delete: function(req, res) {
    function callback(err, data) {
      if (err) {
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
    }
    Api.deleteData(req.body, callback);
  }
}
