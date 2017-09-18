(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /**
         * 获取元素包括的自己的字符串
         */
        "outerHTML": function(node) {
            return node.outerHTML || (function(n) {
                var div = document.createElement('div'),
                    h;
                div.appendChild(n);
                h = div.innerHTML;
                div = null;
                return h;
            })(node);
        }

    });
})(window, window.Lazy);
