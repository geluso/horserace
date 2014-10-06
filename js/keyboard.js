var UP = 87,
  DOWN = 83,
  LEFT = 65,
  RIGHT = 68,
  ENTER = 13,
  E = 69,
  SPACE = 32,
  SHIFT = 16,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40;

var Keyboard = {
    pressed: {},

    release: function release(e) {
      this.pressed[e.which] = false;
      this.pressed[e.keyCode] = false;
    },

    press: function (e) {
      this.pressed[e.which] = true;
      this.pressed[e.keyCode] = true;
    }
}

