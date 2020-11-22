//openweather api key
let weatherApiKey = "c0823128cbf8487c457530048730b089";
let giphyApiKey = "iqaOXvQBb3UINfYGshwUYPJSyfka7Q0M";
let giphyMapIcon = "";
let giphyUrl = "";
let giphySearchString = "";
let errorMessage = "";
let cityZipList ;
let cityZipName = "";

let weatherToGiphyMap = {
  "01d" : "clear sky, blue sky, sunshine",
  "01n" : "moon and stars, stars",
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
  "11d" : "stormy weather, lightning",
  "11n" : "stormy weather, lightning",
  "13d" : "snow",
  "13n" : "snow",
  "50d" : "foggy mist",
  "50n" : "foggy mist"
};

function initialize(){
  console.log("history", cityZipList);
  cityZipList = JSON.parse(localStorage.getItem("cityZipList"));
  console.log("history", cityZipList);
  if (cityZipList === undefined || cityZipList === null) {
    cityZipList = [];
  } else {
      for(i = 0; i < cityZipList.length; i++) {
          $("#cityZipDisplay").prepend('<li  class="borderlist">' + cityZipList[i] + '</li>');
      }
  }
}

function addToCityZipList(){
  console.log("add to history", cityZipName);
  let found = false;
  for (i = 0; i < cityZipList.length; i++){
      if (cityZipList[i] === cityZipName) {
          found = true;
      }
  }
  if (!found) {
      //add to city list array
      cityZipList.push(cityZipName);
      //update localstorage
      localStorage.setItem("cityZipList", JSON.stringify(cityZipList));
      //add to city list display
      $("#cityZipDisplay").prepend('<li class="borderlist">' + cityZipName + '</li>');
  }

}


function getGiphySearchTerms(weatherIcon){
	//pass in the icon id retrieved from forecast results
	//this value should be passed in as a string
	return weatherToGiphyMap[weatherIcon];
}

function getForecast(location) {
  //clear global variables
  giphySearchString = "";
  errorMessage = "";
  giphyMapIcon = "";
  giphyUrl = "";
  $("#forcastHeader").text("");
  $("#weatherIcon").html("")
  $("#forecastDescription").text("");
  $("#temperature").text("");
  $("#humidity").text("");
  $("#giphy").attr("src", "");
  $("#giphyResults").css("opacity", 0);


  //hide the card
  $("#weatherResults").fadeTo("fast", 0);

	//query openweather API with location value 
  //assume the location value has already been validated
  let currentURL =
    "https://api.openweathermap.org/data/2.5/weather?zip=" +
    location +
    "&units=imperial&appid=" +
    weatherApiKey;
    console.log(currentURL);

  $.ajax({
    url: currentURL,
    method: "GET",
  }).done(function(response) {
    	//if query is successful, then parse the json response 
    console.log("success", response);
    //pull out what we need
    giphyMapIcon = response.weather[0].icon  ;

    $("#forcastHeader").text(response.name);
    cityZipName = response.name + ", " + cityZipName;
    addToCityZipList();

    let iconurl = "https://openweathermap.org/img/w/" + giphyMapIcon+ ".png";
    console.log(iconurl);
    $("#weatherIcon").html('<img  class="wicon" src="' +  iconurl + '" alt="Weather icon" > ')
    $("#forecastDescription").text(response.weather[0].main + " - " + response.weather[0].description);
    $("#temperature").text("Temp: " + response.main.temp + " F");
    $("#humidity").text("Humidity: " + response.main.humidity + "%");

   //convert unix timestamp to formatted date
    let a = new Date(response.dt * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = "0" +  a.getMinutes();
    let sec = "0" + a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
    $("#dt").text(time);

     //show the card
     $("#weatherResults").fadeTo("fast", 1);

    //do part two
  	//map weather icon to search string
    giphySearchString = getGiphySearchTerms(giphyMapIcon);
    console.log(giphySearchString);

    //query for giphy url
    getGiphy();


   })
  .fail(function( jqXHR, textStatus, errorThrown) {
    console.log('in fail for getForecast');
    errorMessage  = "Error: Unable to get weather for location " + location + ". Status: "  + errorThrown;
    toggleModal(errorMessage);
  });
  
  

}





function getGiphySearchTerms(weatherIcon){
	//pass in the icon id retrieved from forecast results
	//this value should be passed in as a string
	return weatherToGiphyMap[weatherIcon];
}

function getGiphy(){
  if (giphySearchString === undefined || giphySearchString === null || giphySearchString.length < 1) {
    return;
  }


	//the 'giphySearchString' variable should be set at the point
  //use giphySearchString to search for on the Giphy API
  let randomIndex = Math.floor(Math.random() * 99); 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    + encodeURIComponent(giphySearchString) 
    + "&limit=1&offset=" + randomIndex 
    + "&api_key=" + giphyApiKey ;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log("giphy", queryURL);
    console.log(response.data[0].images.original.url);
    giphyUrl =  response.data[0].images.original.url;

    //display results
    $("#giphy").attr("src", giphyUrl);
    $("#giphy").attr("width", "400px");
    $("#giphy").attr("height", "400px");
    $("#giphyResults").css("opacity", 1);
  //show the card
    $("#giphyResults").fadeTo(20, 1);


  }).fail(function( jqXHR, textStatus, errorThrown) {
    console.log('in fail for getGiphy');
    errorMessage  = "Error: Unable to find GIF for " + giphySearchString + ". Status: "  + errorThrown;
    toggleModal(errorMessage);
  });
  ;

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
  cityZipName = newZip;
  
	//query for forecast
  getForecast(newZip);
  
  //clear input
  $("#locationInput").val("");

}


$(document).ready(function () {

  initialize();

  //CLICK EVENT
  $("#searchZipButton").click(function () {
    giphyWeather();

  });

  $("#close").click(function () {
    $("#errorModal").removeClass("is-active");
  });

  $("#gifRedo").click(function () {
    getGiphy();
  });

  $("li.borderlist").click(function () {
    let selItem = $(this).text();
    let bits = selItem.split(",");

    console.log(selItem, bits);
    if(bits.length === 2){
      $("#locationInput").val(bits[1].trim());
      $("#searchZipButton").click();
    }

  })

//have the enter and tab key trigger getForecast
$("#locationInput").keyup(function(event) { 
  if (event.keyCode === 13 || event.keyCode === 9) { 
      $("#searchZipButton").click(); 
  } 
}); 


});




//not the MVP!!!
/* function getFiveForecast(location) {
  let forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?zip=" +
    location +
    "&appid=" +
    weatherApiKey;

  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    forecastResponse = response;
  });
} */




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
