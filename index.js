// select element

const iconElement = document.querySelector('.wether-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

// App data
const weather = {};
weather.temperature = {
  unit: 'celsius'
}

// const and variables
const KELVIN = 273;
//API Key
const key = '39a2922173caff994c7cf874897b3417';

// check if the browser supports geolocalization
if ( 'geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = "<p> Browser doesn't support Geolocalization";
}

//set user position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

//show error when there is an issue with geolocalization service
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message}`;
}

// get weather from API provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
 
  fetch(api).then(function(response) {
    let data = response.json();
    return data;
  })
  .then(function(data) {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN)
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(function() {
    displayWeather()
  });
}

//display Weather to UI
function displayWeather() {
  tempElement.innerHTML = `${weather.temperature.value}°c`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}