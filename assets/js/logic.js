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

    let temp = (response.main.temp - 273.15) * 1.8 + 32;
    temp = Math.floor(temp);

    const card = $("<div>").addClass("card");
    const city = $("<h3>").addClass("card-title").text(response.name);
    const temperature = $("<p>")
      .addClass("card-text temp")
      .text("Temp: " + temp + "F");

    card.append(city, temperature);
    $(".title").append(card);
  });
}

function getFiveForecast(location) {
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
}
// let cityName = $("#cityName");

// //get statecode
// let stateCode = $("#stateCode");

// //AJAX request for 5day

//getForecast("55810");
console.log(forecastResponse);
//get city, state, weather from response

//store response-city, state, weather in localstorage

//
//get response[key:value] - send value to giphy call

//CLICK EVENT
$("#searchZipButton").click(function () {
  let newZip = $("#locationInput").val().trim();
  getForecast(newZip);

  /* let zipRegex = /^\d{5}$/;

  if (zipRegex.test(newZip)) {
    getForecast();
    getFiveForecast();
  } else {
    let newModal = $("#zipModal");
    newModal.modal("show");
  } */
  //clear input
  $("#locationInput").val("");
});

//main get giphyweather function
// function giphyWeather() {
//   //validations

//   getForecast();
// }
