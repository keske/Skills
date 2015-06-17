var pads = {

  /**
   * Shuffle all pads
   */
  shuffle: function() {
    "use strict";

    sample.setAllSamples();

    // Block screen
    ui.loadSamplesBackground.show();

    $('.pads .pad').each(function() {
      $(this).addClass('refresh');

      setTimeout(function() {
        $('.pads .pad').each(function() {
          $(this).removeClass('refresh');
          ui.appSetBackgroudColor();
        });
      }, 700);

      setTimeout(function() {
        ui.loadSamplesBackground.hide();
      }, 1500);
    });

  },

  /**
   * Shuffle only one pad
   */
  shuffleOne: function() {
    "use strict";

    $('.pads .pad').each(function() {
      if (!$(this).hasClass('pad-wants-to-change')) {
        sample.isRandomOneSituation = true;
        $(this).addClass('pad-wants-to-change');
      } else {
        sample.isRandomOneSituation = false;
        $(this).removeClass('pad-wants-to-change');
      }
    });
  },

  bind: function() {
    "use strict";

    // Shuffle all pads when device was shaken
    $(window).on('shake', function() {
      $('.header-random-all').click();
    });

    // Bind shuffle all pads
    $('.header-random-all').on('click', function() {
      pads.shuffle();
    });

    // Bind shuffle one pad
    $('.header-random-one').on('click', function() {
      pads.shuffleOne();
    });
  },

  init: (function() {
    "use strict";

    $(window).load(function() {
      pads.bind();
    });
  }())
};
