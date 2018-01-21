window.bookContentDom = undefined;
window.contentDom = undefined;
window.bookname = "";
window.doClipboard = function(node) {
    window.clipboard(node.parentNode.innerText, function() {
        alert('复制成功，现在可以粘贴了.');
    }, function() {
        alert('非常抱歉，复制失败！');
    });
};
window.addClipboard = function() {
    var codeNodes = document.getElementsByClassName('code');
    var flag, codeNode;
    for (flag = 0; flag < codeNodes.length; flag++) {
        codeNode = codeNodes[flag];
        window.append(codeNode, window.stringToDom('<div class="clipboard" onclick="doClipboard(this)"></div>'));
    }
};
window.openBook = function(target, url) {
    if (window.parent(target)) {
        window.parent(target).setAttribute('class', 'none');
        setTimeout(function() {
            window.parent(target).setAttribute('class', '');
        }, 100);
    }
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
        window.bookContentDom.innerHTML = "<div class='errorpage'><input type='button' value='返回首页' onclick=\"window.location.href='/'\"><input type='button' value='查看源码' onclick=\"window.location.href='https://github.com/yelloxing/yelloxing.github.io'\"></div>";
    });
};
window.openContent = function(target, url) {
    var select = document.getElementsByClassName('select');
    if (select.length > 0) {
        select[0].setAttribute('class', '');
    }
    if (target) {
        target.setAttribute('class', 'select');
    }
    window.location.hash = window.bookname + "/" + url.match(/\/([A-Za-z0-9]+)\./)[0].replace(/\//, '').replace(/\./, '');
    if (!window.contentDom) {
        window.contentDom = document.getElementById('content');
    }
    window.doAjax(url, function(data) {
        window.contentDom.innerHTML = data;
        window.addClipboard();
        var script = window.contentDom.getElementsByTagName('script');
        if (script.length > 0) {
            window["eval"].call(window, script[0].innerText);
        }
    }, function() {
        window.contentDom.innerHTML = "<div class='errorpage'><input type='button' value='返回首页' onclick=\"window.location.href='/'\"><input type='button' value='查看源码' onclick=\"window.location.href='https://github.com/yelloxing/yelloxing.github.io'\"></div>";
    });
};
window.openGamePage = function() {
    if (window.isPhone()) {
        alert('非常抱歉，手机不支持访问！');
    } else {
        alert('开发中，目前没有可玩游戏！');
    }
};
