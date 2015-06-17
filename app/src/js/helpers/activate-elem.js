!(function() {

  var activateElem = {

    /**
     * Activate element
     *
     * @param {Object} $elem
     */
    active: function($elem) {
      "use strict";

      if (!$elem.hasClass('active')) {
        $elem.addClass('active');
      } else {
        $elem.removeClass('active');
      }
    },

    setActive: {
      bind: (function() {
        'use strict';

        $(document).ready(function() {
          var $elem = $('.activated');

          $elem.each(function() {
            $(this).on('click', function() {
              activateElem.active($(this));
            });
          });
        });
      }())
    },
  };

}());
