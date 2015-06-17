var effectsUI = {

  isEffectsShow: function() {
    return $('.wrap').hasClass('show-effects-panel');
  },

  showPanelOrHide: function($elem) {
    "use strict";

    var panel = $elem.attr('data-effect');

    if ($elem.hasClass('active')) {
      $('.wrap').addClass('show-effects-panel');

      // Hide all panels
      $('.effects-panel').find('.panel').removeClass('show');
      $('.effects-panel').find('.' + panel + '-panel').addClass('show');
      
      if (effectsUI.isEffectsShow()) {
        $('footer .show-panel').removeClass('active');
        $('footer .footer-' + panel).addClass('active');
      }
    } else {
      $('.wrap').removeClass('show-effects-panel');
    }
  },

  setPadStatus: {
    delay: function($elem) {
      "use strict";

      var attr = 'data-delay';
      this.check($elem, attr);
    },

    repeat: function($elem) {
      "use strict";

      var attr = 'data-repeat';

      this.check($elem, attr);
    },

    volume: function($elem) {
      "use strict";

      var attr = 'data-volume';
      this.check($elem, attr);
    },

    // Set or unset status
    check: function($elem, attr) {
      "use strict";

      var status = $elem.attr(attr),
        imgClass = attr.replace('data-', '');

      if (status === 'false') {
        $elem.attr(attr, 'true');
        $elem.find('img.' + imgClass).addClass('show');
      } else {
        $elem.attr(attr, 'false');
        $elem.find('img.' + imgClass).removeClass('show');
      }

      sample.repeat();
    },

    // Check what kind of status need to set/unset
    kind: function($elem) {
      "use strict";

      var kind = '';

      $('.panel').each(function() {
        if ($(this).hasClass('show')) {
          // Make function name from object classname
          kind = (($(this).attr('class').split(' '))[0]).replace('-panel', '');
          // Call function
          effectsUI.setPadStatus[kind]($elem);
        }
      });
    },
  },

  setLabels: {
    delay: function() {
      "use strict";

      $('.delayValue').html($('.setDelay').val() + ' s');
    },

    feedback: function() {
      "use strict";

      $('.feedbackValue').html($('.setDelayFeedback').val() + ' times');
    },

    repeat: function() {
      "use strict";

      $('.repeatValue').html($('.setRepeat').val() + ' BPM');
      sample.bpm = $('.setRepeat').val();
    },

    volume: function() {
      "use strict";

      $('.volumeValue').html(($('.setVolume').val() * 10) + '0%');
    },

    all: function() {
      "use strict";

      this.delay();
      this.feedback();
      this.repeat();
      this.volume();
    },
  },

  bind: (function() {
    "use strict";

    $(window).load(function() {
      // Show or hide panel bind
      $('.show-panel').on('click', function() {
        effectsUI.showPanelOrHide($(this));
      });

      // Set/unset pad status bind
      $('.pads .pad').on('taphold', function() {
        if (effectsUI.isEffectsShow()) {
          // Set status
          effectsUI.setPadStatus.kind($(this));
          // Play with effect
          game.startSample($(this));
        }
      });

      // Set all labels values
      effectsUI.setLabels.all();

      // Set delay value when eange element change event
      $('.setDelay').on('change', function() {
        effectsUI.setLabels.delay();
      });

      // Set delay feedback value when eange element change event
      $('.setDelayFeedback').on('change', function() {
        effectsUI.setLabels.feedback();
      });

      // Set delay repeat value when eange element change event
      $('.setRepeat').on('change', function() {
        effectsUI.setLabels.repeat();
      });

      // Set delay volume value when eange element change event
      $('.setVolume').on('change', function() {
        effectsUI.setLabels.volume();
      });
    });

  }())

};
