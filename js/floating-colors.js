'use strict'

// application options
const floatingColors = {
	backgroundColor: '#fff',
	redrawInterval: 100, 
	animationOptions: {
		strategyStep: 10,
		strategyInterval: 2000,
	}
};

// setup noops api request parameters
const requestOptions = {
	API: 'hexbot',
	count: 8,
	width: window.innerWidth,
	height: window.innerWidth
};

window.onload = function() {
	const reinitializeButton = document.getElementById('new-colors');
	reinitializeButton.addEventListener('click', initFloatingColors);

	initFloatingColors();
}


// Main function 
async function initFloatingColors() {
	// get colors data from Hexbot Noops api 
	const hexbotApi = window.noopsApiCaller;
	const { colors: hexbotColors } = await hexbotApi(requestOptions);

	// create new canvas by simple canvas api
	const canvasElem = document.getElementById('canvas');
	floatingColors.canvas = new window.Canvas(canvasElem, {
		bgColor: floatingColors.backgroundColor,
	});

	// convert obtained colors data to expected format
	const gradients = prepareGradientsMeta(hexbotColors);

	// create new gradients depending on created color model
	const animations = gradients.map(gradient => createGradient({
		animationOptions: floatingColors.animationOptions,
		gradient
	}));

	// start animating (redrawing) canvas
	setInterval(function(){
		floatingColors.canvas.draw(function(){
			animations.forEach(animate => animate());
		});
	}, floatingColors.redrawInterval);
}


// accept Hexbot Noops api result 
// and convert it to expected format
function prepareGradientsMeta(hexbotColors) {
	return hexbotColors.reduce((acc, curr, index) => {
		const isNewColor = index % 2 === 0 ? true : false;
		const colorData = {
			color: `rgba(${hexToRGB(curr.value)}, ${isNewColor ? 1 : 0.1})`,
			coords: {
				x: curr.coordinates.x,
				y: curr.coordinates.y
			}	
		}
		if (isNewColor) {	
			return acc = [{ first: {...colorData} }, ...acc]
		} else {
			acc[0].second = {...colorData}
			return acc;
		}
	}, []);
}


// create new gradient using simple canvas api and setup animations for it
function createGradient(options) {
	const { width, height } = floatingColors.canvas; 
	const { gradient: gradientMeta, animationOptions } = options;

	floatingColors.canvas.addShape(`gradient${gradientMeta.first.color}`, function(canvas) {
		const gradient = canvas.ctx.createRadialGradient(
			gradientMeta.first.coords.x, 
			gradientMeta.first.coords.y, 
			0, 
			gradientMeta.first.coords.x + (gradientMeta.second.coords.x * 0.1), 
			gradientMeta.first.coords.y + (gradientMeta.second.coords.y * 0.1), 
			1000
		);
		gradient.addColorStop(0, gradientMeta.first.color);
		gradient.addColorStop(1, gradientMeta.second.color);
		canvas.ctx.fillStyle = gradient;
		canvas.ctx.fillRect(0,0, canvas.width, canvas.height);
	});
	
	animationOptions.coords = gradientMeta.first.coords;
	animationOptions.maxX = width;
	animationOptions.maxY = height;

	return animation(animationOptions);		
}


// chagne randomly given coordinates
function animation(options) {
	const step = options.step || 10;
	const interval = options.interval || 4000;
	const coords = options.coords; 
	const max = {
		x: options.maxX || 2000,
		y: options.maxY || 2000
	}
	const strategies = ['first', 'second', 'third', 'fourth'];
	const randomize = function() {
		return strategies[Math.floor((Math.random() * strategies.length))];
	}

	let strategy = randomize();
	setInterval(function() { strategy = randomize(); }, interval);

	return function() { 
		if (strategy === 'first') {
			coords.x < max.x || coords.x < 0 ? coords.x+=step : coords.x;
			coords.y < max.y || coords.y < 0 ? coords.y+=step : coords.y;
		} else if (strategy === 'second') {
			coords.x > 0 ? coords.x-=step : coords.x;
			coords.y > max.y || coords.y < 0 ? coords.y+=step : coords.y;
		} else if (strategy === 'third') {
			coords.x > max.x || coords.x < 0 ? coords.x+=step : coords.x;
			coords.y > 0 ? coords.y-=step : coords.y;
		} else if (strategy=== 'fourth') {
			coords.x > 0 ? coords.x-=step : coords.x;
			coords.y > 0 ? coords.y-=step : coords.y;
		}
		console.log(strategy);
	}
}


// convert hexadecimal color to rgba
function hexToRGB(hex) {
	const values = hex.substr(1).split('');

	const r = parseInt(values[0].toString() + values[1].toString(), 16);
	const g = parseInt(values[2].toString() + values[3].toString(), 16);
	const b = parseInt(values[4].toString() + values[5].toString(), 16);

	return `${r},${g},${b}`;
}

