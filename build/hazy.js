/*!
* yelloxing.github.io 云笔记-遇见更好的你 2.0.1 hazy
* https://yelloxing.github.io
* 
* Copyright 心叶 and other contributors
* 
* Released under the Apache-2.0
* 
* 云笔记-遇见更好的你V2
* 
* Date: 2017-10-10
*/
(function(global, factory, undefined) {
    'use strict';

    if (global && global.document) {
        factory(global);
    } else {
        throw new Error("Hazy requires a window with a document!");
    }

})(window, function(window) {

'use strict';
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
    var flag, len;
    if (!selector) {
        return this;
    }

    /**
     * 分类处理
     */

    //0.body比较特殊，直接提出来
    if (selector == "body") {
        this.context = document;
        this[0] = document.body;
        this.isTouch = true;
        this.length = 1;
        return this;
    }

    //1.window
    if (selector === window) {
        this.context = document;
        this[0] = window;
        this.isTouch = true;
        this.length = 1;
        return this;
    }

    //2.如果是字符串
    if (typeof selector === 'string') {
        if (Hazy.isHtmlTemplate(selector)) {
            //如果是标签
            var frameDiv = document.createElement("div");
            frameDiv.innerHTML = selector;
            this[0] = frameDiv.childNodes[0];
            this.isTouch = true;
            this.length = 1;
            this.context = undefined;
            return this;
        } else if (Hazy.isCssSelect(selector)) {
            this.isTouch = true;
            var elem;
            //如果是css选择器
            if (/^#[_\w$](?:[_\w\d$]|-)*$/.test(selector)) {
                //Id选择器
                elem = context.getElementById(selector.replace(/^#/, ''));
                if (elem && (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9)) {
                    this[0] = elem;
                    this.length = 1;
                } else {
                    this.length = 0;
                }
            } else if (/^[_\w$](?:[_\w\d$]|-)*$/.test(selector)) {
                //标签选择器或者*
                //不区分大小写
                var elems = context.getElementsByTagName(selector);
                flag = 0;
                len = 0;
                for (; flag < elems.length; flag++) {
                    elem = elems[flag];
                    if (elem.nodeType === 1 || elem.nodeType === 11 || elem.nodeType === 9) {
                        this[len] = elem;
                        len += 1;
                    }
                }
                this.length = len;
            }
            return this;
        } else {
            throw new Error("[" + selector + "]Illegal argument value！");
        }
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
        flag = 0;
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
            if (/^hazy-/.test(key)) {
                document.createElement(key);
            }
        } catch (e) {
            throw new Error("Illegal property value！");
        }
    }

    return target;
};

//一些全局使用的内部对象
Hazy.innerObject = {};
//组件对象列表
Hazy.innerObject.component = {};
//提供循环执行功能的一个对象
Hazy.looper = {};
//记录循环任务数组
Hazy.looper.task = [];
//记录是否在轮询
Hazy.looper.isRun = false;
//全局唯一一个实现定时的东西
Hazy.clock = {};
//当前正在运动的动画的tick函数堆栈
Hazy.clock.timers = [];
//唯一定时器的定时间隔
Hazy.clock.interval = 13;
//指定了动画时长duration默认值
Hazy.clock.speeds = 400;
//定时器ID
Hazy.clock.timerId = null;
//路由扩展显示对象
Hazy.routerStyle={};

document.createElement('hazy-view');

Hazy.prototype.init.prototype = Hazy.prototype;

Hazy.__isLoad__ = false;

window.Hazy = window.$ = Hazy;

console.log('%c' + new Date() + '\n\n心叶提示：系统启动成功\n\n', 'color:#daaa65');

Hazy.extend({
    "isHtmlTemplate": function(template) {
        /**
         * 判断字符串是不是html模板，非严格判断
         */
        //去掉：换行，换页，回车
        template = template.trim().replace(/[\n\f\r ]/g, '');
        //初始化版本简单判断
        if (/^<([^<> ]+).*><\/\1>$/.test(template)) {
            return true;
        } else if (/^<!--.*-->$/.test(template)) {
            return true;
        }
        return false;
    },
    "isCssSelect": function(selector) {
        /**
         *  初始化版本只提供下面简单的选择器：
         *  1.#id
         *  2.element
         */
        if (/^#?[_\w$](?:[_\w\d$]|-)*$/.test(selector)) {
            return true;
        } else {
            return false;
        }
    }
});

Hazy.extend({

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
    },

    /**
     * 获取ajax对象
     */
    "getXHR": function() {
        var xmlhttp = Hazy.innerObject.xmlhttp;
        if (xmlhttp) {
            return xmlhttp;
        }
        if (window.XMLHttpRequest) {
            xmlhttp = new window.XMLHttpRequest();
        } else {
            xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        Hazy.innerObject.xmlhttp = xmlhttp;
        return xmlhttp;
    }
});

Hazy.extend({
    /*编译预定义行为的组件，目前只支持元素类型的组件，并且请保证你的指令以hazy-开头*/
    "compiler": function(dom) {
        var components = Hazy.innerObject.component,
            component, flag, elements, element;
        for (component in components) {
            /*
                element{type:Hazy}
            */
            elements = Hazy(component, dom);
            for (flag = 0; flag < elements.length; flag++) {
                element = Hazy(elements[flag]);
                if (element.attr(component + '-compiler')) {
                    throw new Error(component + ' had compiler');
                }
                components[component](element);
                element.attr(component + '-compiler', new Date());
                element.prepend("<!--" + component + " Begin 【走一步 再走一步】-->");
                element.append("<!--" + component + " End 【走一步 再走一步】-->");
            }
        }
        components = null;
        component = null;
        elements = null;
        element = null;
    }
});

Hazy.prototype.extend({

    /*添加绑定事件*/
    "bind": function(eventType, callback, useCapture) {
        var $this = Hazy(this);
        if (window.attachEvent) {
            $this[0].attachEvent("on" + eventType, callback);
        } else {
            //默认捕获
            useCapture = useCapture || false;
            $this[0].addEventListener(eventType, callback, useCapture);
        }
        return $this;
    },

    /*解除绑定事件*/
    "unbind": function(eventType, callback, useCapture) {
        var $this = Hazy(this);
        if (window.detachEvent) {
            $this[0].detachEvent("on" + eventType, callback);
        } else {
            //默认捕获
            useCapture = useCapture || false;
            $this[0].removeEventListener(eventType, callback, useCapture);
        }
        return $this;
    }
});

Hazy.prototype.extend({

    /**
     * 设置或获取内部html
     */
    "html": function(template) {
        var $this = Hazy(this);
        if ('' != template && !template) {
            return $this[0].innerHTML;
        } else {
            $this[0].innerHTML = template;
            return $this;
        }
    },

    /**
     * 设置或返回所选元素的文本内容
     */
    "text": function(val) {
        var $this = Hazy(this);
        if (!val) {
            return $this[0].innerText;
        }
        $this[0].innerText = val;
        return $this;
    },

    /**
     * 设置或返回表单字段的值
     */
    "val": function(val) {
        var $this = Hazy(this);
        if (!val) {
            return $this[0].value;
        }
        $this[0].value = val;
        return $this;
    },

    /**
     * 用于设置/改变属性值
     */
    "attr": function(attr, val) {
        var $this = Hazy(this);
        if (!val) {
            return $this[0].getAttribute(attr);
        }

        $this[0].setAttribute(attr, val);
        return $this;
    },

    /**
     * 向被选元素添加一个或多个类
     */
    "addClass": function(val) {
        var $this = Hazy(this);
        if (typeof val === "string" && val) {
            var i = 0,
                curClass,
                node= $this[i];
            while (node) {
                curClass = node.getAttribute('class') || '';
                var uniqueClass = Hazy.uniqueClass(curClass, val);
                node.setAttribute('class', uniqueClass);
                node = $this[i];
                i+=1;
            }
        }
        return $this;
    },

    /**
     * 从被选元素删除一个或多个类
     */
    "removeClass": function(val) {
        var $this = Hazy(this);
        if (typeof val === "string" && val) {
            var i = 0,
                curClass,
                node= $this[i];
            while (node) {
                curClass = node.getAttribute('class') || '';
                var resultClass = Hazy.operateClass(curClass, val, true);
                node.setAttribute('class', resultClass);
                node = $this[i];
                i+=1;
            }
        }
        return $this;
    },

    /**
     * 对被选元素进行添加/删除类的切换操作
     */
    "toggleClass": function(val) {
        var $this = Hazy(this);
        if (typeof val === "string" && val) {
            var i = 0,
                curClass,
                node= $this[i];
            while (node) {
                curClass = node.getAttribute('class') || '';
                var resultClass = Hazy.operateClass(curClass, val);
                node.setAttribute('class', resultClass);
                node = $this[i];
                i+=1;
            }
        }
        return $this;
    },

    /**
     * 设置或获取class
     */
    "class": function(val) {
        var $this = Hazy(this);
        if (typeof val === "string" && val) {
            var i = 0,
                curClass,
                node= $this[i];
            while (node) {
                node.setAttribute('class', Hazy.uniqueClass(val));
                node = $this[i];
                i+=1;
            }
        } else {
            return $this[0].getAttribute('class') || '';
        }
        return $this;
    },

    /**
     * 设置或返回被选元素的一个样式属性
     */
    "css": function(name, style) {
        var $this = Hazy(this);
        if (typeof name === 'string' && arguments.length === 1) {
            return $this[0].style[name];
        }
        if (typeof name === 'string' && typeof style === 'string') {
            $this[0].style[name] = style;
        } else if (typeof name === 'object') {
            for (var key in name) {
                $this[0].style[key] = name[key];
            }
        } else {
            throw new Error("Not acceptable type!");
        }
        return $this;
    },

    /**
     * 在被选元素内部的结尾插入内容
     */
    "append": function(node) {
        var $this = Hazy(this);
        if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
            $this[0].appendChild(node);
        } else if (node.isTouch) {
            $this[0].appendChild(node[0]);
        } else if (typeof node == 'string') {
            $this[0].appendChild(Hazy(node)[0]);
        } else {
            throw new Error("Not acceptable type!");
        }
        return $this;
    },

    /**
     * 在被选元素内部的开头插入内容
     */
    "prepend": function(node) {
        var $this = Hazy(this);
        if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
            $this[0].insertBefore(node, $this[0].childNodes[0]);
        } else if (node.isTouch) {
            $this[0].insertBefore(node[0], $this[0].childNodes[0]);
        } else if (typeof node == 'string') {
            $this[0].insertBefore(Hazy(node)[0], $this[0].childNodes[0]);
        } else {
            throw new Error("Not acceptable type!");
        }
        return $this;
    },

    /**
     * 在被选元素之后插入内容
     */
    "after": function(node) {
        var $this = Hazy(this);
        var $parent = $this[0].parentNode || Hazy('body')[0];
        if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
            $parent.insertBefore(node, $this[0].nextSibling); //如果第二个参数undefined,在结尾追加，目的一样达到
        } else if (node.isTouch) {
            $parent.insertBefore(node[0], $this[0].nextSibling);
        } else if (typeof node == 'string') {
            $parent.insertBefore(Hazy(node)[0], $this[0].nextSibling);
        } else {
            throw new Error("Not acceptable type!");
        }
        return $this;
    },

    /**
     * 在被选元素之前插入内容
     */
    "before": function(node) {
        var $this = Hazy(this);
        var $parent = $this[0].parentNode || Hazy('body')[0];
        if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
            $parent.insertBefore(node, $this[0]);
        } else if (node.isTouch) {
            $parent.insertBefore(node[0], $this[0]);
        } else if (typeof node == 'string') {
            $parent.insertBefore(Hazy(node)[0], $this[0]);
        } else {
            throw new Error("Not acceptable type!");
        }
        return $this;
    },

    /**
     * 删除被选元素（及其子元素）
     */
    "remove": function() {
        var $this = Hazy(this);
        var $parent = $this[0].parentNode || Hazy('body')[0];
        $parent.removeChild($this[0]);
        return $this;
    },

    /**
     * 从被选元素中删除子元素
     */
    "empty": function() {
        var $this = Hazy(this);
        $this.html('');
        return $this;
    }
});

Hazy.prototype.extend({

    /**
     * 返回全部被选元素的直接父元素
     */
    "parent": function() {
        var $this = Hazy(this);
        var i = 0,
            node = $this[i],
            parent;
        while (node) {
            parent = node;
            do {
                parent = parent.parentNode;
                if (parent && parent.nodeType === 1) {
                    $this[i] = parent;
                } else {
                    $this[i] = null;
                }

            } while (parent.parentNode && !$this[i]);
            i += 1;
            node = $this[i];
        }
        $this.selector = $this.selector + ":parent";
        return $this;
    },

    /**
     * 返回被选元素的所有祖先元素
     */
    "parents": function() {
        var $this = Hazy(this);
        var parent = $this[0];
        $this.length = 0;
        do {
            parent = parent.parentNode;
            if (parent && parent.nodeType === 1) {
                $this[$this.length] = parent;
                $this.length += 1;
            }
        } while (parent);
        $this.selector = $this.selector + ":parents";
        return $this;
    },

    /**
     * 返回被选元素的所有直接子元素
     */
    "children": function() {
        var $this = Hazy(this);
        var children = $this[0].childNodes;
        var i = 0,
            node = children[i];
        $this.length = 0;
        while (node) {
            if (node && node.nodeType === 1) {
                $this[$this.length] = node;
                $this.length++;
            }
            i += 1;
            node = children[i];
        }
        $this.selector = $this.selector + ":children";
        return $this;
    },

    /**
     * 返回被选元素的所有同胞元素
     */
    "siblings": function() {
        var $this = Hazy(this);
        var $parent = $this.parent();
        $this.selector = $this.selector + ":siblings";
        return Hazy($parent[0]).children();
    },

    /**
     * 返回全部被选元素的下一个同胞元素
     */
    "next": function() {
        var $this = Hazy(this);
        var i = 0,
            node = $this[i],
            sibling;
        while (node) {
            sibling = node;
            do {
                sibling = sibling.nextSibling;
                if (sibling && sibling.nodeType === 1) {
                    $this[i] = sibling;
                } else {
                    $this[i] = null;
                }
            } while (sibling.nextSibling && !$this[i]);
            i += 1;
            node = $this[i];
        }
        $this.selector = $this.selector + ":next";
        return $this;
    },

    /**
     * 返回被选元素的所有跟随的同胞元素
     */
    "nextAll": function() {
        var $this = Hazy(this);
        var sibling = $this[0];
        $this.length = 0;
        do {
            sibling = sibling.nextSibling;
            if (sibling && sibling.nodeType === 1) {
                $this[$this.length] = sibling;
                $this.length += 1;
            }
        } while (sibling);
        $this.selector = $this.selector + ":nextAll";
        return $this;
    },

    /**
     * 返回全部被选元素的前一个同胞元素
     */
    "prev": function() {
        var $this = Hazy(this);
        var i = 0,
            node = $this[i],
            sibling;
        while (node) {
            sibling = node;
            do {
                sibling = sibling.previousSibling;
                if (sibling && sibling.nodeType === 1) {
                    $this[i] = sibling;
                } else {
                    $this[i] = null;
                }
            } while (sibling.previousSibling && !$this[i]);
            i += 1;
            node = $this[i];
        }
        $this.selector = $this.selector + ":prev";
        return $this;
    },

    /**
     * 返回被选元素的所有之前的同胞元素
     */
    "prevAll": function() {
        var $this = Hazy(this);
        var sibling = $this[0];
        $this.length = 0;
        do {
            sibling = sibling.previousSibling;
            if (sibling && sibling.nodeType === 1) {
                $this[$this.length] = sibling;
                $this.length += 1;
            }
        } while (sibling);
        $this.selector = $this.selector + ":prevAll";
        return $this;
    },

    /**
     * 查找结点
     */
    "find": function(selector) {
        var $this = Hazy(this);
        return Hazy(selector, $this[0]);
    },

    /**
     * 返回被选元素的首个元素
     */
    "first": function() {
        var $this = Hazy(this);
        if ($this[0]) {
            $this.length = 1;
        } else {
            $this.length = 0;
        }
        $this.selector = $this.selector + ":first";
        return $this;
    },

    /**
     * 返回被选元素的最后一个元素
     */
    "last": function() {
        var $this = Hazy(this);
        if ($this[$this.length - 1]) {
            $this[0] = $this[$this.length - 1];
            $this.length = 1;
        } else {
            $this.length = 0;
        }
        $this.selector = $this.selector + ":last";
        return $this;
    },

    /**
     * 返回被选元素中带有指定索引号的元素，从0开始
     */
    "eq": function(num) {
        var $this = Hazy(this);
        if ($this[num]) {
            $this[0] = $this[num];
            $this.length = 1;
        } else {
            $this.length = 0;
        }
        $this.selector = $this.selector + ":eq(" + num + ")";
        return $this;
    },

    /**
     * 返回集合里匹配的元素集合
     */
    "filter": function(testback) {
        var $this = Hazy(this);
        var len = 0,
            i = 0;
        for (; i < $this.length; i++) {
            if (testback(Hazy($this[i]))) {
                $this[len] = $this[i];
                len += 1;
            }
        }
        $this.length = len;
        $this.selector = $this.selector + ":filter(" + testback + ")";
        return $this;
    },

    /**
     * 返回不匹配标准的所有元素
     */
    "not": function(testback) {
        var $this = Hazy(this);
        var len = 0,
            i = 0;
        for (; i < $this.length; i++) {
            if (!testback(Hazy($this[i]))) {

                $this[len] = $this[i];
                len += 1;
            }
        }
        $this.length = len;
        $this.selector = $this.selector + ":not(" + testback + ")";
        return $this;
    }
});

Hazy.extend({
    "ajax": function(method, url, callback, errorback) {
        /**
         * 由于笔记目前不可能带参数，不支持带参数的请求
         */
        var xmlhttp = Hazy.getXHR();
        xmlhttp.onreadystatechange = function() {

            //使用了Token，因此缓存304不被支持
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (callback) {
                        callback(this.responseText);
                    }
                } else {
                    if (errorback) {
                        errorback();
                    }
                }
            }
        };
        xmlhttp.open(method, url + "?Token=" + (new Date()).valueOf(), true);
        xmlhttp.send();
    }
});

Hazy.prototype.extend({
    /*提供动画效果*/
    "animation": function(protojson, duration, callback) {
        var $this = Hazy(this);
        //初始化
        if (!protojson || typeof protojson != 'object') {
            throw new Error('protojson is illegal!');
        }
        if (typeof duration != 'number' && duration) {
            throw new Error('duration is illegal!');
        }

        var key, value, beginproto, oldValue, loopTimerData = {},
            unit;
        Hazy.clock.timer(function(deep) {
            //其中deep为0-100，单位%，表示改变的程度
            for (key in protojson) {

                //提取处理(只处理一次，提供的是预处理，不实施)
                if (!loopTimerData[key]) {
                    value = protojson[key];
                    oldValue = $this.css(key);
                    beginproto = {
                        "value": oldValue.replace(/[pxrem%]/g, ''),
                        "unit": oldValue.replace(/[\d\.]/g, '')
                    };

                    //处理
                    if (/^[\d\.]+px$/.test(value) && (!oldValue || beginproto.unit == 'px')) {
                        value = value.replace(/px$/, '');
                        unit = "px";
                    } else if (/^[\d\.]+%$/.test(value) && (!oldValue || beginproto.unit == '%')) {
                        value = value.replace(/%$/, '');
                        unit = "%";
                    } else if (/^[\d\.]+$/.test(value) && (!oldValue || beginproto.unit == '')) {
                        unit = "";
                    } else if (/^[\d\.]+em$/.test(value) && (!oldValue || beginproto.unit == 'em')) {
                        value = value.replace(/em$/, '');
                        unit = "em";
                    } else if (/^[\d\.]+rem$/.test(value) && (!oldValue || beginproto.unit == 'rem')) {
                        value = value.replace(/rem$/, '');
                        unit = "rem";
                    } else {
                        oldValue = oldValue || 'undefined';
                        throw new Error(value + ' is illegal for animation,old value is ' + oldValue + '!');
                    }
                    beginproto.value = beginproto.value || 0;
                    loopTimerData[key] = {
                        "deep": value - beginproto.value,
                        "unit": unit,
                        "beginValue": beginproto.value
                    };
                    beginproto = null;
                }

                //以后直接计算，因为此时不会出现问题了，故意捣乱的目前不管
                unit = loopTimerData[key].unit;
                value = loopTimerData[key].beginValue - (-loopTimerData[key].deep * deep * 0.01);
                $this.css(key, value + "" + unit);

            }
        }, duration, callback);
    }
});

Hazy.extend(Hazy.clock, {
    //把tick函数推入堆栈
    "timer": function(tick, duration, callback) {
        if (!tick) {
            throw new Error('tick is required!');
        }
        duration = duration || Hazy.clock.speeds;
        Hazy.clock.timers.push({
            "createTime": new Date(),
            "tick": tick,
            "duration": duration,
            "callback": callback
        });
        Hazy.clock.start();
    },

    //开启唯一的定时器timerId
    "start": function() {
        if (!Hazy.clock.timerId) {
            Hazy.clock.timerId = window.setInterval(Hazy.clock.tick, Hazy.clock.interval);
        }
    },

    //被定时器调用，遍历timers堆栈
    "tick": function() {
        var createTime, flag, tick, callback, timer, duration, passTime, needStop,deep,
            timers = Hazy.clock.timers;
        Hazy.clock.timers = [];
        Hazy.clock.timers.length = 0;
        for (flag = 0; flag < timers.length; flag++) {
            //初始化数据
            timer = timers[flag];
            createTime = timer.createTime;
            tick = timer.tick;
            duration = timer.duration;
            callback = timer.callback;
            needStop = false;

            //执行
            passTime = (+new Date() - createTime) / duration;
            if (passTime >= 1) {
                needStop = true;
            }
            passTime = passTime > 1 ? 1 : passTime;
            deep = 100 * passTime;
            tick(deep);
            if (passTime < 1) {
                //动画没有结束再添加
                Hazy.clock.timers.push(timer);
            } else if (callback) {
                callback();
            }
        }
        if (Hazy.clock.timers.length <= 0) {
            Hazy.clock.stop();
        }
    },

    //停止定时器，重置timerId=null
    "stop": function() {
        if (Hazy.clock.timerId) {
            window.clearInterval(Hazy.clock.timerId);
            Hazy.clock.timerId = null;
        }
    }
});

Hazy.extend(Hazy.looper, {
    //推进轮询数组并尝试启动
    /*
     *  task:function//执行方法，目前不支持异步，后期可能会思考如何支持
     */
    "loop": function(task) {
        Hazy.looper.task.unshift(task);
        Hazy.looper.start();
    },

    "start": function() {
        if (!Hazy.looper.isRun) {
            Hazy.looper.isRun = true;
            Hazy.looper.do();
        }
    },

    "do": function() {
        if (Hazy.looper.task.length <= 0) {
            Hazy.looper.isRun = false;
        } else {
            (Hazy.looper.task.pop())();
            Hazy.looper.do();
        }
    }
});

Hazy.extend({
    "startRouter": function(configJson) {
        //初始化路由
        var urlArray = window.location.hash.slice(1).match(/\/[^\/]+/g);
        if (!urlArray) {
            window.location.href = "/#" + configJson.default;
        } else {
            Hazy.initPage(1, urlArray.length, urlArray, '', configJson);
        }

        Hazy(window).bind('hashchange', function() {
            //路由变化时
            var state = configJson[window.location.hash.slice(1)] || configJson[configJson.default];
            var url = state.src;
            var deep = state.deep || window.location.hash.slice(1).replace(/[^\/]/g, '').length || 1;
            if (!url) {
                url = configJson.NotFound;
                deep = 1;
            }
            Hazy.ajax('get', url, function(data) {
                try {
                    Hazy("hazy-view").eq(deep - 1).html(data);
                    Hazy.compiler(Hazy("hazy-view")[deep - 1]);
                    Hazy.routerStyle.changeClick(window.location.hash.slice(1).replace(/^.*\//, ''), window.location.hash.slice(1).replace(/[^\/]/g, '').length || 1);
                } catch (e) {
                    window.location.reload();
                }
            }, function() {
                throw new Error('Not Accepted Error!');
            });

        });

    },
    "initPage": function(nowDeep, deep, urlArray, preUrl, configJson) {
        preUrl = preUrl + urlArray[nowDeep - 1];
        var state = configJson[preUrl] || configJson.NotFound;
        var godeep = state.deep || nowDeep;
        var url = state.src,
            noError = true;
        if (!url) {
            url = configJson.NotFound;
            deep = 1;
            godeep = 1;
            noError = false;
        }
        Hazy.ajax('get', url, function(data) {
            Hazy("hazy-view").eq(godeep - 1).html(data);
            if (nowDeep < deep && noError) {
                Hazy.initPage(nowDeep + 1, deep, urlArray, preUrl, configJson);
            } else {
                Hazy.routerStyle.initClick(window.location.hash.slice(1));
                console.log('%c' + new Date() + '\n\n心叶提示：路由恢复成功\n\n', 'color:#daaa65');
                Hazy.compiler(Hazy("hazy-view")[0]);
            }
        }, function() {
            throw new Error('Not Accepted Error!');
        });
    }
});

Hazy.extend(Hazy.innerObject.component, {
    /*提供复制代码的组件*/
    "hazy-copy": function(element) {
        element.prepend("<div class='hazy-copy-button'><!--copy--></div>");
        element.find('div').filter(function(elem) {
            if ('hazy-copy-button' === elem.class()) {
                return true;
            } else {
                return false;
            }
        }).bind('click', function(e) {
            //点击执行操作
            element.clipboard();
        });
    }
});
Hazy.prototype.extend({
    "clipboard": function() {
        var $this = Hazy(this);
        Hazy.notify('复制功能开发中，请稍后。。。。。。');
        return $this;
    }
});

$.extend({
    //获取屏幕大小的方法
    "getViewSize": function() {
        var winWidth;
        var winHeight;
        //获取窗口宽度
        if (window.innerWidth)
            winWidth = window.innerWidth;
        else if ((document.body) && (document.body.clientWidth))
            winWidth = document.body.clientWidth;
        //获取窗口高度
        if (window.innerHeight)
            winHeight = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
            winHeight = document.body.clientHeight;
        //通过深入Document内部对body进行检测，获取窗口大小
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        }

        return {
            "width": winWidth,
            "height": winHeight
        };
    },
    //提示信息
    "notify": function(msg) {
        Hazy.looper.loop(function() {
            window.alert(msg);
        });
    }
});

$.prototype.extend({
    //获取元素相对body的位置
    "getElementPosition": function() {
        var $this = $(this);

        var left = 0;
        var top = 0;

        var obj = $this[0];
        top = obj.offsetTop;
        left = obj.offsetLeft;
        obj = obj.offsetParent;
        while (obj) {
            top += obj.offsetTop;
            left += obj.offsetLeft;
            obj = obj.offsetParent;
        }

        $this.left = left;
        $this.top = top;

        return $this;
    }

});

Hazy.extend(Hazy.routerStyle, {
    "initClick": function(state) {
        var states = state.replace(/^\//, '').split(/\//),
            deep;
        for (deep = 0; deep < states.length; deep++) {
            Hazy.routerStyle.changeClick(states[deep], deep + 1);
        };
    },
    "changeClick": function(state, deep) {
        switch (deep) {
            case 1:
                {
                    var eq = {
                        "home": 1,
                        "notebook": 2,
                        "opensource": 3,
                        "case": 4,
                        "other": 5
                    }[state];
                    if (eq && $("#deeponemenu").length > 0) {
                        $("#deeponemenu").find('li').removeClass('click').eq(eq - 1).addClass('click');
                    }
                    break;
                }
            case 2:
                {
                    var eq = {
                        "tool": 1
                    }[state]
                    if (eq && $("#deeptwomenu").length > 0) {
                        $("#deeptwomenu").find('li').removeClass('click').eq(eq - 1).addClass('click');
                    }
                    break;
                }
        }
    }
});

});
