/**
 * Show elemetns after window.load()
 */

!(function() {
  "use strict";

  var CLASS_NAME = 'show-after-load',
    showAfterLoad = {

      show: function() {

        var elem = $('.' + CLASS_NAME);

        elem.show();
      },

      init: (function() {

        $(window).load(function() {
          showAfterLoad.show();
        });
      }())

    };

}());
