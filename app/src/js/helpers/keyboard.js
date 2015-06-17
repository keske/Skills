/**
 * Working with keyboard
 * Only in browser and for test/develop app
 */

var keyboard = {

  downKeys: [],

  checkDownKey: function(pad) {
    "use strict";

    game.startSample($('.pad').eq(pad));
  },

  playByKeyboard: function() {
    "use strict";

    $(window).on('keydown', function(e) {
      var key = e.keyCode;

      // 1
      if (key === 49) {
        keyboard.checkDownKey(0, 1);
      }

      // 2
      if (key === 50) {
        keyboard.checkDownKey(1, 2);
      }

      // 3
      if (key === 51) {
        keyboard.checkDownKey(2, 3);
      }

      // q
      if (key === 81) {
        keyboard.checkDownKey(3, 4);
      }

      // w
      if (key === 87) {
        keyboard.checkDownKey(4, 5);
      }

      // e
      if (key === 69) {
        keyboard.checkDownKey(5, 6);
      }

      // a
      if (key === 65) {
        keyboard.checkDownKey(6, 7);
      }

      // s
      if (key === 83) {
        keyboard.checkDownKey(7, 8);
      }

      // d
      if (key === 68) {
        keyboard.checkDownKey(8, 9);
      }

      // z
      if (key === 90) {
        keyboard.checkDownKey(9, 10);
      }

      // x
      if (key === 88) {
        keyboard.checkDownKey(10, 11);
      }

      // c
      if (key === 67) {
        keyboard.checkDownKey(11, 12);
      }
    });

  },

  init: (function() {
    "use strict";

    $(window).load(function() {
      keyboard.playByKeyboard();
    });
  }())

};
