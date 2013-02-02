
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'tmprtr' });
};

exports.tmprtr = function(req, res) {
  getTemperature(req.body.lat, req.body.lon, function(val) {
    res.send('index', val);
  });
}
