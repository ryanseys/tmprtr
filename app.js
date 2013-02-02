
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

getTemperature = function(lat, lon, callback) {
  var options = {
    host: 'api.wunderground.com',
    path: '/api/' + config.api_key + '/conditions/q/' + lat + ',' + lon + '.json'
  };

  http.get(options, function(res) {
    var body = '';
    console.log("Got response: " + res.statusCode);

    res.on("data", function(chunk) {
      body += chunk;
    });

    res.on('end', function () {
      body = JSON.parse(body);
      if(body.current_observation) {
        callback(body.current_observation.temp_c + " degrees C");
      }
      else {
        callback(null);
      }
    });

  }).on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
}

app.get('/', routes.index);
app.post('/tmprtr', routes.tmprtr);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
