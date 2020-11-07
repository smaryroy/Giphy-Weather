//openweather api key
let apiKey = "c0823128cbf8487c457530048730b089";
//openweather api call url
let apiURL =
  "api.openweathermap.org/data/2.5/weather?q=" +
  cityName +
  "," +
  stateCode +
  "&appid=" + apiKey;

//get city name
let cityName;

//get statecode
let stateCode;



//AJAX request
//
$.ajax({
    url: ,
    method: "GET"
}).then();