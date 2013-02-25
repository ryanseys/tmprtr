
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , api_key = process.env.API_KEY;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon('favicon.png'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/*
 Parse the name of the image to get a good idea what icon to use.
*/
function parseImageURL(url) {
  return url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));
}

/*
 Getting temperature (and other data actually)
*/
getTemperature = function(lat, lon, callback) {
  var options = {
    host: 'api.wunderground.com',
    path: '/api/' + api_key + '/conditions/q/' + lat + ',' + lon + '.json'
  };

  http.get(options, function(res) {
    var body = '';

    res.on("data", function(chunk) {
      body += chunk;
    });

    res.on('end', function () {
      body = JSON.parse(body);
      if(body.current_observation) {
        current = body.current_observation;
        values = {};

        //populate values
        values.temp_c = current.temp_c;
        values.temp_f = current.temp_f;
        values.feelslike_f = current.feelslike_f;
        values.feelslike_c = current.feelslike_c;
        values.condition_string = current.weather;
        values.location_string = current.display_location.full;
        values.icon = parseImageURL(current.icon_url);

        callback(values);
      }
      else {
        callback(null); //an error occurred
      }
    });

  }).on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
}

app.get('/', routes.index);
app.post('/tmprtr', routes.tmprtr);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
