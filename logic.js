//openweather api key
let apiKey = "c0823128cbf8487c457530048730b089";
//openweather api call url
let currentURL =
  "api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "," +
  stateCode +
  "&appid=" + 
  apiKey;
//openweather api for 5 day
let forecastURL = "api.openweathermap.org/data/2.5/forecast?q="+ cityName "&appid="+ apiKey;


//get city name
let cityName;

//get statecode
let stateCode;

//AJAX request for 5day
$.ajax({
    url: forecastURL,
    method: "GET",
}).then();

//AJAX request
//
$.ajax({
  url: apiURL,
  method: "GET",
}).then();
