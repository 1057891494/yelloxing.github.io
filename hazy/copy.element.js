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
            Hazy.clipboard(element.text());
        });
    }
});
Hazy.extend({
    "clipboard": function(text) {
        Hazy('body').append(Hazy('<textarea id="clipboard-textarea">' + text + '</textarea>'));
        document.getElementById("clipboard-textarea").select();
        document.execCommand("copy", false, null);
        Hazy('#clipboard-textarea').remove();
        Hazy.notify('复制成功，现在可以粘贴了');
        return this;
    }
});
