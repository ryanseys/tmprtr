x = document.getElementById('x');
temp = document.getElementById('temp');
icon = document.getElementById('icon');

function showPosition(position) {
  $.post(
    '/tmprtr', 
    data = {lat: position.coords.latitude, lon: position.coords.longitude },
    success = function(values, status, jqXHR) {
      icon.setAttribute('data-icon', getIconCharacter(values.icon)); //set the icon
      temp.innerHTML = values.condition_string + "<br />";
      temp.innerHTML += values.temp_c + "&deg;C/"+ values.temp_f +"&deg;F";
      temp.innerHTML += "<br />" + values.location_string;
  });
}

function getIconCharacter(icon) {
  switch(icon) {
    case 'nt_partlycloudy':
      return 'I';
    break;

    default:
      return "-";
    break;
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }
  else {
    x.innerHTML="Geolocation is not supported by this browser.";
  }
}

getLocation();
