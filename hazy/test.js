Hazy.extend({
    "isHtmlTemplate": function(template) {
        /**
         * 判断字符串是不是html模板，非严格判断
         */
        //去掉：换行，换页，回车
        template = template.trim().replace(/[\n\f\r]/g, '');
        //初始化版本简单判断
        if (/^<([^<> ]+).*><\/\1>$/.test(template)) {
            return true;
        } else if (/^<!--.*-->$/.test(template)) {
            return true;
        }
        return false;
    },
    "isCssSelect": function(selector) {
        /**
         *  初始化版本只提供下面简单的选择器：
         *  1.#id
         *  2.element
         */
        if (/^#?[_\w$](?:[_\w\d$]|-)*$/.test(selector)) {
            return true;
        } else {
            return false;
        }
    }
});
