(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /*一个小型的sizzle.js选择器*/
        "doSelector": function(selector, context) {
            if (/^#/.test(selector)) {
                return [document.getElementById(new String(selector).replace(/^#/, ''))];
            }
        }
    });
})(window, window.Lazy);
