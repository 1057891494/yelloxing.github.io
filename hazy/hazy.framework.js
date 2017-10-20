//提供的控制器方法
Hazy.extend({
    "controller": function() {

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
