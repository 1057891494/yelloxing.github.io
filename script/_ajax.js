/**
 * 请求页面
 */
window.doAjax=function(url, callback, errorback) {
    var xmlhttp = getXHR();
    xmlhttp.onreadystatechange = function() {
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
    xmlhttp.open('get', url + "?Token=" + (new Date()).valueOf(), true);
    xmlhttp.send();
};

/**
 * 获取ajax对象
 */
window.getXHR=function() {
    var xmlhttp = window.Core.xmlhttp;
    if (xmlhttp) {
        return xmlhttp;
    }
    if (window.XMLHttpRequest) {
        xmlhttp = new window.XMLHttpRequest();
    } else {
        xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    window.Core.xmlhttp = xmlhttp;
    return xmlhttp;
};
