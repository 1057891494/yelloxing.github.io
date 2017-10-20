Hazy.extend({
    "startRouter": function(configJson) {
        //初始化路由
        var urlSrc = (window.location.hash + '').split('?');
        var urlArray = urlSrc[0].slice(1).match(/\/[^\/]+/g);
        var param = urlSrc[1] || '';
        if (!urlArray) {
            window.location.href = "/#" + configJson.default;
        } else {
            Hazy.initPage(1, urlArray.length, urlArray, '', configJson, param);
        }

        Hazy(window).bind('hashchange', function() {
            //路由变化时
            var urlSrc = (window.location.hash + '').split('?');
            var state = configJson[urlSrc[0].slice(1)] || configJson[configJson.default];
            var urlArray = urlSrc[0].slice(1).match(/\/[^\/]+/g);
            var url = state.src;
            var param = urlSrc[1] || '';
            var deep = state.deep || urlSrc[0].slice(1).replace(/[^\/]/g, '').length || 1;
            if (!url) {
                url = configJson.NotFound;
                deep = 1;
            }
            Hazy.ajax('get', url, function(data) {
                try {
                    Hazy("hazy-view").eq(deep - 1).html(data);
                    Hazy.compiler(Hazy("hazy-view")[deep - 1]);
                    Hazy.fly.inner.doParam(urlArray,param);
                    Hazy.routerStyle.changeClick(urlSrc[0].slice(1).replace(/^.*\//, ''), urlSrc[0].slice(1).replace(/[^\/]/g, '').length || 1);
                } catch (e) {
                    window.location.reload();
                }
            }, function() {
                throw new Error('Not Accepted Error!');
            });

        });

    },
    "initPage": function(nowDeep, deep, urlArray, preUrl, configJson, param) {
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
                Hazy.initPage(nowDeep + 1, deep, urlArray, preUrl, configJson,param);
            } else {
                var urlSrc = (window.location.hash + '').split('?');
                Hazy.routerStyle.initClick(urlSrc[0].slice(1));
                console.log('%c' + new Date() + '\n\n心叶提示：路由恢复成功\n\n', 'color:#daaa65');
                Hazy.compiler(Hazy("hazy-view")[0]);
                Hazy.fly.inner.doParam(urlArray, param);
            }
        }, function() {
            throw new Error('Not Accepted Error!');
        });
    }
});
