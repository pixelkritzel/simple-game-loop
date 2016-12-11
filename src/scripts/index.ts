import onKeyPress from './onKeyPress';
import gamepad from './gamepad';
import player from './playerStore';

const playerElement = document.getElementById('player');

const updateGame = function updateGame() {
  playerElement.style.left = player.coordinates.left + 'px';
  playerElement.style.top = player.coordinates.top + 'px';
  window.requestAnimationFrame(updateGame);
  player.move();
};

onKeyPress(player.move);
gamepad(player.move);
updateGame();