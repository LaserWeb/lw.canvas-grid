(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CanvasGrid", [], factory);
	else if(typeof exports === 'object')
		exports["CanvasGrid"] = factory();
	else
		root["CanvasGrid"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CanvasGrid = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _lw = __webpack_require__(2);
	
	var _lw2 = _interopRequireDefault(_lw);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// CanvasGrid class
	var CanvasGrid = function () {
	    // Class constructor...
	    function CanvasGrid(settings) {
	        _classCallCheck(this, CanvasGrid);
	
	        // Init properties
	        this.cellSize = 1024;
	        this.scaleRatio = { x: 1, y: 1 };
	        this.filters = {};
	
	        Object.assign(this, settings || {});
	
	        if (!this.scaleRatio.x) {
	            this.scaleRatio = { x: this.scaleRatio, y: this.scaleRatio };
	        }
	
	        this.size = { width: 0, height: 0, cols: 0, rows: 0 };
	        this.file = null;
	        this.image = null;
	        this.url = null;
	        this.canvas = [];
	        this.pixels = [];
	    }
	
	    // <input> can be Image, File, URL object or URL string (http://* or data:image/*)
	
	
	    _createClass(CanvasGrid, [{
	        key: 'load',
	        value: function load(input) {
	            // Load File object
	            if (input instanceof File) {
	                return this.loadFromFile(input);
	            }
	
	            // Load Image object
	            if (input instanceof Image) {
	                return this.loadFromImage(input);
	            }
	
	            // Load URL object
	            if (typeof input === 'string' || input instanceof URL) {
	                return this.loadFromURL(input.trim());
	            }
	
	            // Return rejected promise with an Error object
	            return Promise.reject(new Error('Unsupported input format.'));
	        }
	
	        // Load image
	
	    }, {
	        key: '_loadImage',
	        value: function _loadImage(src, reject, resolve) {
	            var _this = this;
	
	            // Create Image object
	            var image = new Image();
	
	            // Register for load and error events
	            image.onload = function (event) {
	                _this.loadFromImage(image).then(resolve).catch(reject);
	            };
	
	            image.onerror = function (event) {
	                reject(new Error('An error occurred while loading the image : ' + src));
	            };
	
	            // Load the image from File url
	            image.src = src;
	        }
	
	        // Load from File object
	
	    }, {
	        key: 'loadFromFile',
	        value: function loadFromFile(input) {
	            var _this2 = this;
	
	            return new Promise(function (resolve, reject) {
	                // Bad input type
	                if (!(input instanceof File)) {
	                    reject(new Error('Input param must be a File object.'));
	                }
	
	                // Set input file
	                _this2.file = input;
	
	                // Load image
	                _this2._loadImage(URL.createObjectURL(input), reject, resolve);
	            });
	        }
	
	        // Load from URL object or string
	
	    }, {
	        key: 'loadFromURL',
	        value: function loadFromURL(input) {
	            var _this3 = this;
	
	            return new Promise(function (resolve, reject) {
	                // Bad input type
	                if (!(input instanceof URL) && typeof input !== 'string') {
	                    reject(new Error('Input param must be a URL string or object.'));
	                }
	
	                // Create url object
	                var url = input instanceof URL ? input : new URL(input);
	
	                // Set url
	                _this3.url = url;
	
	                // Load image
	                _this3._loadImage(url, reject, resolve);
	            });
	        }
	
	        // Load from Image object
	
	    }, {
	        key: 'loadFromImage',
	        value: function loadFromImage(input) {
	            var _this4 = this;
	
	            return new Promise(function (resolve, reject) {
	                // Bad input type
	                if (!(input instanceof Image)) {
	                    reject(new Error('Input param must be a Image object.'));
	                }
	
	                // Set input image
	                _this4.image = input;
	
	                // Process image
	                _this4._processImage();
	
	                // Resolve the promise
	                resolve(_this4);
	            });
	        }
	    }, {
	        key: '_processImage',
	        value: function _processImage() {
	            // Reset canvas grid
	            this.canvas = [];
	            this.pixels = [];
	
	            // Calculate grid size
	            var width = Math.round(this.image.width * this.scaleRatio.x);
	            var height = Math.round(this.image.height * this.scaleRatio.y);
	            var cols = Math.ceil(width / this.cellSize);
	            var rows = Math.ceil(height / this.cellSize);
	
	            this.size = { width: width, height: height, cols: cols, rows: rows };
	
	            // Create canvas grid
	            var line = null;
	            var canvas = null;
	            var context = null;
	
	            var x = null; // cols
	            var y = null; // rows
	            var sx = null; // scaled cols
	            var sy = null; // scaled rows
	            var sw = null; // scaled width
	            var sh = null; // scaled height
	
	            // For each line
	            for (y = 0; y < this.size.rows; y++) {
	                // Reset current line
	                line = [];
	
	                // For each column
	                for (x = 0; x < this.size.cols; x++) {
	                    // Create canvas element
	                    canvas = document.createElement('canvas');
	
	                    // Set canvas size
	                    if (x === 0 || x < this.size.cols - 1) {
	                        canvas.width = this.size.width < this.cellSize ? this.size.width : this.cellSize;
	                    } else {
	                        // Get the rest for the last item (except the first one)
	                        canvas.width = this.size.width % this.cellSize;
	                    }
	
	                    if (y === 0 || y < this.size.rows - 1) {
	                        canvas.height = this.size.height < this.cellSize ? this.size.height : this.cellSize;
	                    } else {
	                        // Get the rest for the last item (except the first one)
	                        canvas.height = this.size.height % this.cellSize;
	                    }
	
	                    // Get canvas 2d context
	                    context = canvas.getContext('2d');
	
	                    // Fill withe background (avoid alpha chanel calculation)
	                    context.fillStyle = 'white';
	                    context.fillRect(0, 0, canvas.width, canvas.height);
	
	                    // Draw the part of image in the canvas (scale)
	                    sw = canvas.width / this.scaleRatio.x;
	                    sh = canvas.height / this.scaleRatio.y;
	                    sx = x * this.cellSize / this.scaleRatio.x;
	                    sy = y * this.cellSize / this.scaleRatio.y;
	
	                    context.drawImage(this.image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
	
	                    // Apply image filters
	                    (0, _lw2.default)(canvas, this.filters);
	
	                    // Add the canvas to current line
	                    line.push(canvas);
	                }
	
	                // Add the line to canvas grid
	                this.canvas.push(line);
	            }
	        }
	    }, {
	        key: 'getPixel',
	        value: function getPixel(x, y) {
	            // Test coords validity
	            x = parseInt(x);
	            y = parseInt(y);
	
	            if (isNaN(x) || isNaN(y)) {
	                throw new Error('[x, y] params must be Integer.');
	            }
	
	            // Test coords range
	            if (x < 0 || x >= this.size.width) {
	                throw new Error('Out of range: x = ' + x + ', max: ' + this.size.width);
	            }
	
	            if (y < 0 || y >= this.size.height) {
	                throw new Error('Out of range: y = ' + y + ', max: ' + this.size.height);
	            }
	
	            // Calculate target canvas coords
	            var col = parseInt(x / this.cellSize);
	            var row = parseInt(y / this.cellSize);
	
	            // Adjuste x/y values relative to canvas origin
	            col && (x -= this.cellSize * col);
	            row && (y -= this.cellSize * row);
	
	            // Get pixel data
	            var canvas = this.canvas[row][col];
	            var context = canvas.getContext('2d');
	            var pixelData = context.getImageData(x, y, 1, 1).data;
	
	            return {
	                color: { r: pixelData[0], g: pixelData[1], b: pixelData[2], a: pixelData[3] },
	                gray: (pixelData[0] + pixelData[1] + pixelData[2]) / 3,
	                grid: { col: col, row: row },
	                coords: { x: x, y: y }
	            };
	        }
	    }]);
	
	    return CanvasGrid;
	}();
	
	// Exports
	
	
	exports.CanvasGrid = CanvasGrid;
	exports.default = CanvasGrid;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("CanvasFilter", [], factory);
		else if(typeof exports === 'object')
			exports["CanvasFilter"] = factory();
		else
			root["CanvasFilter"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(1);
	
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		'use strict';
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		// Grayscale algorithms
		var grayscaleAlgorithms = ['none', 'average', 'desaturation', 'decomposition-min', 'decomposition-max', 'luma', 'luma-601', 'luma-709', 'luma-240', 'red-chanel', 'green-chanel', 'blue-chanel'];
		
		// Trucate color value in the 0-255 range
		function color(color) {
		    return color < 0 ? 0 : color > 255 ? 255 : color;
		}
		
		// Filters ...
		function brightness(data, i, value) {
		    if (value !== undefined) {
		        data[i] = color(data[i] + value);
		        data[i + 1] = color(data[i + 1] + value);
		        data[i + 2] = color(data[i + 2] + value);
		    }
		}
		
		function contrast(data, i, value) {
		    if (value !== undefined) {
		        data[i] = color(value * (data[i] - 128) + 128);
		        data[i + 1] = color(value * (data[i + 1] - 128) + 128);
		        data[i + 2] = color(value * (data[i + 2] - 128) + 128);
		    }
		}
		
		function gamma(data, i, value) {
		    if (value !== undefined) {
		        data[i] = color(Math.exp(Math.log(255 * (data[i] / 255)) * value));
		        data[i + 1] = color(Math.exp(Math.log(255 * (data[i + 1] / 255)) * value));
		        data[i + 2] = color(Math.exp(Math.log(255 * (data[i + 2] / 255)) * value));
		    }
		}
		
		function grayscale(data, i, algorithm, shades) {
		    // Graysale
		    // http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/
		
		    // Unsupported algorithm
		    if (grayscaleAlgorithms.indexOf(algorithm) === -1) {
		        throw new Error('Unsupported grayscale algorithm: ' + algorithm);
		    }
		
		    // None
		    if (algorithm === 'none') {
		        return null;
		    }
		
		    // Get Red/Green/Blue values
		    var gray = void 0;
		    var r = data[i];
		    var g = data[i + 1];
		    var b = data[i + 2];
		
		    switch (algorithm) {
		        case 'average':
		            gray = (r + g + b) / 3;
		            break;
		
		        case 'luma':
		            // Default
		            gray = r * 0.3 + g * 0.59 + b * 0.11;
		            break;
		
		        case 'luma-601':
		            // CCIR-601
		            gray = r * 0.299 + g * 0.587 + b * 0.114;
		            break;
		
		        case 'luma-709':
		            // ITU-R-709
		            gray = r * 0.2126 + g * 0.7152 + b * 0.0722;
		            break;
		
		        case 'luma-240':
		            // SMPTE-240M
		            gray = r * 0.212 + g * 0.701 + b * 0.087;
		            break;
		
		        case 'desaturation':
		            gray = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
		            break;
		
		        case 'decomposition-min':
		            gray = Math.min(r, g, b);
		            break;
		
		        case 'decomposition-max':
		            gray = Math.max(r, g, b);
		            break;
		
		        case 'red-chanel':
		            gray = r;
		            break;
		
		        case 'green-chanel':
		            gray = g;
		            break;
		
		        case 'blue-chanel':
		            gray = b;
		            break;
		    }
		
		    // Shades of gray
		    if (shades !== undefined) {
		        gray = parseInt(gray / shades) * shades;
		    }
		
		    // Force integer
		    gray = parseInt(gray);
		
		    // Set new r/g/b values
		    data[i] = color(gray);
		    data[i + 1] = color(gray);
		    data[i + 2] = color(gray);
		}
		
		// Apply filters on provided canvas
		function canvasFilters(canvas, settings) {
		    settings = Object.assign({}, {
		        smoothing: false, // Smoothing [true|fale]
		        brightness: 0, // Image brightness [-255 to +255]
		        contrast: 0, // Image contrast [-255 to +255]
		        gamma: 0, // Image gamma correction [0.01 to 7.99]
		        grayscale: 'none', // Graysale algorithm [average, luma, luma-601, luma-709, luma-240, desaturation, decomposition-[min|max], [red|green|blue]-chanel]
		        shadesOfGray: 256 // Number of shades of gray [2-256]
		    }, settings || {});
		
		    // Get canvas 2d context
		    var context = canvas.getContext('2d');
		
		    // Smoothing
		    if (context.imageSmoothingEnabled !== undefined) {
		        context.imageSmoothingEnabled = settings.smoothing;
		    } else {
		        context.mozImageSmoothingEnabled = settings.smoothing;
		        context.webkitImageSmoothingEnabled = settings.smoothing;
		        context.msImageSmoothingEnabled = settings.smoothing;
		        context.oImageSmoothingEnabled = settings.smoothing;
		    }
		
		    // Get image data
		    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		    var data = imageData.data;
		
		    var contrastFactor = void 0,
		        brightnessOffset = void 0,
		        gammaCorrection = void 0,
		        shadesOfGrayFactor = void 0;
		
		    if (settings.contrast !== 0) {
		        contrastFactor = 259 * (settings.contrast + 255) / (255 * (259 - settings.contrast));
		    }
		
		    if (settings.brightness !== 0) {
		        brightnessOffset = settings.brightness;
		    }
		
		    if (settings.gamma !== 0) {
		        gammaCorrection = 1 / settings.gamma;
		    }
		
		    // Shades of gray
		    if (settings.shadesOfGray > 1 && settings.shadesOfGray < 256) {
		        shadesOfGrayFactor = 255 / (settings.shadesOfGray - 1);
		    }
		
		    // For each pixel
		    for (var i = 0, il = data.length; i < il; i += 4) {
		        // Apply filters
		        brightness(data, i, brightnessOffset);
		        contrast(data, i, contrastFactor);
		        gamma(data, i, gammaCorrection);
		        grayscale(data, i, settings.grayscale, shadesOfGrayFactor);
		    }
		
		    // Write new image data on the context
		    context.putImageData(imageData, 0, 0);
		}
		
		// Exports
		exports.canvasFilters = canvasFilters;
		exports.default = canvasFilters;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=lw.canvas-filters.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=lw.canvas-grid.js.map