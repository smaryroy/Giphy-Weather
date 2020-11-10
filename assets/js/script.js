let zipCode = "input";
let zipRegex = /^\d{5}$/;

if (zipRegex.test(zipCode)) {
	getForecast()
} else {
	$("#zipModal").modal("show")
}