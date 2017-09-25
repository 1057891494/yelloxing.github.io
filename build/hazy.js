/*!
* yelloxing.github.io Sprout2.0.0 hazy
* https://yelloxing.github.io
* 
* Copyright 心叶 and other contributors
* 
* Released under the Apache-2.0
* 
* Sprout 新芽 V2
* 
* Date: 2017-09-25
*/
(function(global, factory, undefined) {
    'use strict';

    if (global && global.document) {
        factory(global);
    } else {
        throw new Error("Hazy requires a window with a document!");
    }

})(window, function(window) {
;'use strict';
var Hazy = function(selector, context) {
    return new Hazy.prototype.init(selector, context);
};
Hazy.prototype.init = function(selector, context, root) {

};
var rootHazy = Hazy(document);
Hazy.prototype.extend = Hazy.extend = function() {
    var target = arguments[0] || {};
    var source = arguments[1] || {};
    var length = arguments.length;

    /*
     * 确定复制目标和源
     */
    if (length === 1) {
        //如果只有一个参数，目标对象是自己
        source = target;
        target = this;
    }
    if (typeof target !== "object" && typeof target !== 'function') {
        //如果目标不是对象或函数，则初始化为空对象
        target = {};
    }

    /*
     * 复制属性到对象上面
     */
    for (var key in source) {
        try {
            target[key] = source[key];
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    }

    return target;
};

Hazy.prototype.init.prototype = Hazy.prototype;

Hazy.__isLoad__ = false;

window.Hazy = window.$$ = Hazy;
;});
