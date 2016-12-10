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

const playerDimensions = {
  width: parseInt(window.getComputedStyle(player).width, 10),
  height: parseInt(window.getComputedStyle(player).height, 10)
};

const verticalSpeed = 10;
const horizontalSpeed = 10;

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

class PlayerStore {
  coordinates = {
    left: parseInt(window.getComputedStyle(player).left, 10),
    top: parseInt(window.getComputedStyle(player).top, 10)
  };

  move = (axes = { x: 0, y: 0 }) => {
    console.log(axes);
    const newplayerCoodinates = { ...this.coordinates };
    newplayerCoodinates.top = this.coordinates.top + verticalSpeed * axes.y;
    newplayerCoodinates.left = this.coordinates.left + horizontalSpeed * axes.x;
    if (testWallCollision(newplayerCoodinates)) {
        this.coordinates = newplayerCoodinates;
    }
  };
}

export default new PlayerStore();