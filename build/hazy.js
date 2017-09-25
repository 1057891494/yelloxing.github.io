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
/**
 * @param selector [string,function,dom,Hazy Object] 选择器
 * @param context [dom,Hazy Object] 查找上下文，默认document
 *
 * @return Hazy Object
 * {
 *  [],//查找的结果保存在数组中
 *  context,//查找时使用的上下文
 *  length,//查找回来的个数
 *  isTouch//返回是否是已经查找过的结点
 *  selector//选择器
 * }
 */
Hazy.prototype.init = function(selector, context, root) {

    /**
     * 初始化参数
     */
    root = root || rootHazy;
    context = context ? Hazy(context)[0] : document;
    this.length = 0;
    this.context = context;
    this.selector = selector;
    if (!selector) {
        return this;
    }

    /**
     * 分类处理
     */

    //1.body比较特殊，直接提出来
    if (selector == "body") {
        this.context = document;
        this[0] = document.body;
        this.isTouch = true;
        this.length = 1;
        return this;
    }

    //2.如果是字符串
    if (typeof selector === 'string') {
        return this;
    }

    //3.如果是DOM节点
    if (selector.nodeType === 1 || selector.nodeType === 11 || selector.nodeType === 9) {
        this.context = context;
        this[0] = selector;
        this.isTouch = true;
        this.length = 1;
        return this;
    }

    //4.如果是function
    if (typeof selector === 'function') {
        if (Hazy.__isLoad__) {
            selector();
        } else {
            if (document.addEventListener) {
                //Mozilla, Opera and webkit
                document.addEventListener("DOMContentLoaded", function doListenter() {
                    document.removeEventListener("DOMContentLoaded", doListenter, false);
                    selector();
                    Hazy.__isLoad__ = true;
                });

            } else if (document.attachEvent) {
                //IE
                document.attachEvent("onreadystatechange", function doListenter() {
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", doListenter);
                        selector();
                        Hazy.__isLoad__ = true;
                    }
                });

            }
        }
        return this;
    }

    //5.如果是Hazy对象
    if (selector.isTouch) {
        this.isTouch = true;
        var flag = 0;
        for (; flag < selector.length; flag++) {
            this[flag] = selector[flag];
        }
        this.context = selector.context || context;
        this.length = selector.length;
        this.selector = selector.selector;
        return this;
    }

    return this;

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
