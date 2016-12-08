const arena = document.getElementById('arena');
const player = document.getElementById('player');

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

let playerCoordinates = {
  left: parseInt(window.getComputedStyle(player).left, 10),
  top: parseInt(window.getComputedStyle(player).top, 10)
};

const playerDimensions = {
  width: parseInt(window.getComputedStyle(player).width, 10),
  height: parseInt(window.getComputedStyle(player).height, 10)
};

const verticalSpeed = 10;
const horizontalSpeed = 10;

const updateGame = function updateGame() {
  player.style.left = playerCoordinates.left + 'px';
  player.style.top = playerCoordinates.top + 'px';
};

const testWallCollision = function testCollision(coordinates) {
    const playerCoordinates = { 
        left: coordinates.left - playerDimensions.width/2,
        top: coordinates.top - playerDimensions.height/2,
        right: coordinates.left + playerDimensions.width/2,
        bottom: coordinates.top + playerDimensions.height/2
    };
    return (
           arenaDimensions.left <= playerCoordinates.left
        && arenaDimensions.top <= playerCoordinates.top
        && arenaDimensions.right >= playerCoordinates.right
        && arenaDimensions.bottom >= playerCoordinates.bottom
    );
};

const move = function move(directions) {
  const newplayerCoodinates = { ...playerCoordinates };
  if ( directions.includes('up') ) {
    newplayerCoodinates.top = playerCoordinates.top - verticalSpeed;
  }
  if ( directions.includes('down') ) {
    newplayerCoodinates.top = playerCoordinates.top + verticalSpeed;
  }
  if ( directions.includes('left') ) {
    newplayerCoodinates.left = playerCoordinates.left - horizontalSpeed;
  }
  if ( directions.includes('right') ) {
    newplayerCoodinates.left = playerCoordinates.left + horizontalSpeed;
  }
  if (testWallCollision(newplayerCoodinates)) {
      playerCoordinates = newplayerCoodinates;
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