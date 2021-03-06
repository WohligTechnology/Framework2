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
  },
  callApi: function(req, res) {
    // res.json({
    //   project: req.param("project"),
    //   controller : req.param("controller"),
    //   function : req.param("function"),
    //   query:req.query
    // });


    function callback(err, data) {
      if (err) {
        res.json({
          error: err,
          value: false
        });
      } else {
        if (data.Response.response) {
          var str = JSON.parse(_.unescape(data.Response.response));
          res.json(str);
        } else {
          res.json(data.Response.response);
        }
      }

    }
    var reqini = "/callApi/" + req.param("project") + "/";
    var reqUrl = req.url.substr(reqini.length);
    Api.callApi(req.param("project"), reqUrl, req.body, callback);
  }


};
