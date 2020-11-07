


//Giphy Weather PseudoCode

function getForecast(location) {

	let returnForecast = {
		"success": false,
		"errorMessage": "",
		"main": "",
		"description": "",
		"icon": ""//,
		//"sevenday":[.....]
	}

	//query openweather API with location value being passed in
	//assume the location value has already been validated
	//if query is successful, then parse the json response 
		//put values into the the fields of the returnForecast object
		//ie:  returnForecast.success = true;  returnForecast.main = <insert value from response here>; etc. for all fields
	
	return returnForecast;
}

function validateLocation(location){
	//the input value provided by the user on the web page is passed in
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

function getGiphy(searchString){
	//pass in the string to search for on the Giphy API
	//set limit to 1, set offset to a random number between 1 and 100
	//return embed_url value as string
}


function giphyWeather(){
	//call this function when click event is fired
	let location; //set this value  ...   pull the location input from the input element on the web page

	//if not valid, exit this function
	if (!validateLocation(location)) {
		alert("Invalid location input!");  // add a modal instead of an alert
		return;
	}

	//query for forecast
	let currentForecast = getForecast(location);
	if (!currentForecast.success) {
		alert("Unable to get weather for location " + location + "!");  // add a modal instead of an alert
		return;
	}

	//map weather icon to search string
	let giphySearchString = getGiphySearchTerms(currentForecast.icon);

	//query for giphy url
	let giphyUrl = getGiphy(giphySearchString);

	if (giphyUrl === undefined) {
		alert("message here");  // add a modal instead of an alert
		return;		
	}

	//display each of these items in appropriate elements on main page
		//  currentForecast.main
		//  currentForecast.description
		//  currentForecast.giphyUrl

}