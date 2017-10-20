/*提供复制代码的组件*/
Hazy.directive("hazy-copy", function() {
    return {
        'restrict': 'E',
        'compile': function(element, data) {
            element.prepend("<div class='hazy-copy-button'><!--copy--></div>");
            data = JSON.parse(data);
            var $node = Hazy(data.selector);
            element.find('div').filter(function(elem) {
                if ('hazy-copy-button' === elem.class()) {
                    return true;
                } else {
                    return false;
                }
            }).bind('click', function(e) {
                //点击执行操作
                Hazy.clipboard((function(elem, type) {
                    return elem[type]();
                })($node, data.type));
            });
        }
    };
});
