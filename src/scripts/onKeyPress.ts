export default function onKeyPress(callback) {
    var keys = {},
        keysCount = 0,
        interval = null,
        trackedKeys = {
            119: true, // W
            87: true, // w
            115: true, // S
            83: true, // s
            97: true, // A
            65: true, // a
            100: true, // D
            68: true, // d
            37: true, // left arrow
            38: true, // up arrow
            39: true, // right arrow
            40: true // down arrow
        };

    window.addEventListener('keydown', function (event) {
        var code = event.which;

        if (trackedKeys[code]) {
            if (!keys[code]) {
                keys[code] = true;
                keysCount++;
            }

            if (interval === null) {
                interval = setInterval(function () {
                    var axes = { x: 0, y: 0 } ;

                    // check if north or south
                    if (keys[119] || keys[87] || keys[38]) {
                        axes.y = -1;
                    } else if (keys[115] || keys[83] || keys[40]) {
                        axes.y = 1;
                    }

                    // concat west or east
                    if (keys[97] || keys[65] || keys[37]) {
                        axes.x = -1;
                    } else if (keys[100] || keys[68] || keys[39]) {
                        axes.x = 1;
                    }

                    callback(axes);
                }, 1000 / 60);
            }
        }
    });

    window.addEventListener('keyup', function (event) {
        var code = event.which;

        if (keys[code]) {
            delete keys[code];
            keysCount--;
        }

        // need to check if keyboard movement stopped
        if ((trackedKeys[code]) && (keysCount === 0)) {
            clearInterval(interval);
            interval = null;
            callback('none');
        }
    });
}