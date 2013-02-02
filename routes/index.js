
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'tmprtr' });
};

exports.tmprtr = function(req, res) {
  getTemperature(req.body.lat, req.body.lon, function(val) {
    if(val) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(val));
      res.end();
    }
    else {
      res.end();
    }
  });
}
