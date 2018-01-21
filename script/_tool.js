/**
 * 把指定文字复制到剪切板
 */
window.clipboard = function(text, callback, errorback) {
    window.prepend(document.getElementsByTagName('body')[0], window.stringToDom('<textarea id="clipboard-textarea" style="position:absolute">' + text + '</textarea>'));
    document.getElementById("clipboard-textarea").select();
    try {
        document.execCommand("copy", false, null);
        window.remove(document.getElementById('clipboard-textarea'));
        callback();
    } catch (e) {
        window.remove(document.getElementById('clipboard-textarea'));
        errorback();
    }
};
/**
 * 判断是不是手机访问
 */
window.isPhone = function() {
    var userinfo = navigator.userAgent;
    if (/Android/.test(userinfo) || /iPhone/.test(userinfo)) { //如果是安卓或苹果手机
        return true;
    } else if (/PlayBook/.test(userinfo) || /BB\d{1,}/.test(userinfo)) { //如果是黑莓手机
        return true;
    } else {
        return false;
    }
};
