Hazy.extend({
    "startRouter": function(configJson) {
        //初始化路由
        var urlArray = window.location.hash.slice(1).match(/\/[^\/]+/g);
        if (!urlArray) {
            window.location.href = "/#" + configJson.default;
        } else {
            Hazy.initPage(1, urlArray.length, urlArray, '', configJson);
        }

        Hazy(window).bind('hashchange', function(event) {
            //路由变化时
            var url = configJson[window.location.hash.slice(1)];
            if (!url) {
                url = configJson.NotFound;
            }
            Hazy.ajax('get', url, function(data) {
                var deep = window.location.hash.slice(1).replace(/[^\/]/g, '').length || 1;
                try {
                    Hazy("ui-view").eq(deep - 1).html(data);
                } catch (e) {
                    throw new Error('Url is illegal!');
                }
            }, function() {
                throw new Error('Not Accepted Error!');
            });

        });

    },
    "initPage": function(nowDeep, deep, urlArray, preUrl, configJson) {
        preUrl = preUrl + urlArray[nowDeep - 1];
        var url = configJson[preUrl];
        if (!url) {
            url = configJson.NotFound;
        }
        Hazy.ajax('get', url, function(data) {
            try {
                Hazy("ui-view").eq(nowDeep - 1).html(data);
                if (nowDeep < deep) {
                    Hazy.initPage(nowDeep + 1, deep, urlArray, preUrl, configJson);
                }
            } catch (e) {
                throw new Error('Url is illegal!');
            }
        }, function() {
            throw new Error('Not Accepted Error!');
        });
    }
});
