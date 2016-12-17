// Debug...
var debug = true;

// Defaults settings
var file, canvasGrid;
var settings = {
    scaleRatio: 1,
    cellSize  : 1024,
    filters: {
        smoothing   : 0,      // Smoothing the input image ?
        brightness  : 0,      // Image brightness [-255 to +255]
        contrast    : 0,      // Image contrast [-255 to +255]
        gamma       : 0,      // Image gamma correction [0.01 to 7.99]
        grayscale   : 'none', // Graysale algorithm [average, luma, luma-601, luma-709, luma-240, desaturation, decomposition-[min|max], [red|green|blue]-chanel]
        shadesOfGray: 256     // Number of shades of gray [2-256]
    }
}

// Load file...
function loadFile() {
    console.log('file:', file);

    // Create CanvasGrid object
    canvasGrid = new CanvasGrid.CanvasGrid(settings);

    // <file> can be Image, File URL object or URL string (http://* or data:image/*)
    canvasGrid.load(file).then(function(cg) {
        console.log('canvasGrid:', cg);
        drawCanvasGrid(cg);
    })
    .catch(function(error) {
        console.error('error:', error);
    });
}

/*
loadFile('http://www.kawa.net/xp/images/xp-title-256.gif');

loadFile('data:image/gif;base64,'+
    'R0lGODlhAAEwAMQAAJ2M5Me98GRK1DoYyYBr3PHv++Pe99XO81Y50auc6PBkZEgpzbmt7HJa2I57'+
    '4P7x8fWdnes6OvnHx/vV1e1ISO5WVvzj4/SOjvKAgPi5ufFycverq39p3OosLCwIxf///yH5BAAA'+
    'AAAALAAAAAAAATAAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/Q6PIh'+
    'kTxmAIF2yxUkVIeumHuQms+tR6XDZitIlzYbo5BLLBq5YhITeP6AgR4BKQcDgoiAX2iMjSUTcmwb'+
    'IhKRFA91bRARkR0RfC+JggUohqKCA2WOq44Qlg8PnHJ8mZ2vLgenfwilh7p/C6qsw2i1bBB5chAi'+
    'xmwUa5HLLQC/BCemvx4IpMTdZrFysm1vzJEYIhuRFS4Ev4sk2NXc3vRQGbZsERYjxhFXItDauEDw'+
    'S5iIeLqs1VsIJY6tDCSMkRPhyk6LXwNKIDz1jqHHIgUAMBhRsROocuNI/5RkI4FFgF8C4PnSNaDj'+
    'x5s/Qh5SZUGcuoh6VEZquYKaLgAjNiZKhbOpD52A+OE7JrWNv6pt9q1o8IvQB6WIEBh0SrYGVEAx'+
    'P6zsoIFCJFDNzn24F67Fgl+kwAraVrYvjbOBkPaUc4lum3UfmnWgoFiuCgO/eOkNpNCvZRjtEo0M'+
    'yBJlmwuJp4bTqoJBtcmAHFxe/YJgIgNrQYuw0ElCP3yTWBg9RWAmR9bAVxQQNQCSHMQkLUmcsNyF'+
    'n2zZvMYwkAAAATEAAASY9zWA9+/bS4H/zn3EePDcqVvHrr38iwPnAxggEQBAAy0EALg3ob6LA+3X'+
    'eLfbXui5IJEIVFgBA/900KXlQkh3QdeAV5kJIh0JkCVi0wemJcLLBxAyOKEMEQqC1AcAlBhITSkk'+
    '4NopAzjA3YvQ7XfCgTTkwmB0LgTgG4NfDAjISCZUaKIJzyFCiI87KgJDhkoeQGMiFx40JU1EftDk'+
    'Ai/gOEMCTcLUAphhDtnhkSW8JMqJI0ApSAMfkFmmB1mycKYgqAFTQgI/QveFmiJ2GRQNRs5p4QoG'+
    '9LmjWImwOUKSiMBJQqGAGJCoodq84ABxDM4ngpxhDmCAkL84uoKXMlyJqQeSpkApIA1k19spbgJi'+
    '6p2IOAiioki9+kes1in6h6csQDqnV7iumN+siTTgqyhVqnCBAtQqINv/DKuKQqwJwy1lUAGqDqLi'+
    'H6aOK4iupHowQAHdIsLUCOBC60I2CBh7aAHCEjCPAebu0qSNQQDK4ADpUqaCgOsRFG3BAdirK6ii'+
    'kNDvIghfp7AJDLegoygCeFqwB/P5qqsIyf7BgXfhavedEh97+0G/gWxLqCgHkOogvtmMUPKHmNE8'+
    'zSm61hrIB0JXeoIoCp3yBFcM8oViNTIYEAAD1oXrwdPnjtByVCLYOwgLUlNNgNXsELetwIHEtGki'+
    'lZXA8VdvOwFzpPPgrIvMJtR3nbAefoC2B2nZHciVhBTdKn3r8R3WQKKoRgLEqX0QLrDZVV5wTJD/'+
    '4TgT7UJdwrN/tI0h/7Nlwtn5Hxl9QOkCfxPy6rYGkB7m4SmcHnMJayPyRbawfpC7IBsiUTIipopQ'+
    'tCB4Z97kiYkQTeXfDAhu6+PZFn/C37uYEC58vJMruc9NbO1B8F17rjW9y8r7gb0fMJ228yaSuu75'+
    'kaVP5c+JbD4CcX53P76WS3mC1wJRJxMM73bGO8UCHHChAY6AUtjzCvHMxabjeWCBDYxYC9wniAJi'+
    'D3D9S8QCxkBCLXAvESNTguJAtoK5hY5+iBAdiOKGtcHFcH+CMBeXYCgIGdruD2mBmUKEJbOCIeV4'+
    '+nOBEZ2wMVHsUAXKQyAHA+Gegm3ugAj8XldIMEVAVLFxM1wT/NxVJP9REElRPHuBr6KFhCj+igXS'+
    'Y1v5ElGeJgIvKdnQ3wDRUoIB1vE3ByyD8mj3MlFwo4t/iJYDgJUA78xjcvMxAAPwNoTfNaoFlnQX'+
    'KQboKADw7UIY4c4eh9VHMWrtkzVEhAgy6T0S/PCCOiOOdAwwwPkxSAmj/BrYsoGUjwkAAA5woQe4'+
    '40JTsTJyJfAlMIW5ybgNsEofPNweR2g1OokAOmk0Qs5cgMgVFcCCOyqlEzEGI/eA85YAvGQ6VZlM'+
    'Ux5khadgUzcNhoQPAiKbB+Ol7xjkQBJ8bEMfs94+GxQxOxIwhIsTp5JKgMV40kefSNiaDFUgzPmB'+
    'Tl0M+KBBCoZPhOZzUAUXHUBGafYxUhRMhsK6hjADwboy6oKNQrioQFHgxlYmoF8L0M81NfTQ++VN'+
    'fS3CqU7XGYgE+GqHvrLJ8Tr6qXmqiwAF9CffgnMNqmWHAWNBwwGsKpKsrmJqltOOV69nuYxSkqpo'+
    'Tata18rWtrr1rTIIAQA7'
);
*/

// UI --------------------------------------------------------------------------

var $canvasWrapper = $('#canvasWrapper');
var $fileName      = $('#fileName');
var $noFile        = $('#noFile');
var $file          = $('#file');
var $pixel         = $('#pixel');
var $filters       = $('#filters');

var $pixelRGBA   = $pixel.find('.rgba');
var $pixelColor  = $pixel.find('.color');
var $pixelCoords = $pixel.find('.coords');

function drawCanvasGrid(cg) {
    //console.info('onCanvas:', canvas);
    $canvasWrapper.empty().width(cg.size.width);
    $fileName.html(cg.file.name);
    $noFile.hide();

    var x, y, l;

    // For each grid line
    for (y = 0, yl = cg.canvas.length; y < yl; y++) {
        l = cg.canvas[y];

        // For each line cell
        for (x = 0, xl = l.length; x < xl; x++) {
            $canvasWrapper.append(l[x]);
        }
    }
}

$(document).ready(function() {
    // On file input change
    $file.on('change', function(event) {
        file = event.target.files[0];

        loadFile(file);
        $filters.show();
        $(this).val(null);
    });

    // On mouse move
    $(document).on('mousemove', function(event) {
        if (! canvasGrid) {
            return;
        }

        if (event.pageX >= canvasGrid.size.width || event.pageY >= canvasGrid.size.height) {
            return;
        }

        var pixel  = canvasGrid.getPixel(event.pageX, event.pageY);
        var rgba   = 'rgba(' + pixel.color.r + ',' + pixel.color.g + ',' + pixel.color.b + ',' + (pixel.color.a / 255) + ')';
        var coords = 'col: ' + pixel.grid.col + ', row: ' + pixel.grid.row + ', x: ' + pixel.coords.x + ', y: ' + pixel.coords.y

        $pixelColor.css('backgroundColor', rgba);
        $pixelCoords.html(coords);
        $pixelRGBA.html(rgba);
        $pixel.show();
    });

    $canvasWrapper.on('mouseleave', function(event) {
        $pixel.hide();
    });

    $filters.find('select, input').on('change', function(event) {
        var value = this.value;

        if (this.id !== 'grayscale') {
            value = parseFloat(value);
        }

        settings.filters[this.id] = value;
        console.log(settings);
        loadFile();
    });
});
