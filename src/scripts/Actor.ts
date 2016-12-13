const arena = document.getElementById('arena');

const getArenaDimensions = function getArenaDimensions() {
  return {
    top: 0,
    left: 0,
    bottom: parseInt(window.getComputedStyle(arena).height),
    right: parseInt(window.getComputedStyle(arena).width)
  };
};

export let arenaDimensions = getArenaDimensions();

window.addEventListener('resize', function() {
  arenaDimensions = getArenaDimensions();
});

const verticalSpeed = 10;
const horizontalSpeed = 10;

const testWallCollision = function testCollision(coordinates, actorDimensions) {
    const playerCoordinates = { 
        left: coordinates.left - actorDimensions.width/2,
        top: coordinates.top - actorDimensions.height/2,
        right: coordinates.left + actorDimensions.width/2,
        bottom: coordinates.top + actorDimensions.height/2
    };
    return (
           arenaDimensions.left <= playerCoordinates.left
        && arenaDimensions.top <= playerCoordinates.top
        && arenaDimensions.right >= playerCoordinates.right
        && arenaDimensions.bottom >= playerCoordinates.bottom
    );
};

export default class Actor {

  actorDimensions: {
    width:number,
    height:number
  };

  coordinates: {
    top:number,
    left:number
  };

  actorElement:Element;

  constructor(actorElement) {
    this.actorElement = actorElement;
    this.actorDimensions = {
      width: parseInt(window.getComputedStyle(actorElement).width, 10),
      height: parseInt(window.getComputedStyle(actorElement).height, 10)
    };
    this.coordinates = {
      left: parseInt(window.getComputedStyle(this.actorElement).left, 10),
      top: parseInt(window.getComputedStyle(this.actorElement).top, 10)
    };
  }

  

  move = (axes = { x: 0, y: 0 }, speed = { x: horizontalSpeed, y: verticalSpeed}) => {
    const newActorCoodinates = { ...this.coordinates };
    newActorCoodinates.top = this.coordinates.top + speed.x * axes.y;
    newActorCoodinates.left = this.coordinates.left + speed.y * axes.x;
    if (testWallCollision(newActorCoodinates, this.actorDimensions)) {
        this.coordinates = newActorCoodinates;
    }
  };
}
