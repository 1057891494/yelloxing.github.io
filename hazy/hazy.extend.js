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
            var unique = new Date().valueOf();
            Hazy('body').append(Hazy('<div id="notify-' + unique + '" class="notify">' + msg + '</div>'));
            Hazy('#notify-' + unique).css({
                "left": "100%"
            }).animation({
                "left": "0%"
            }, 20000, function() {
                window.setTimeout(function() {
                    Hazy('#notify-' + unique).remove();
                }, 1000);
            });
        });
    },
    //复制到剪切板
    "clipboard": function(text) {
        Hazy('body').append(Hazy('<textarea id="clipboard-textarea">' + text + '</textarea>'));
        document.getElementById("clipboard-textarea").select();
        document.execCommand("copy", false, null);
        Hazy('#clipboard-textarea').remove();
        Hazy.notify('复制成功，现在可以粘贴了');
        return this;
    },
    //取消默认事件
    "cancelTabDafaultEvent": function(elem, event) {
        event = event || window.event;
        var code = event.keyCode || event.which;
        if (code == 9) {
            //取消默认事件
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
                return false;
            }
            //阻止冒泡
            event.stopPropagation();
            //添加四个空格
            Hazy.addTextSpace(elem);
        }
    },
    //添加四个空格
    "addTextSpace": function(elem) {
        //推迟开发
    },
    /**
     * 全屏
     * @param element 需要全屏显示的页面部分
     */
    "launchFullScreen": function(element) {
        if (element.requestFullScreen) {
            element.requestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    },
    "exitFullScreen":function(){
        document.exitFullscreen?document.exitFullscreen():
        document.mozCancelFullScreen?document.mozCancelFullScreen():
        document.webkitExitFullscreen?document.webkitExitFullscreen():'';
    }
});
