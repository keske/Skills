!(function() {

  var menues = {

    // Show `about`
    showAbout: function() {
      "use strict";

      if (!$('body').hasClass('show-help-menu')) {
        $('body').toggleClass('show-about-menu');
      }
    },

    // Show `help`
    showHelp: function() {
      "use strict";

      if (!$('body').hasClass('show-about-menu')) {
        $('body').toggleClass('show-help-menu');
      }
    },

    bind: (function() {
      "use strict";

      $(document).ready(function() {
        $('.header-about').on('click', function() {
          menues.showAbout();
        });

        $('.header-help').on('click', function() {
          menues.showHelp();
        });
      });

    }())

  };

}());
