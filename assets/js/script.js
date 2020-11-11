let zipCode = "LocationInput";
let zipRegex = /^\d{5}$/;

if (zipRegex.test(zipCode)) {
	getForecast()
	get5Forecast()
} else {
	$("#zipModal").modal("show")
}