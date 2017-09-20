(function(window, Lazy, undefined) {
    'use strict';

    Lazy.prototype.extend({

        /**
         * 返回全部被选元素的直接父元素
         */
        "parent": function() {
            var $$this = Lazy(this);
            var i = 0,
                node = undefined,
                parent = null;
            while (node = $$this[i]) {
                parent = node.parentNode;
                $$this[i] = (function(flag) {
                    if (flag) {
                        return parent;
                    }
                    return null;
                })(parent && parent.nodeType === 1);
                i++;
            }
            return $$this;
        },

        /**
         * 返回被选元素的所有祖先元素
         */
        "parents": function() {
            var $$this = Lazy(this);
            var parent = $$this[0].parentNode;
            $$this.length = 0;
            while (parent && parent.nodeType === 1) {
                $$this[$$this.length++] = parent;
                parent = parent.parentNode;
            }
            return $$this;
        },

        /**
         * 返回介于两个给定元素之间的所有祖先元素
         */
        "parentsUntil": function() {

        },

        /**
         * 返回被选元素的所有直接子元素
         */
        "children": function() {
            var $$this = Lazy(this);
            var children = $$this[0].childNodes;
            var i = 0,
                node = undefined;
            $$this.length = 0;
            while (node = children[i]) {
                if (node && node.nodeType === 1) {
                    $$this[$$this.length] = node;
                    $$this.length++;
                }
                i++;
            }
            return $$this;
        },

        /**
         * 返回被选元素的后代元素[可选参数来过滤对后代元素的搜索]
         */
        "find": function(selector) {
            //推迟开发
        },

        /**
         * 返回被选元素的所有同胞元素
         */
        "siblings": function() {
            var $$this = Lazy(this);
            var $$parent = $$this.parent();
            return Lazy($$parent[0]).children();
        },

        /**
         * 返回全部被选元素的下一个同胞元素
         */
        "next": function() {
            var $$this = Lazy(this);
            var i = 0,
                node = undefined,
                sibling = null;
            while (node = $$this[i]) {
                sibling = node.nextSibling;
                $$this[i] = (function(flag) {
                    if (flag) {
                        return sibling;
                    }
                    return null;
                })(sibling && sibling.nodeType === 1);
                i++;
            }
            return $$this;
        },

        /**
         * 返回被选元素的所有跟随的同胞元素
         */
        "nextAll": function() {
            var $$this = Lazy(this);
            var sibling = $$this[0].nextSibling;
            $$this.length = 0;
            while (sibling && sibling.nodeType === 1) {
                $$this[$$this.length++] = sibling;
                sibling = sibling.nextSibling;
            }
            return $$this;
        },

        /**
         * 返回介于两个给定参数之间的所有跟随的同胞元素
         */
        "nextUntil": function() {

        },

        /**
         * 返回全部被选元素的前一个同胞元素
         */
        "prev": function() {
            var $$this = Lazy(this);
            var i = 0,
                node = undefined,
                sibling = null;
            while (node = $$this[i]) {
                sibling = node.previousSibling;
                $$this[i] = (function(flag) {
                    if (flag) {
                        return sibling;
                    }
                    return null;
                })(sibling && sibling.nodeType === 1);
                i++;
            }
            return $$this;
        },

        /**
         * 返回被选元素的所有之前的同胞元素
         */
        "prevAll": function() {
            var $$this = Lazy(this);
            var sibling = $$this[0].previousSibling;
            $$this.length = 0;
            while (sibling && sibling.nodeType === 1) {
                $$this[$$this.length++] = sibling;
                sibling = sibling.previousSibling;
            }
            return $$this;
        },

        /**
         * 返回介于两个给定参数之间的所有之前的同胞元素
         */
        "prevUntil": function() {

        },

        /**
         * 返回被选元素的首个元素
         */
        "first": function() {
            var $$this = Lazy(this);
            if ($$this[0]) {
                $$this.length = 1;
            } else {
                $$this.length = 0;
            }
            $$this.selector = $$this.selector + ":first";
            return $$this;
        },

        /**
         * 返回被选元素的最后一个元素
         */
        "last": function() {
            var $$this = Lazy(this);
            if ($$this[$$this.length]) {
                $$this[0] = $$this[$$this.length];
                $$this.length = 1;
            } else {
                $$this.length = 0;
            }
            $$this.selector = $$this.selector + ":last";
            return $$this;
        },

        /**
         * 返回被选元素中带有指定索引号的元素，从0开始
         */
        "eq": function(num) {
            var $$this = Lazy(this);
            if ($$this[num]) {
                $$this[0] = $$this[num];
                $$this.length = 1;
            } else {
                $$this.length = 0;
            }
            $$this.selector = $$this.selector + ":eq("+num+")";
            return $$this;
        },

        /**
         * 返回集合里匹配的元素集合
         */
        "filter": function() {

        },

        /**
         * 返回不匹配标准的所有元素
         */
        "not": function() {

        }
    });
})(window, window.Lazy);
