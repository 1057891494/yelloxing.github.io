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
