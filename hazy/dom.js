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
