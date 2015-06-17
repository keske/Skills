var game = {

  /**
   * Get sample number
   *
   * @return {Integer} sample number
   */
  getSampleNum: function($elem) {
    "use strict";

    return $elem.index() + 1;
  },

  /**
   * Start play sample
   */
  startSample: function($elem) {
    "use strict";

    // Play or change sample on the one pad
    if (!sample.isRandomOneSituation) {

      sample.play(this.getSampleNum($elem));

    } else {

      // Set randome sample to the pad
      sample.randomOnePad(this.getSampleNum($elem));

      // Animate icon
      $elem.addClass('refresh-one');
      
      // Remove animation from pad
      setTimeout(function() {
        $elem.removeClass('refresh-one');
      }, 700);
    }

  },

  init: (function() {
    "use strict";

    $(window).load(function() {

      // For iOS app should use only `touchstart` event
      // `mousedown` for development and test
      $('.pad').on('touchstart mousedown', function() {
        game.startSample($(this));
      });

    });

  }())
};
