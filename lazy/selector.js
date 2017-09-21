(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /*一个小型的sizzle.js选择器*/
        "doSelector": function(selector, context) {
            /**
             * 先把单纯的提取出来解决了
             */

            if (/^#/.test(selector)) {
                //Id选择器
                var elem = context.getElementById(new String(selector).replace(/^#/, ''));
                if (elem) {
                    return [elem];
                } else {
                    return [];
                }

            } else if (true) {
                //别的单纯选择器

            } else {
                /**
                 * 对于不是上面简单的字符串，进行下面的选择查找
                 *
                 * 1.对表达式分组。
                 * 2.选择合适的处理顺序。
                 * 3.在当前的上下文里过滤要找的节点。并更新上下文。重复这一过程，直到结尾。
                 * 4.对结果排序，如果需要的话。
                 * 5.返回结果数组。
                 */
            }
        }
    });
})(window, window.Lazy);
