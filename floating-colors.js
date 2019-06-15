const defaultBgColor = '#eee'



function Canvas(canvas, options) {
	this ctx = canvas.getContext('2d');
	const { width, height } = options;	
	this.setupSize(width, height);
	this.ctx.fillStyle = options.bgColor || defaultBgColor
}


Canvas.prototype.onWindowResize = function(size, ) {
	const { width, height } = size
	const self = this;
	window.onresize = function() {
		self.setupSize(width, height);
		callback()

	}
}

Canvas.prototype._setupSize = function(width, height) {
	const appWidth = width || window.innerWidth;
	const appHeight = height || window.innerHeight;

	this.ctx.canvas.width = appWidth;
	this.ctx.canvas.height = appHeight;
	this.ctx.fillRect(0,0, appWidth, appHeight);
}

Canvas.prototype._resize = function() {
	
}

window.onload = function(evt) {
	const canvasElem = document.getElementById('canvas');
	const canvas = new Canvas(canvasElem, {
		bgColor: '#757575',
	});	
}