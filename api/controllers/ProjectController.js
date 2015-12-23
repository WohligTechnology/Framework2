module.exports = {
  save: function(req, res) {
    function callback(err, data) {
      if (err) {
        res.json({
          error: err,
          value: false
        });
        s
      } else {
        res.json({
          data: data,
          value: true
        });
      }
    }
    Project.saveData(req.body, callback);
  },
  delete: function(req, res) {
    function callback(err, data) {
      if (err) {
        res.json({
          error: err,
          value: false
        });
        s
      } else {
        res.json({
          data: data,
          value: true
        });
      }
    }
    Project.deleteData(req.body, callback);
  }
}
