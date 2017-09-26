Hazy.extend({
    "ajax": function(method, url, callback, errorback) {
        /**
         * 由于笔记目前不可能带参数，不支持带参数的请求
         */
        var xmlhttp = Hazy.getXHR();
        xmlhttp.onreadystatechange = function() {

            //使用了Token，因此缓存304不被支持
            if (this.readyState == 4) {
                if (this.status == 200) {
                    callback(this.responseText);
                } else {
                    errorback();
                }
            }
        };
        xmlhttp.open(method, url + "?Token=" + (new Date()).valueOf(), true);
        xmlhttp.send();
    }
});
