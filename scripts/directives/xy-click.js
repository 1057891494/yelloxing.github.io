/*提供点击事件的组件*/
Hazy.directive("xy-click", function() {
    return {
        'restrict': 'A',
        'compile': function(element, data, scopename) {
            var callback = element.attr("xy-click").trim().replace(/\(.*\)$/, '').replace('$scope.', '');
            element.bind('click', function() {
                Hazy.scope.data[scopename][callback]();
            });
        }
    };
});
