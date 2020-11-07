


//Giphy Weather PseudoCode

// global variables
let location = "";
let giphySearchString = "";
let forecastResponse;
let returnForecast = {
	"success": false,
	"errorMessage": "",
	"main": "",
	"description": "",
	"icon": ""//,
	//"sevenday":[.....]
}


function clearReturnForecast(){
	//clear for the next query
	returnForecast.success = false;
	returnForecast.errorMessage = "";
	returnForecast.main = "";
	returnForecast.description = "";
	returnForecast.icon = "";

}

function getForecast() {
	//clear the response first
	clearReturnForecast();

	//query openweather API with location value 
	//assume the location value has already been validated
	//if query is successful, then parse the json response 
		//put values into the the fields of the returnForecast object
		//ie:  returnForecast.success = true;  returnForecast.main = <insert value from response here>; etc. for all fields
	
}

function validateLocation(){
	//the 'location' variable should already be set
	// this value should be checked to see if it is : 
		//not undefined
		//not blank
		//alphanumeric characters only with spaces and comma allowed - this can be a regex
		//less than 200 characters
	// return true is validation is successful, else return false
}

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


function giphyWeather(){
	//call this function when click event is fired

	//if not valid, exit this function
	if (!validateLocation()) {
		alert("Invalid location input!");  // todo: add a modal instead of an alert
		return;
	}

	//query for forecast, location variable should be validated
	// results go into returnForecast
	getForecast();
	if (!returnForecast.success) {
		alert("Unable to get weather for location " + location + "!");  // add a modal instead of an alert
		return;
	}

	//map weather icon to search string
	let giphySearchString = getGiphySearchTerms(returnForecast.icon);

	//query for giphy url
	let giphyUrl = getGiphy(giphySearchString);

	if (giphyUrl === undefined) {
		alert("message here");  // add a modal instead of an alert
		return;		
	}

	//display each of these items in appropriate elements on main page
		//  currentForecast.main
		//  currentForecast.description
		//  giphyUrl

}