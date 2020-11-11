//openweather api key
let apiKey = "c0823128cbf8487c457530048730b089";
//openweather api call url

//openweather api for 5 day
let giphySearchString = "";
let returnForecast = {
  success: false,
  errorMessage: "",
  name: "",
  temp: "",
  main: "",
  description: "",
	icon: ""//,
	//"sevenday":[.....]
}

let weatherToGiphyMap = {
  "01d" : "clear sky, blue sky, good weather, nice day",
  "01n" : "clear sky, blue sky, good weather, nice day",
  "02d" : "clouds",
  "02n" : "clouds",
  "03d" : "clouds",
  "03n" : "clouds",
  "04d" : "clouds",
  "04n" : "clouds",
  "09d" : "rainy",
  "09n" : "rainy",
  "10d" : "rainy",
  "10n" : "rainy",
  "11d" : "stormy weather",
  "11n" : "stormy weather",
  "13d" : "snowy weather",
  "13n" : "snowy weather",
  "50d" : "foggy mist",
  "50n" : "foggy mist"
};




function clearReturnForecast(){
  //clear for the next query
  console.log("clear", returnForecast);
	returnForecast.success = false;
  returnForecast.errorMessage = "";
  returnForecast.name = "";
  returnForecast.temp = "";
  returnForecast.main = "";
  returnForecast.description = "";
	returnForecast.icon = "";
  giphySearchString = "";
}

function getGiphySearchTerms(weatherIcon){
	//pass in the icon id retrieved from forecast results
	//this value should be passed in as a string
	return weatherToGiphyMap[weatherIcon];
}


function getForecast(location) {
  clearReturnForecast();

	//query openweather API with location value 
  //assume the location value has already been validated
  let currentURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    location +
    "&units=imperial&appid=" +
    apiKey;
    console.log(currentURL);

  $.ajax({
    url: currentURL,
    method: "GET",
  }).done(function(response) {
    	//if query is successful, then parse the json response 
    console.log("success", response);
    //pull out what we need
    returnForecast.success = true;
    returnForecast.name = response.name;
    returnForecast.temp = response.main.temp ;
    returnForecast.main = response.weather[0].main ;
    returnForecast.description = response.weather[0].description ;
    returnForecast.icon = response.weather[0].icon  ;

    console.log(returnForecast);

    //do part two
  	//map weather icon to search string
    giphySearchString = getGiphySearchTerms(returnForecast.icon);
    console.log(giphySearchString);

    //query for giphy url
    let giphyUrl = getGiphy();

/*     if (giphyUrl === undefined) {
      alert("message here");  // add a modal instead of an alert
      return;		
    } */

   })
  .fail(function( jqXHR, textStatus, errorThrown) {
    console.log('in fail');
    returnForecast.success = false;
    returnForecast.errorMessage  = "Error: Unable to get weather for location " + location + ". Status: "  + errorThrown;

    toggleModal(returnForecast.errorMessage);
  });
  
  
/*   .then(function (response) {
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
  }); */
	//if query is successful, then parse the json response 
		//put values into the the fields of the returnForecast object
		//ie:  returnForecast.success = true;  returnForecast.main = <insert value from response here>; etc. for all fields
	
}


//not the MVP!!!
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




function getGiphySearchTerms(weatherIcon){
	//pass in the icon id retrieved from forecast results
	//this value should be passed in as a string
	return weatherToGiphyMap[weatherIcon];
}

function getGiphy(){

	//the 'giphySearchString' variable should be set at the point
	//use giphySearchString to search for on the Giphy API
	//set parameter limit to 1, set offset to a random number between 1 and 100
	//return the value of the embed_url field in the response
}


function validateZip(locationZip){
  let zipRegex = /^\d{5}$/;
  if (zipRegex.test(locationZip)) {
      return true;
  } else {
    return false;
  }

}

function toggleModal(displayMessage) {
console.log("toggle " + displayMessage);
$("#errorMessage").text(displayMessage);
   let modal = $("#errorModal");
   
   modal.addClass("is-active");
}


function giphyWeather(){
	//call this function when click event is fired

  let newZip = $("#locationInput").val().trim();

  	//if not valid, exit this function
	if (!validateZip(newZip)) {
    toggleModal("Invalid location input!");
		return;
  }
  console.log(newZip);
  
	//query for forecast, location variable should be validated
	// results go into returnForecast
  getForecast(newZip);
  

  //clear input
  $("#locationInput").val("");


}


$(document).ready(function () {

  //CLICK EVENT
  $("#searchZipButton").click(function () {
    giphyWeather();

  });

  $("#close").click(function () {
    $("#errorModal").removeClass("is-active");
  });

});