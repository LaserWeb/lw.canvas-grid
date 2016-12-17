# lw.canvas-grid
Canvas grid for [LaserWeb/CNCWeb](https://github.com/LaserWeb/LaserWeb4).

# Canvas size limitation
Due to limitation of the size of the `<canvas>` element by some browser, obtaining information about pixels of a very large bitmap was impossible with a single canvas.
This library tries to overcome this limitation by loading an image in a grid of canvas.

Reference: http://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element

## Demo
https://lautr3k.github.io/lw.canvas-grid/dist/example/

## Installation
Using NPM
```
npm install lw.canvas-grid
```

Using GIT
```
git clone https://github.com/lautr3k/lw.canvas-grid.git
cd lw.canvas-grid
npm install
```

Or download the last build from https://raw.githubusercontent.com/lautr3k/lw.canvas-grid/master/dist/lw.canvas-grid.js
```html
<script src="./lw.canvas-grid.js"></script>
<script>
  var canvasGrid = CanvasGrid.CanvasGrid();
</script>
```

## Settings
```javascript
let settings = {
    scaleRatio: 1,    // Scaling ratio
    cellSize  : 2048, // Canvas max size (width and height)
    filters   : {
        smoothing   : false,  // Smoothing the input image ?
        brightness  : 0,      // Image brightness [-255 to +255]
        contrast    : 0,      // Image contrast [-255 to +255]
        gamma       : 0,      // Image gamma correction [0.01 to 7.99]
        grayscale   : 'none', // Graysale algorithm [average, luma, luma-601, luma-709, luma-240, desaturation, decomposition-[min|max], [red|green|blue]-chanel]
        shadesOfGray: 256     // Number of shades of gray [2-256]
    }
}
```

## Usages
```javascript
import CanvasGrid from 'lw.canvas-grid'

let canvasGrid = new CanvasGrid(settings)

// <file> can be Image, File, URL object or URL string (http://* or data:image/*)
canvasGrid.load(file).then(function(cg) {
    console.log('canvasGrid:', cg);

    // Get pixel data
    let pixelData = cg.getPixel(x, y);

    // pixelData {
    //     color : { r, g, b, a },
    //     gray  : int[0-255],
    //     grid  : { col, row },
    //     coords: { x, y }
    // }

    console.log(cg.size)  // { width, height, cols, rows }
    console.log(cg.file)  // File object
    console.log(cg.image) // Image object
    console.log(cg.url)   // URL object
})
.catch(function(error) {
    console.error('error:', error);
});
```
