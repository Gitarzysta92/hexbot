'use strict'
const API_BASE = 'https://api.noopschallenge.com';


function noopsApiCaller(options) {
	const params = [];

	Object.keys(options).forEach(key => {
		params.push(`${key}=${options[key]}`)
	})

	const url = `${API_BASE}/${options.API}?` + params.join('&');

	return fetch(url)
		.then(response => response.json())
}


window.noopsApiCaller = noopsApiCaller;