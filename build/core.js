/**
 *
 * 写在前面的话：
 * -----------------------------------
 * 这里是内部笔记的方式敲击的代码，
 * 因此更多是笔记，
 * 不是代码的设计，
 * 笔记例子可能会使用这里的代码来演示例子，
 * 会把这里实验的结果，
 * 以设计的方式服务具体的实用项目，
 * 因此这里的很多瑕疵都不会修复，
 * 走过的弯路将是财富，
 * 这里的整个项目就是一个大大的笔记哦！
 *
 */
(function(global, factory, undefined) {
    'use strict';

    if (global && global.document) {
        factory(global);
    } else {
        throw new Error("Lazy requires a window with a document!");
    }

})(window, function(window, undefined) {
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
            //去掉：换行，换页，回车
            selector = new String(selector).trim().replace(/[\n\f\r]/g, '');
            if (/^<([^<>]+)>.*<([^<>]+)>$/.test(selector)) {
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
                //内置小型sizzle选择器
                if (!Lazy.doSelector) {
                    throw new Error("Sizzle is necessary for Lazy!");
                }
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
        if (selector.nodeType === 1 || selector.nodeType === 11 || selector.nodeType === 9) {
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

        //如果是Lazy对象
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
;(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /**
         * 获取包括元素自己的字符串
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
        },

        /**
         * 合并若干个class
         */
        "uniqueClass": function() {
            var classString = '',
                flag = 0;
            for (; flag < arguments.length; flag++) {
                if (typeof arguments[flag] !== 'string') {
                    throw new Error('Only string is valid,not project!');
                }
                classString += arguments[flag] + " ";
            }
            classString = classString.trim();
            var classArray = classString.split(/ +/);
            var classObj = {};
            classArray.forEach(function(item) {
                classObj[item] = true;
            }, this);
            classString = '';
            for (var item in classObj) {
                if (classObj[item])
                    classString += item + " ";
            }

            return classString.trim();
        },

        /**
         * 删除已经存在的class或toggle，用flag来标记，flag为真表示删除
         */
        "operateClass": function(srcClass, opeClass, flag) {
            if (typeof srcClass !== 'string' || typeof opeClass !== 'string') {
                throw new Error('Only string is valid,not project!');
            }
            srcClass = srcClass.trim();
            opeClass = opeClass.trim();
            var srcClassArray = srcClass.split(/ +/);
            var opeClassArray = opeClass.split(/ +/);
            var classObj = {};
            srcClassArray.forEach(function(item) {
                classObj[item] = true;
            }, this);
            opeClassArray.forEach(function(item) {
                classObj[item] = flag ? false : !classObj[item];
            }, this);
            var classString = '';
            for (var item in classObj) {
                if (classObj[item])
                    classString += item + " ";
            }

            return classString.trim();
        }
    });
})(window, window.Lazy);
;(function(window, Lazy, undefined) {
    'use strict';

    Lazy.prototype.extend({

        /**
         * 设置或获取内部html
         */
        "html": function(template) {
            var $$this = Lazy(this);
            if ('' != template && !template) {
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
            var $$this = Lazy(this);
            if (typeof val === "string" && val) {
                var i = 0,
                    curClass = '',
                    node = undefined;
                while (node = $$this[i++]) {
                    curClass = node.getAttribute('class') || '';
                    var uniqueClass = Lazy.uniqueClass(curClass, val);
                    node.setAttribute('class', uniqueClass);
                }
            }
            return $$this;
        },

        /**
         * 从被选元素删除一个或多个类
         */
        "removeClass": function(val) {
            var $$this = Lazy(this);
            if (typeof val === "string" && val) {
                var i = 0,
                    curClass = '',
                    node = undefined;
                while (node = $$this[i++]) {
                    curClass = node.getAttribute('class') || '';
                    var resultClass = Lazy.operateClass(curClass, val, true);
                    node.setAttribute('class', resultClass);
                }
            }
            return $$this;
        },

        /**
         * 对被选元素进行添加/删除类的切换操作
         */
        "toggleClass": function(val) {
            var $$this = Lazy(this);
            if (typeof val === "string" && val) {
                var i = 0,
                    curClass = '',
                    node = undefined;
                while (node = $$this[i++]) {
                    curClass = node.getAttribute('class') || '';
                    var resultClass = Lazy.operateClass(curClass, val);
                    node.setAttribute('class', resultClass);
                }
            }
            return $$this;
        },

        /**
         * 设置或获取class
         */
        "class": function(val) {
            var $$this = Lazy(this);
            if (typeof val === "string" && val) {
                var i = 0,
                    curClass = '',
                    node = undefined;
                while (node = $$this[i++]) {
                    node.setAttribute('class', Lazy.uniqueClass(val));
                }
            } else {
                return $$this[0].getAttribute('class') || '';
            }
            return $$this;
        },

        /**
         * 设置或返回被选元素的一个样式属性
         */
        "css": function(name, style) {
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
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 在被选元素内部的结尾插入内容
         */
        "append": function(node) {
            var $$this = Lazy(this);
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $$this[0].appendChild(node);
            } else if (node.isTouch) {
                $$this[0].appendChild(node[0]);
            } else if (typeof node == 'string') {
                $$this[0].appendChild(Lazy(node)[0]);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 在被选元素内部的开头插入内容
         */
        "prepend": function(node) {
            var $$this = Lazy(this);
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $$this[0].insertBefore(node, $$this[0].childNodes[0]);
            } else if (node.isTouch) {
                $$this[0].insertBefore(node[0], $$this[0].childNodes[0]);
            } else if (typeof node == 'string') {
                $$this[0].insertBefore(Lazy(node)[0], $$this[0].childNodes[0]);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 在被选元素之后插入内容
         */
        "after": function(node) {
            var $$this = Lazy(this);
            var $$parent = $$this[0].parentNode || Lazy('body')[0];
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $$parent.insertBefore(node, $$this[0].nextSibling); //如果第二个参数undefined,在结尾追加，目的一样达到
            } else if (node.isTouch) {
                $$parent.insertBefore(node[0], $$this[0].nextSibling);
            } else if (typeof node == 'string') {
                $$parent.insertBefore(Lazy(node)[0], $$this[0].nextSibling);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 在被选元素之前插入内容
         */
        "before": function(node) {
            var $$this = Lazy(this);
            var $$parent = $$this[0].parentNode || Lazy('body')[0];
            if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
                $$parent.insertBefore(node, $$this[0]);
            } else if (node.isTouch) {
                $$parent.insertBefore(node[0], $$this[0]);
            } else if (typeof node == 'string') {
                $$parent.insertBefore(Lazy(node)[0], $$this[0]);
            } else {
                throw new Error("Not acceptable type!");
            }
            return $$this;
        },

        /**
         * 删除被选元素（及其子元素）
         */
        "remove": function() {
            var $$this = Lazy(this);
            var $$parent = $$this[0].parentNode || Lazy('body')[0];
            $$parent.removeChild($$this[0]);
            return $$this;
        },

        /**
         * 从被选元素中删除子元素
         */
        "empty": function() {
            var $$this = Lazy(this);
            $$this.html('');
            return $$this;
        }
    });

})(window, window.Lazy);
;(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /**
         * 核心小型sizzle代码
         */
        "doFind": function(selector, context) {
            var $$this = Lazy(context);
            $$this.selector = $$this.selector + ":find(" + selector + ")";
            /**
             * 0.对表达式用逗号分开
             * 1.对表达式分组。
             * 2.初始化集合（right->left）。
             * 3.在当前的上下文里过滤要找的节点，并更新上下文，重复这一过程，直到结尾。
             */

            //0.对表达式用逗号分开
            selector = selector.trim();
            $$this.length = 0;
            if (/,/.test(selector)) {
                var selectors = selector.split(/ ?, ?/),
                    tempArray = [],
                    flag = 0,
                    innerFlag = 0;
                for (; flag < selectors.length; flag++) {
                    if (!/^ +$/.test(selectors[flag])) {
                        tempArray = $$this.find(selectors[flag]);
                        for (innerFlag = 0; innerFlag < tempArray.length; innerFlag++) {
                            $$this[$$this.length] = tempArray[innerFlag];
                            $$this.length += 1;
                        }
                    }
                }
            } else {
                //1.对表达式分组
                //4种dom元素间关系的判断，分别是 “+”, “>”, “ ”, “~”
                var splitHook = {
                    "+": true,
                    ">": true,
                    " ": true,
                    "~": true,
                };
                var flag = 0;
                var selectorArray = [];
                var curString = "";
                var hadSpotlight = false;
                var isClosed = 0;
                var needCloseArray = [];
                for (; flag < selector.length; flag++) {
                    if (splitHook[selector[flag]]) {
                        //如果没闭合时候出现了意外字符
                        if (isClosed > 0) {
                            if (selector[flag] == " ") {
                                if (!hadSpotlight) {
                                    curString += selector[flag];
                                }
                            } else {
                                throw new Error('+ > ~ is illegal value!');
                            }
                        } else {
                            //如果是
                            if (curString != "") {
                                selectorArray.push(curString);
                                curString = "";
                            }
                            if (selector[flag] == " " && hadSpotlight) {
                                //toDo
                            } else {
                                if (selectorArray[selectorArray.length - 1] == " ") {
                                    selectorArray[selectorArray.length - 1] = selector[flag];
                                } else {
                                    selectorArray.push(selector[flag]);
                                }
                            }
                        }
                        hadSpotlight = true;
                    } else {
                        //如果不是“+”, “>”, “ ”, “~”
                        hadSpotlight = false;
                        if (selector[flag] == "'" || selector[flag] == '"' || selector[flag] == "[" || selector[flag] == "]") {
                            //如果是需要闭合的
                            if (needCloseArray.length > 0 && selector[flag] == needCloseArray[needCloseArray.length - 1]) {
                                //如果这次闭合了
                                isClosed -= 1;
                                needCloseArray.length -= 1;
                            } else {
                                if (']' == selector[flag]) {
                                    throw new Error('] is illegal value!');
                                }
                                //如果这次出现了新的需要闭合
                                if ('[' == selector[flag]) {
                                    needCloseArray[needCloseArray.length] = "]";
                                } else {
                                    needCloseArray[needCloseArray.length] = selector[flag];
                                }
                                isClosed += 1;
                            }
                        }
                        curString += selector[flag];
                    }
                }
                if (curString != '') {
                    selectorArray.push(curString);
                }


                //2.初始化集合（right->left）
                var popSelector = selectorArray.pop();
                var domArray = Lazy.doSelector(popSelector, context, true);

                //3.在当前的上下文里过滤要找的节点，并更新上下文，重复这一过程，直到结尾

                //添加到本对象中去
                var flag = 0;
                for (; flag < domArray.length; flag++) {
                    $$this[flag] = domArray[flag];
                }
                $$this.length = flag;
            }
            return $$this;
        }
    });
})(window, window.Lazy);
;(function(window, Lazy, undefined) {
    'use strict';

    Lazy.prototype.extend({

        /*添加绑定事件*/
        "bind": function(eventType, callback, useCapture) {
            var $$this = Lazy(this);
            if (window.attachEvent) {
                $$this[0].attachEvent("on" + eventType, callback);
            } else {
                //默认捕获
                useCapture = useCapture || false;
                $$this[0].addEventListener(eventType, callback, useCapture);
            }
            return $$this;
        },

        /*解除绑定事件*/
        "unbind": function(eventType, callback, useCapture) {
            var $$this = Lazy(this);
            if (window.detachEvent) {
                $$this[0].detachEvent("on" + eventType, callback);
            } else {
                //默认捕获
                useCapture = useCapture || false;
                $$this[0].removeEventListener(eventType, callback, useCapture);
            }
            return $$this;
        }
    });
})(window, window.Lazy);
;(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /*一个小型的sizzle.js选择器*/
        "doSelector": function(selector, context, isMustEasy) {
            /**
             * 先把单纯的提取出来解决了
             *
             * isMustEasy如果为true,表示这是一个必须在这里被解决的问题，如果没有被解决，这是无法被接受的
             *
             */
            context = Lazy(context)[0];
            selector = selector || "";
            selector = selector.trim();
            if (selector == '') {
                if (document.querySelectorAll) {
                    return context.querySelectorAll();
                } else {
                    return context.getElementsByTagName("*");
                }
            }
            //变量必须字母，下划线或美元符开头，除了开头的，还可以包含数字，-，
            if (/^#[_\w$](?:[_\w\d]|-)*$/.test(selector)) {
                //Id选择器
                var elem = context.getElementById(new String(selector).replace(/^#/, ''));
                if (elem) {
                    return [elem];
                } else {
                    return [];
                }
            } else if (/^([_\w$](?:[_\w\d]|-)*$)|\*/.test(selector)) {
                //标签选择器或者*
                //不区分大小写
                var elems = context.getElementsByTagName(selector);
                var resultData = [],
                    elem = null;
                var flag = 0;
                for (; flag < elems.length; flag++) {
                    elem = elems[flag];
                    if (elem && elem.nodeType && elem.nodeType === 1) {
                        resultData.push(elem);
                    }
                }
                return resultData;
            } else if (/^\[ *name *= *["|'][_\w$](?:[_\w\d]|-)*["|'] *\]$/.test(selector)) {
                //如果是name选择器Lazy('[name="username"]')
                selector = selector.replace(/^\[ *name *= *["|']/, '');
                selector = selector.replace(/["|'] *\]/, '').trim();
                var elems = context.getElementsByName(selector);

                var resultData = [],
                    elem = null;
                var flag = 0;
                for (; flag < elems.length; flag++) {
                    elem = elems[flag];
                    if (elem && elem.nodeType && elem.nodeType === 1) {
                        resultData.push(elem);
                    }
                }
                return resultData;
            } else if (/^\.[_\w$](?:[_\w\d]|-)*$/.test(selector)) {
                //如果是class选择器
                selector = selector.replace(/^\./, '');
                var elems = [];
                if (document.getElementsByClassName) {
                    elems = context.getElementsByClassName(selector);
                } else {
                    return Lazy(context).find("." + selector);
                }
                return elems;
            } else if (isMustEasy) {
                /**
                 * 前面已经查找了ID,class,name,*,undefined，对于余下的不包含层级关系的节点查找，都必须在这里结束
                 *
                 * 集合可能的对象是div#info.btn[ class='btn-warn']
                 */
                var selectorArray = [];
                //当前字符串，是否是新的开始，是否已经遇到[
                var cursor = ['', true, 0],
                    flag = 0,
                    curStr = '',
                    levelObj = {
                        "level1": false, //节点级别
                        "level2": false, //属性级别
                        "level3": false, //class级别
                        "level4": false //id级别
                    },
                    curLevel = "level1";

                for (; flag < selector.length; flag++) {
                    curStr = selector[flag];
                    if (cursor[1]) {
                        //如果是新的开始
                        if ("[" == curStr) {
                            cursor[2] = 1;
                            curLevel = 'level2';
                        }
                        if ("." == curStr) {
                            curLevel = 'level3';
                        }
                        if ("#" == curStr) {
                            curLevel = 'level4';
                        }
                        cursor[0] = curStr;
                        cursor[1] = false;
                    } else {
                        if ("#" == curStr) {
                            if (cursor[0].trim() != '') {
                                levelObj[curLevel] = selectorArray.length;
                                selectorArray.push(cursor[0]);
                            }
                            curLevel = 'level4';
                            cursor[0] = curStr;
                        } else if ("." == curStr) {
                            if (cursor[0].trim() != '') {
                                levelObj[curLevel] = selectorArray.length;
                                selectorArray.push(cursor[0]);
                            }
                            curLevel = 'level3';
                            cursor[0] = curStr;
                        } else if ("[" == curStr) {
                            if (cursor[2] > 0) {
                                throw new Error(selector + ' is illegal!');
                            }
                            curLevel = 'level2';
                            if (cursor[0].trim() != '') {
                                levelObj[curLevel] = selectorArray.length;
                                selectorArray.push(cursor[0]);
                            }
                            cursor[0] = curStr;
                            cursor[2] = 1;
                        } else if (']' == curStr) {
                            if (cursor[2] != 1) {
                                throw new Error(selector + ' is illegal!');
                            }
                            levelObj[curLevel] = selectorArray.length;
                            selectorArray.push(cursor[0] + "]");
                            cursor[0] = '';
                            cursor[2] = 0;
                        } else {
                            //非特殊字符
                            cursor[0] += curStr;
                        }
                    }
                }
                if (cursor[0].trim() != '') {
                    levelObj[curLevel] = selectorArray.length;
                    selectorArray.push(cursor[0]);
                }

                console.log(selectorArray);
                console.log(levelObj);

                //开发至准备工作结束

                return [];
            }
            /**
             * 对于不是上面简单的字符串，进行下面的选择查找
             */
            return Lazy.doFind(selector, context);

        }
    });
})(window, window.Lazy);
