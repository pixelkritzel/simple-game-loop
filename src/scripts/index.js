const arena = document.getElementById('arena');
const car = document.getElementById('car');

const getArenaDimensions = function getArenaDimensions() {
  return {
    top: 0,
    left: 0,
    bottom: parseInt(window.getComputedStyle(arena).height),
    right: parseInt(window.getComputedStyle(arena).width)
  };
};

let arenaDimensions = getArenaDimensions();

window.addEventListener('resize', function() {
  arenaDimensions = getArenaDimensions();
});

let carCoordinates = {
  left: parseInt(window.getComputedStyle(car).left, 10),
  top: parseInt(window.getComputedStyle(car).top, 10)
};

const carDimensions = {
  width: parseInt(window.getComputedStyle(car).width, 10),
  height: parseInt(window.getComputedStyle(car).height, 10)
};

const verticalSpeed = 10;
const horizontalSpeed = 10;

const updateGame = function updateGame() {
  car.style.left = carCoordinates.left + 'px';
  car.style.top = carCoordinates.top + 'px';
};

const testWallCollision = function testCollision(coordinates) {
    const carCoordinates = { 
        left: coordinates.left - carDimensions.width/2,
        top: coordinates.top - carDimensions.height/2,
        right: coordinates.left + carDimensions.width/2,
        bottom: coordinates.top + carDimensions.height/2
    };
    return (
           arenaDimensions.left <= carCoordinates.left
        && arenaDimensions.top <= carCoordinates.top
        && arenaDimensions.right >= carCoordinates.right
        && arenaDimensions.bottom >= carCoordinates.bottom
    );
};

const move = function move(directions) {
  const newCarCoodinates = { ...carCoordinates };
  if ( directions.includes('up') ) {
    newCarCoodinates.top = carCoordinates.top - verticalSpeed;
  }
  if ( directions.includes('down') ) {
    newCarCoodinates.top = carCoordinates.top + verticalSpeed;
  }
  if ( directions.includes('left') ) {
    newCarCoodinates.left = carCoordinates.left - horizontalSpeed;
  }
  if ( directions.includes('right') ) {
    newCarCoodinates.left = carCoordinates.left + horizontalSpeed;
  }
  if (testWallCollision(newCarCoodinates)) {
      carCoordinates = newCarCoodinates;
      window.requestAnimationFrame(updateGame);
  }
};

function onKeyPress(callback) {
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
                    var directions = [];

                    // check if north or south
                    if (keys[119] || keys[87] || keys[38]) {
                        directions.push('up');
                    } else if (keys[115] || keys[83] || keys[40]) {
                        directions.push('down');
                    }

                    // concat west or east
                    if (keys[97] || keys[65] || keys[37]) {
                        directions.push('left');
                    } else if (keys[100] || keys[68] || keys[39]) {
                        directions.push('right');
                    }

                    callback(directions);
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

onKeyPress(move);

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});