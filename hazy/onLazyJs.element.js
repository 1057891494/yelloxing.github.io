Hazy.extend(Hazy.innerObject.component, {
    /*提供复制代码的组件*/
    "hazy-onLazyJs": function(element, src) {
        Hazy.ajax('get', src, function(script) {
            window["eval"].call(window, script);
        });
    }
});
