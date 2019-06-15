'use strict'
const defaultBgColor = '#000'

function Canvas(canvas, options) {
	this.shapes = [];
	const { width, height } = options;	

	this.ctx = canvas.getContext('2d');

	this.addShape('background', function(canvas) {
		const { bgColor } = options;
		canvas.ctx.fillStyle = bgColor || defaultBgColor;
		canvas.ctx.fillRect(0,0, canvas.width, canvas.height);	
	})
    this._setupSize(width, height);

    const self = this;
    window.onresize = function() {
        self._setupSize(width, height);  
    }
}

Canvas.prototype = {
	get width() { return this._canvasWidth; },
	get height() { return this._canvasHeight; }
}

Canvas.prototype.addShape = function(name, procedure) {
    const shapeAlreadyExists = this.getShape(name);
	if (shapeAlreadyExists) {
        console.warn('Shape with given name already exists');
        return;
    } else {
        this.shapes.push({ name, procedure });
    }
}

Canvas.prototype.getShape = function(name) {
    return this.shapes.find(shape => name === shape.name);  
}

Canvas.prototype.draw = function(callback) {
	this.ctx.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
	this.shapes.forEach(shape => shape.procedure(this));
	callback && callback(this);
}


Canvas.prototype.onWindowResize = function(callback) {
	const self = this;
	window.onresize = function() {
		const { width, height } = callback(self) || {};
		self._setupSize(width, height);
	}
}

Canvas.prototype._setupSize = function(width, height) {
	this._canvasWidth = width || window.innerWidth;
	this._canvasHeight = height || window.innerHeight;

	this.ctx.canvas.width = this._canvasWidth;
	this.ctx.canvas.height = this._canvasHeight;
	this.draw();
}


window.Canvas = Canvas;