//openweather api key
let apiKey = "c0823128cbf8487c457530048730b089";
//openweather api call url

//openweather api for 5 day

let forecastResponse;

//get city name//AJAX request
//for current weather
function getForecast(location) {
  let currentURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    location +
    "&appid=" +
    apiKey;
  $.ajax({
    url: currentURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    forecastResponse = response;
  });
}

/* function getFiveForecast(location) {
  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?zip=" +
    location +
    "&appid=" +
    apiKey;

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    forecastResponse = response;
  });
} */
// let cityName = $("#cityName");

// //get statecode
// let stateCode = $("#stateCode");

// //AJAX request for 5day

getForecast("55810");
console.log(forecastResponse);
//get city, state, weather from response

//store response-city, state, weather in localstorage

//
//get response[key:value] - send value to giphy call

//CLICK EVENT
$("").click(function () {});

//main get giphyweather function
function giphyWeather() {
  //validations

  getForecast();
}
