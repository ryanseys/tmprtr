var stat_str = document.getElementById('stat_str');
var icon = document.getElementById('icon');
var location_str = document.getElementById('location_str');
var condition_str = document.getElementById('condition_str');
var temp_str = document.getElementById('temp_str');

/* Get weather data for a particular position (lat/long) */
function showPosition(position) {
  location_str.innerHTML = "acquiring the tmprtr...";
  $.post(
    '/tmprtr',
    data = { lat: position.coords.latitude, lon: position.coords.longitude },
    success = function(values, status, jqXHR) {
      updateDisplay(values);
    }).always(function() {
      $('.loading').hide();
    });
}

/* Update the state of the weather */
function updateDisplay(values) {
  if(values.icon) {
    icon.setAttribute('data-icon', getIconCharacter(values.icon)); //set the icon
    stat_str.innerHTML = "";
    condition_str.innerHTML = values.condition_string;
    temp_str.innerHTML = values.feelslike_c + "&deg;C/" + values.feelslike_f + "&deg;F";
    location_str.innerHTML = values.location_string;
  }
  else {
    showStatus("oops, a tmprtr for your location could not be found.<br /><a href='/'>refresh</a>");
  }
}

/* Get the icon to display based on the weather state string */
function getIconCharacter(icon) {
  switch(icon) {
    case 'nt_chanceflurries' :
      return 'V';

    case 'nt_chancerain' :
      return 'Q';

    case 'nt_chancesleet' :
      return 'T';

    case 'nt_chancesnow' :
      return 'V';

    case 'nt_chancetstorms' :
      return '0';

    case 'nt_clear' :
      return 'C';

    case 'nt_cloudy' :
      return 'Y';

    case 'nt_flurries' :
      return 'W';

    case 'nt_fog' :
      return 'K';

    case 'nt_hazy' :
      return 'E';

    case 'nt_mostlycloudy' :
      return 'N';

    case 'nt_mostlysunny' :
      return 'I';

    case 'nt_partlycloudy' :
      return 'I';

    case 'nt_partlysunny' :
      return 'N';

    case 'nt_rain' :
      return 'R';

    case 'nt_sleet' :
      return 'T';

    case 'nt_snow' :
      return 'X';

    case 'nt_sunny' :
      return 'C';

    case 'nt_tstorms' :
      return 'O';

    case 'nt_unknown' :
      return ')';

    case 'chanceflurries' :
      return 'V';

    case 'chancerain' :
      return 'Q';

    case 'chancesleet' :
      return 'T';

    case 'chancesnow' :
      return 'V';

    case 'chancetstorms' :
      return '0';

    case 'clear' :
      return 'B';

    case 'cloudy' :
      return 'Y';

    case 'flurries' :
      return 'W';

    case 'fog' :
      return 'M';

    case 'hazy' :
      return 'J';

    case 'mostlycloudy' :
      return 'N';

    case 'mostlysunny' :
      return 'H';

    case 'partlycloudy' :
      return 'H';

    case 'partlysunny' :
      return 'N';

    case 'rain' :
      return 'R';

    case 'sleet' :
      return 'U';

    case 'snow' :
      return 'X';

    case 'sunny' :
      return 'B';

    case 'tstorms' :
      return 'Z';

    case 'unknown' :
      return ')';

    default:
      return ")";

  }
}

/* Display error if location acquisition fails */
function showError(error) {
  $('.loading').hide();
  switch(error.code) {
    case error.PERMISSION_DENIED:
      stat_str.innerHTML = "Sorry, <b>tmprtr</b> needs your location to work.";
      break;
    case error.POSITION_UNAVAILABLE:
      stat_str.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      stat_str.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      stat_str.innerHTML = "An unknown error occurred.";
      break;
  }
  $('.sadface').show();
  location_str.innerHTML = 'An error occurred...';
}

/* Display a string in place of the weather as a message */
function showStatus(status) {
  stat_str.innerHTML = status;
  condition_str.innerHTML = "";
  temp_str.innerHTML = "";
}

/*
Ask the browser for the latitude and longitude
First tries IP-based location, then geo-location (requires elevated permissions)
*/
function getLocation() {
  if (navigator.geolocation) {
    requestGeoLocation();
  }
  else {
    showStatus("Sorry, your browser is unsupported.");
  }
}

/*
Gets latitude and longitude from browser geo-location
Assumes your browser has navigator.geolocation
*/
function requestGeoLocation() {
  location_str.innerHTML = "acquiring your location...";
  $('.loading').show();
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

getLocation();
