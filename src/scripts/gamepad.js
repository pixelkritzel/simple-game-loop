var haveEvents = 'ongamepadconnected' in window;
var controllers = {};

var callback;

function connecthandler(e) {
  addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
  requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function updateStatus() {
  if (!haveEvents) {
    scangamepads();
  }

  var i = 0;
  var j;

  for (j in controllers) {
    var controller = controllers[j];

    // Buttons aren't used yet. But maybe I'll need this code
    // for (i = 0; i < controller.buttons.length; i++) {
    //   var val = controller.buttons[i];
    //   var pressed = val == 1.0;
    //   if (typeof(val) == "object") {
    //     pressed = val.pressed;
    //     val = val.value;
    //   }
    //   var pct = Math.round(val * 100) + "%";
    // }

    for (i = 0; i < controller.axes.length; i++) {
      callback({
        y: controller.axes[0].toFixed(1),
        x: controller.axes[1].toFixed(1) 
      });
      
    }
  }

  setInterval(updateStatus, 1000);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
        
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}


window.addEventListener('gamepadconnected', connecthandler);
window.addEventListener('gamepaddisconnected', disconnecthandler);

export default function(cb) {
  callback = cb;
  if (!haveEvents) {
    setInterval(scangamepads, 500);
  }
}
