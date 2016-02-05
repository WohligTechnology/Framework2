module.exports = {
  save: function(req, res) {
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
    Project.saveData(req.body, callback);
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
    Project.deleteData(req.body, callback);
  },
  find: function(req, res) {
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
    Project.getAll(req.body, callback);
  },
  findOne: function(req, res) {
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
    Project.getOne(req.body, callback);
  },
};
