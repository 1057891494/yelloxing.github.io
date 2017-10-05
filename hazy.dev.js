/**
 *开发模式下，加载hazy的配置文件
 */
(function() {
    var hazy = [
        "hazy/core.js",
        "hazy/test.js",
        "hazy/tool.js",
        "hazy/compiler.js",
        "hazy/event.js",
        "hazy/dom.js",
        "hazy/search.js",
        "hazy/ajax.js",
        "hazy/animation.js",
        "hazy/loop.js",
        "hazy/StepByStep.js",
        "hazy/router.js",
        "hazy/copy.element.js",
        "hazy/hazy.extend.js",
        "hazy/dom.extend.js",
        "hazy/cursor.lister.js"
    ];

    if (typeof(exports) != "undefined") {
        exports.hazy = hazy;
    } else {
        for (var i = 0; i < hazy.length; i++) {
            loadHazy(hazy[i]);
        }
    }

    function loadHazy(path) {
        var HazyTag = document.createElement("script");
        HazyTag.type = "text/javascript";
        HazyTag.src = path;
        document.write(outerHTML(HazyTag));
    }

    function outerHTML(node) {
        return node.outerHTML || (function(n) {
            var div = document.createElement('div'),
                h;
            div.appendChild(n);
            h = div.innerHTML;
            div = null;
            return h;
        })(node);
    }
})();
