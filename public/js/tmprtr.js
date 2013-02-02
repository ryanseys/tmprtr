status = document.getElementById('status');
icon = document.getElementById('icon');

function showPosition(position) {
  $.post(
    '/tmprtr',
    data = { lat: position.coords.latitude, lon: position.coords.longitude },
    success = function(values, result_status, jqXHR) {
      icon.setAttribute('data-icon', getIconCharacter(values.icon)); //set the icon
      status.innerHTML = values.condition_string + "<br />";
      status.innerHTML += values.temp_c + "&deg;C/"+ values.temp_f +"&deg;F";
      status.innerHTML += "<br />" + values.location_string;
  });
}

function getIconCharacter(icon) {
  switch(icon) {
    case 'nt_chanceflurries' :
      return 'V';
    break;
    case 'nt_chancerain' :
      return 'Q';
    break;
    case 'nt_chancesleet' :
      return 'T';
    break;
    case 'nt_chancesnow' :
      return 'V';
    break;
    case 'nt_chancetstorms' :
      return '0';
    break;
    case 'nt_clear' :
      return 'C';
    break;
    case 'nt_cloudy' :
      return 'Y';
    break;
    case 'nt_flurries' :
      return 'W';
    break;
    case 'nt_fog' :
      return 'K';
    break;
    case 'nt_hazy' :
      return 'E';
    break;
    case 'nt_mostlycloudy' :
      return 'N';
    break;
    case 'nt_mostlysunny' :
      return 'I';
    break;
    case 'nt_partlycloudy' :
      return 'I';
    break;
    case 'nt_partlysunny' :
      return 'N';
    break;
    case 'nt_rain' :
      return 'R';
    break;
    case 'nt_sleet' :
      return 'T';
    break;
    case 'nt_snow' :
      return 'X';
    break;
    case 'nt_sunny' :
      return 'C';
    break;
    case 'nt_tstorms' :
      return 'O';
    break;
    case 'nt_unknown' :
      return ')';
    break;
    case 'chanceflurries' :
      return 'V';
    break;
    case 'chancerain' :
      return 'Q';
    break;
    case 'chancesleet' :
      return 'T';
    break;
    case 'chancesnow' :
      return 'V';
    break;
    case 'chancetstorms' :
      return '0';
    break;
    case 'clear' :
      return 'B';
    break;
    case 'cloudy' :
      return 'Y';
    break;
    case 'flurries' :
      return 'W';
    break;
    case 'fog' :
      return 'M';
    break;
    case 'hazy' :
      return 'J';
    break;
    case 'mostlycloudy' :
      return 'N';
    break;
    case 'mostlysunny' :
      return 'H';
    break;
    case 'partlycloudy' :
      return 'H';
    break;
    case 'partlysunny' :
      return 'N';
    break;
    case 'rain' :
      return 'R';
    break;
    case 'sleet' :
      return 'U';
    break;
    case 'snow' :
      return 'X';
    break;
    case 'sunny' :
      return 'B';
    break;
    case 'tstorms' :
      return 'Z';
    break;
    case 'unknown' :
      return ')';
    break;

    default:
      return ")";
    break;
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      status.innerHTML="Sorry, <b>tmprtr</b> needs your location to work."
      break;
    case error.POSITION_UNAVAILABLE:
      status.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      status.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      status.innerHTML="An unknown error occurred."
      break;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    status.innerHTML="Sorry, your browser is unsupported.";
  }
}

getLocation();
