/*
Lazy获取元素相对body的位置
*/
;
(function(window, Lazy, $$, undefined) {

    $$.prototype.extend({
        getElementPosition: function() {
            var $$this = $$(this);

            var left = 0;
            var top = 0;

            var obj = $this[0];
            top = obj.offsetTop;
            left = obj.offsetLeft;

            while (obj = obj.offsetParent) {
                top += obj.offsetTop;
                left += obj.offsetLeft;
            }

            $this.left = left;
            $this.top = top;

            return $$this;
        }
    });

})(window, window.Lazy, window.$$);


/*
Lazy获取屏幕大小的方法
*/
;
(function(window, Lazy, $$, undefined) {

        $$.prototype.extend({
        getViewSize: function() {
            var $$this = $$(this);

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

            $$this.winWidth = winWidth;
            $$this.winHeight = winHeight;

            return $$this;
        }
    });

})(window, window.Lazy, window.$$);
