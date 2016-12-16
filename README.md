# lw.canvas-grid
Canvas grid for [LaserWeb/CNCWeb](https://github.com/LaserWeb/LaserWeb4).

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
    scaleRatio: 0.5,
    cellSize  : 1024,
    filters: {
        smoothing   : false,  // Smoothing the input image ?
        brightness  : 0,      // Image brightness [-255 to +255]
        contrast    : 0,      // Image contrast [-255 to +255]
        gamma       : 0,      // Image gamma correction [0.01 to 7.99]
        grayscale   : 'luma', // Graysale algorithm [average, luma, luma-601, luma-709, luma-240, desaturation, decomposition-[min|max], [red|green|blue]-chanel]
        shadesOfGray: 256     // Number of shades of gray [2-256]
    }
}
```

## Usages
```javascript
import CanvasGrid from 'lw.canvas-grid'

let canvasGrid = new CanvasGrid(settings)

// Apply/Update filters
canvasGrid.applyFilters({ brightness: 10, contrast: 5 })
```
