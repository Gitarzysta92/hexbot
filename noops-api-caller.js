const API_BASE = 'https://api.noopschallenge.com';


const options = {
	API: 'hexbot',
	count: 100
}


function displayResults(response) {
	console.log(response);
}


function noopsApiCaller(options, onComplete) {
	const params = [];

	Object.keys(options).forEach(key => {
		params.push(`${key}=${options[key]}`)
	})

	const url = `${API_BASE}/${options.API}?` + params.join('&');


	fetch(url)
		.then(response => response.json())
		.then(response => onComplete(response));
}


window.onload = function(evt) {
	noopsApiCaller(options, displayResults)
}