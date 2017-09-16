(function(window, Lazy, undefined) {
    'use strict';

    Lazy.prototype.extend({

        /**
         * 设置或获取内部html
         */
        "html": function(template) {
            if (!template) {
                return this[0].innerHTML;
            } else {
                this[0].innerHTML = template;
                return this;
            }
        },

        /**
         * 添加或获取class
         */
        "addClass": function(classstr) {
            if (!classstr) {
                var oldClass = this[0].getAttribute('class');

                if (!oldClass) {
                    oldClass = '';
                }
                return oldClass;
            } else {
                this[0].setAttribute('class', classstr + " " + this.addClass());
                return this;
            }
        },

        /**
         * 删除或获取class
         */
        "removeClass": function(classstr) {
            if (!classstr) {
                var oldClass = this[0].getAttribute('class');

                if (!oldClass) {
                    oldClass = '';
                }
                return oldClass;
            } else {
                var oldClasss=this.removeClass();

                this[0].setAttribute('class', classstr + " " + this.removeClass());
                return this;
            }
        },

        /**
         * 查找当前节点内的元素
         */
        "find": function(selector) {
            return Lazy(selector, this);
        }
    });

})(window, window.Lazy);
