Hazy.extend({
    "startRouter": function(configJson) {
        //初始化路由
        var urlArray = window.location.hash.slice(1).match(/\/[^\/]+/g);
        if (!urlArray) {
            window.location.href = "/#" + configJson.default;
        } else {
            Hazy.initPage(1, urlArray.length, urlArray, '', configJson);
        }

        Hazy(window).bind('hashchange', function() {
            //路由变化时
            var state = configJson[window.location.hash.slice(1)];
            var url = state.src;
            var deep = state.deep || window.location.hash.slice(1).replace(/[^\/]/g, '').length || 1;
            if (!url) {
                url = configJson.NotFound;
                deep = 1;
            }
            Hazy.ajax('get', url, function(data) {
                Hazy("hazy-view").eq(deep - 1).html(data);
                Hazy.compiler(Hazy("hazy-view")[deep - 1]);
            }, function() {
                throw new Error('Not Accepted Error!');
            });

        });

    },
    "initPage": function(nowDeep, deep, urlArray, preUrl, configJson) {
        preUrl = preUrl + urlArray[nowDeep - 1];
        var state = configJson[preUrl] || configJson.NotFound;
        var godeep = state.deep || nowDeep;
        var url = state.src,
            noError = true;
        if (!url) {
            url = configJson.NotFound;
            deep = 1;
            godeep = 1;
            noError = false;
        }
        Hazy.ajax('get', url, function(data) {
            Hazy("hazy-view").eq(godeep - 1).html(data);
            if (nowDeep < deep && noError) {
                Hazy.initPage(nowDeep + 1, deep, urlArray, preUrl, configJson);
            } else {
                console.log('%c' + new Date() + '\n\n心叶提示：路由恢复成功\n\n', 'color:#daaa65');
                Hazy.compiler(Hazy("hazy-view")[0]);
            }
        }, function() {
            throw new Error('Not Accepted Error!');
        });
    }
});
