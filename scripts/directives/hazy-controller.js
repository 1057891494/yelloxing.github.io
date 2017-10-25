/*提供控制器的组件*/
Hazy.directive("hazy-controller", function() {
    return {
        'restrict': 'E',
        'compile': function(element, scopeId) {
            element.attr('scope', scopeId);
            Hazy.scope.initScope(scopeId);
        }
    };
});