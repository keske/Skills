var ui = {

  getRandomColor: function() {
    "use strict";

    return (Math.random() * (123 - 1) + 1).toFixed(0);
  },

  appSetBackgroudColor: function() {
    "use strict";

    var red, green, blue = 0,
      rgb = '';

    red = this.getRandomColor();
    green = this.getRandomColor();
    blue = this.getRandomColor();

    rgb = 'rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
    $('body').css('background', rgb);

    $('.about-menu').css('background', rgb);
  },

  bind: (function() {
    "use strict";

    $(document).ready(function() {
      ui.appSetBackgroudColor();
    });

    var openInSafari = function(link) {
      "use strict";

      var ref = window.open(link, '_system', 'location=yes');

      ref.addEventListener('loadstart', false);
      ref.removeEventListener('loadstart', false);
    };
  }()),

  loadSamplesBackground: {

    show: function() {
      "use strict";

      $('.load-samples-bg').addClass('show');
    },

    hide: function() {
      "use strict";

      $('.load-samples-bg').removeClass('show');
    },

    bind: (function() {
      "use strict";

      $(window).load(function() {
        $('.load-samples-bg')
          .css('width', $(window).width())
          .css('height', $(window).height());
      });
    }())
  },
};