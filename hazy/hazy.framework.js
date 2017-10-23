//提供的控制器方法
Hazy.extend({
    "controller": function(name, callback) {
        Hazy("[scope]").filter(function(node) {
            if (Hazy(node).attr("scope") == name) {
                var $scope = Hazy.scope.data[name];
                callback($scope);
            }
        });
    }
});

//提供的指令的方法
Hazy.extend({
    "directive": function(name, callback) {
        var directive = callback();
        var tempObj = {};
        tempObj[name] = [{
            "selector": directive.restrict
        }, directive.compile];
        Hazy.extend(Hazy.innerObject.component, tempObj);
    }
});
