(function(global, factory, undefined) {
    'use strict';

    if (global && global.document) {
        factory(global);
    } else {
        throw new Error("Lazy requires a window with a document!");
    }

})(window, function(window,undefined) {
    'use strict';

    var Lazy = function(selector, context) {
        return new Lazy.prototype.init(selector, context);
    };

    /**
     * @param selector [string,function,dom,Lazy Object] 选择器
     * @param context [dom,Lazy Object] 查找上下文，默认document
     *
     * @return Lazy Object
     * {
     *  [],//查找的结果保存在数组中
     *  context,//查找时使用的上下文
     *  length,//查找回来的个数
     *  isTouch//返回是否是已经查找过的结点
     *  selector//选择器
     * }
     */
    Lazy.prototype.init = function(selector, context, root) {

        //准备工作
        if (typeof selector === 'string') {
            selector = new String(selector).trim();
        }

        this.length = 0;
        root = root || rootLazy;

        if (!context) {
            context = document;
        } else {
            context = Lazy(context)[0];
        }

        //选择器: $$(""), $$(null), $$(undefined), $$(false)，兼容一下
        if (!selector) {
            return this;　　
        } else {
            this.selector = selector;
        }

        //body比较特殊，直接提出来
        if (selector == "body") {
            this.context = document;
            this[0] = document.body;
            this.isTouch = true;
            this.length = 1;
            return this;
        }

        //如果是字符串
        if (typeof selector === 'string') {

            if (/^<([^<>]+)>.*<\/\1>$/.test(selector)) {
                //如果是html文档（<div>类似这样的结构</div>）
                if (!context) {
                    throw new Error("Parameter error!");
                }
                var frameDiv = document.createElement("div");
                frameDiv.innerHTML = selector;
                this[0] = frameDiv.childNodes[0];
                this.isTouch = true;
                this.length = 1;
                this.context = undefined;
                return this;
            } else {
                // //sizzle选择器
                // if (!Sizzle) {
                //     throw new Error("Sizzle is necessary for Lazy!");
                // }
                var nodes = Lazy.doSelector(selector, context);
                var flag = 0;
                for (; flag < nodes.length; flag++) {
                    this[flag] = nodes[flag];
                }
                this.length = flag;
                this.isTouch = true;
                this.context = context;
                return this;
            }
        }
        //如果是DOM节点
        if (selector.nodeType) {
            this.context = context;
            this[0] = selector;
            this.isTouch = true;
            this.length = 1;
            return this;
        }

        //如果是function
        if (typeof selector === 'function') {
            if (Lazy.__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {
                    //Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        Lazy.__isLoad__ = true;
                    });

                } else if (document.attachEvent) {
                    //IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            Lazy.__isLoad__ = true;
                        }
                    });

                }
            }
            return this;
        }

        //如果是Lazy对象,只会提取第一个
        if (selector.isTouch) {
            this.isTouch = true;
            this[0] = selector[0];
            this.context = selector.context || context;
            this.length = 1;
            this.selector = selector.selector;
            return this;
        }

        return this;

    };

    var rootLazy = Lazy(document);

    Lazy.prototype.extend = Lazy.extend = function() {

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

    Lazy.prototype.init.prototype = Lazy.prototype;

    Lazy.__isLoad__ = false;

    window.Lazy = window.$$ = Lazy;

});
