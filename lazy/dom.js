(function(window, Lazy, undefined) {
    'use strict';

    Lazy.prototype.extend({

        /**
         * 设置或获取内部html
         */
        "html": function(template) {
            var $$this = Lazy(this);
            if (!template) {
                return $$this[0].innerHTML;
            } else {
                $$this[0].innerHTML = template;
                return $$this;
            }
        },

        /**
         * 设置或返回所选元素的文本内容
         */
        "text": function(val) {
            var $$this = Lazy(this);
            if (!val) {
                return $$this[0].innerText;
            }
            $$this[0].innerText = val;
            return $$this;
        },

        /**
         * 设置或返回表单字段的值
         */
        "val": function(val) {
            var $$this = Lazy(this);
            if (!val) {
                return $$this[0].value;
            }

            $$this[0].value = val;
            return $$this;
        },

        /**
         * 用于设置/改变属性值
         */
        "attr": function(attr, val) {
            var $$this = Lazy(this);
            if (!val) {
                return $$this[0].getAttribute(attr);
            }

            $$this[0].setAttribute(attr, val);
            return $$this;
        },

        /**
         * 向被选元素添加一个或多个类
         */
        "addClass": function(val) {

        },

        /**
         * 从被选元素删除一个或多个类
         */
        "removeClass": function(val) {

        },

        /**
         * 对被选元素进行添加/删除类的切换操作
         */
        "toggleClass": function(val) {

        },

        /**
         * 设置或获取class
         */
        "class": function(val) {

        },

        /**
         * 设置或返回被选元素的一个样式属性
         */
        "css": function() {
            var $$this = Lazy(this);
            if (typeof name === 'string' && arguments.length === 1) {
                return $$this[0].style[name];
            }
            if (typeof name === 'string' && typeof style === 'string') {
                $$this[0].style[name] = style;
            } else if (typeof name === 'object') {
                for (var key in name) {
                    $$this[0].style[key] = name[key];
                }
            }
            return $$this;
        },

        /**
         * 查找当前节点内的元素
         */
        "find": function(selector) {
            var $$this = Lazy(this);
            return Lazy(selector, $$this);
        },

        /**
         * 在被选元素的结尾插入内容
         */
        "append": function() {

        },

        /**
         * 在被选元素的开头插入内容
         */
        "prepend": function() {

        },

        /**
         * 在被选元素之后插入内容
         */
        "after": function() {

        },

        /**
         * 在被选元素之前插入内容
         */
        "before": function() {

        },

        /**
         * 删除被选元素（及其子元素）
         */
        "remove": function() {

        },

        /**
         * 从被选元素中删除子元素
         */
        "empty": function() {

        }
    });

})(window, window.Lazy);
