import onKeyPress from './onKeyPress';
// import gamepad from './gamepad';
import Actor from './Actor';

import { arenaDimensions } from './Actor';

const playerElement = document.getElementById('player');

const otherElement = document.getElementById('other');
const player = new Actor(playerElement);
const other = new Actor(otherElement);

setInterval(function() {
  other.move({x: 1, y: 1}, { x: Math.round(Math.random() * arenaDimensions.right), y: Math.round(Math.random() * arenaDimensions.bottom) } )
}, 100);

const updateGame = function updateGame() {
  playerElement.style.left = player.coordinates.left + 'px';
  playerElement.style.top = player.coordinates.top + 'px';
  otherElement.style.left = other.coordinates.left + 'px';
  otherElement.style.top = other.coordinates.top + 'px';
  window.requestAnimationFrame(updateGame);
  player.move();
};

onKeyPress(player.move);
// gamepad(player.move);
updateGame();