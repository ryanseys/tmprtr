
/*
 * GET home page.
 */
exports.index = function(req, res){
  /* Home page */
  res.render('index', { title: 'tmprtr' });
};

/*
 * POST When a browser requests weather from coordinates
 */
exports.tmprtr = function(req, res) {
  /* Make the API call to get the temperature */
  getTemperature(req.body.lat, req.body.lon, function(val) {
    if(val) { /* if there is data for that coordinate */
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(val));
    }
    else {
      res.end();
    }
  });
};
