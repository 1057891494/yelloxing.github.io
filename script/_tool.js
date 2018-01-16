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
