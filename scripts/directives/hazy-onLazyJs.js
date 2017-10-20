/*提供懒加载js的组件*/
Hazy.directive("hazy-onLazyJs", function() {
    return {
        'restrict': 'E',
        'compile': function(element, src) {
            Hazy.ajax('get', src, function(script) {
                window["eval"].call(window, script);
            });
        }
    };
});
