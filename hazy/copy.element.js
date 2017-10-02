Hazy.extend(Hazy.innerObject.component, {
    /*提供复制代码的组件*/
    "hazy-copy": function(element) {
        element.prepend("<div class='hazy-copy-button'><!--copy--></div>");
        element.find('div').filter(function(elem) {
            if ('hazy-copy-button' === elem.class()) {
                return true;
            } else {
                return false;
            }
        }).bind('click', function(e) {
            //点击执行操作
            element.clipboard();
        });
    }
});
Hazy.prototype.extend({
    "clipboard": function() {
        var $this = Hazy(this);
        Hazy.notify('复制功能开发中，请稍后。。。。。。');
        return $this;
    }
});
