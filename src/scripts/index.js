const arena = document.getElementById('arena');
const car = document.getElementById('car');

const getArenaDimensions = function getArenaDimensions() {
  return {
    top: 0,
    left: 0,
    bottom: parseInt(window.getComputedStyle(arena).height),
    width: parseInt(window.getComputedStyle(arena).width)
  };
};

let arenaDimensions = getArenaDimensions();

window.addEventListener('resize', () => {
  arenaDimensions = getArenaDimensions();
  console.log(arenaDimensions);
});

const carCoordinates = { 
  left: parseInt(window.getComputedStyle(car).left, 10),
  top: parseInt(window.getComputedStyle(car).top, 10)
};

const verticalSpeed = 10;
const horizontalSpeed = 10;

const updateGame = function updateGame() {
  car.style.left = carCoordinates.left + 'px';
  car.style.top = carCoordinates.top + 'px';
}

const move = function move(directions) {
  if ( directions.includes('up') ) {
    carCoordinates.top = carCoordinates.top - verticalSpeed;
  }
  if ( directions.includes('down') ) {
    carCoordinates.top = carCoordinates.top + verticalSpeed;
  }
  if ( directions.includes('left') ) {
    carCoordinates.left = carCoordinates.left - horizontalSpeed;
  }
  if ( directions.includes('right') ) {
    carCoordinates.left = carCoordinates.left + horizontalSpeed;
  }
  window.requestAnimationFrame(updateGame);
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