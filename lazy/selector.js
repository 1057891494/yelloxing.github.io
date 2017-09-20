(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /*一个小型的sizzle.js选择器*/
        "doSelector": function(selector, context) {
            if (/^#/.test(selector)) {
                var elem = context.getElementById(new String(selector).replace(/^#/, ''));
                if (elem) {
                    return [elem];
                } else {
                    return [];
                }
            }
        }
    });
})(window, window.Lazy);
