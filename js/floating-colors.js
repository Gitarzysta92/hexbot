'use strict'

const floatingColors = {};
const hexbotApi = window.noopsApiCaller;
const requestOptions = {
	API: 'hexbot',
	count: 8,
	width: 1000,
	height: 1000
};


const colors = [
	{
		firstColor: {
			value: 'rgba(5,255,5,0.7)',
			x: 546,
			y: 100,
		},
		secondColor: {
			value: 'rgba(125,0,0,0.5)',
			x: 1000,
			y: 700,
		},
	},
	{
		firstColor: {
			value: 'rgba(11,222,135,0.5)',
			x: 222,
			y: 1,
		},
		secondColor: {
			value: 'rgba(255,125,162,0.1)',
			x: 236,
			y: 450,
		},
	},
	{
		firstColor: {
			value: 'rgba(125,2,135,0.7)',
			x: 263,
			y: 1000,
		},
		secondColor: {
			value: 'rgba(125,7,4,0.1)',
			x: 30,
			y: 200,
		},
	}
]


window.onload = async function(evt) {
	const canvasElem = document.getElementById('canvas');
	floatingColors.canvas = new window.Canvas(canvasElem, {
		bgColor: '#fff',
	});
	
	const { colors: hexbotColors } = await hexbotApi(requestOptions);

	//const colors = hexbotColors.reduce((acc, curr, index) => {
		//console.log(acc, curr, index);	
	//}, []);
	
	const animations = colors.map(color => createGradient(color));

	setInterval(function(){
		floatingColors.canvas.draw(function(){
			animations.forEach(animation => animation());
		});
	},50);

}



function createGradient(options) {
	const { width, height } = floatingColors.canvas; 
	const { firstColor, secondColor } = options;

	let { x: x1, y: y1 } = firstColor;
	let { x: x2, y: y2 } = secondColor;

	floatingColors.canvas.addShape(`gradient${x1}`, function(canvas) {
		//const gradient = canvas.ctx.createLinearGradient(x1, y1, x2, y2);
		const gradient = canvas.ctx.createRadialGradient(x1, y1, 0, x2, y2, 1500);
		gradient.addColorStop(0, firstColor.value);
		gradient.addColorStop(1, secondColor.value);
		canvas.ctx.fillStyle = gradient;
		canvas.ctx.fillRect(0,0, canvas.width, canvas.height);
	});

	const variants = ['first', 'second', 'third', 'fourth'];
	
	let firstSet = variants[Math.floor((Math.random() * 4))];
	let secondSet = variants[Math.floor((Math.random() * 4))];
	setInterval(function() {
		firstSet = variants[Math.floor((Math.random() * 4))];
		secondSet = variants[Math.floor((Math.random() * 4))];
	},5000)
	const step = 2;

	return function() {
		if (firstSet === 'first') {
			x1 < width || x1 < 0 ? x1+=step : x1;
			y1 < height || y1 < 0 ? y1+=step : y1;
		} else if (firstSet === 'second') {
			x1 > 0 ? x1-=step : x1;
			y1 > height || y1 < 0 ? y1+=step : y1;
		} else if (firstSet === 'third') {
			x1 > width || y1 < 0 ? x1+=step : x1;
			x1 > 0 ? y1-=step : y1;
		} else if (firstSet=== 'fourth') {
			x1 > 0 ? x1-=step : x1;
			y1 > 0 ? y1-=step : y1;
		}
		if (firstSet === 'first') {
			x2 < width || x2 < 0 ? x2+=step : x2;
			y2 < height || y2 < 0 ? y2+=step : y2;
		} else if (firstSet === 'second') {
			x2 > 0 ? x2-=step : x2;
			y2 > height || y2 < 0 ? y2+=step : y2;
		} else if (firstSet === 'third') {
			x2 > width || y2 < 0 ? x2+=step : x2;
			x2 > 0 ? y2-=step : y2;
		} else if (firstSet=== 'fourth') {
			x2 > 0 ? x2-=step : x2;
			y2 > 0 ? y2-=step : y2;
		}
		console.log(x1, y1);			
	}	
}

