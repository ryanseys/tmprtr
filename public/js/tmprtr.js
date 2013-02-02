x = document.getElementById('x');
temp = document.getElementById('temp');

function showPosition(position) {
  //x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  $.post(
    '/tmprtr', 
    data = {lat: position.coords.latitude, lon: position.coords.longitude },
    success = function(data, status, jqXHR) {
      temp.innerHTML = data.temp;
  });
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
