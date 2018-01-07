window.bookContentDom = undefined;
window.contentDom = undefined;
window.bookname = "";
window.openBook = function(url) {
    window.bookname = url.split(/\//)[1] + "/" + url.split(/\//)[2];
    window.location.hash = url.split(/\//)[1] + "/" + url.split(/\//)[2];
    if (!window.bookContentDom) {
        window.bookContentDom = document.getElementById('book-content');
    }
    window.contentDom = undefined;
    window.doAjax(url, function(data) {
        window.bookContentDom.innerHTML = data;
        var script = window.bookContentDom.getElementsByTagName('script');
        if (script.length > 0) {
            window["eval"].call(window, script[0].innerText);
        }
    }, function() {
        window.bookContentDom.innerHTML = "通信错误";
    });
};
window.openContent = function(url) {
    window.location.hash = window.bookname + "/" + url.match(/\/([A-Za-z0-9]+)\./)[0].replace(/\//, '').replace(/\./, '');
    if (!window.contentDom) {
        window.contentDom = document.getElementById('content');
    }
    window.doAjax(url, function(data) {
        window.contentDom.innerHTML = data;
        var script = window.contentDom.getElementsByTagName('script');
        if (script.length > 0) {
            window["eval"].call(window, script[0].innerText);
        }
    }, function() {
        window.contentDom.innerHTML = "通信错误";
    });
};
