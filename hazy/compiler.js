Hazy.extend({
    /*编译预定义行为的组件，目前只支持元素类型的组件，并且请保证你的指令以hazy-开头*/
    "compiler": function(dom) {
        var components = Hazy.innerObject.component,
            component, flag, elements;
        for (component in components) {
            /*
                element{type:Hazy}
            */
            elements = Hazy(component, dom);
            for (flag = 0; flag < elements.length; flag++) {
                components[component](Hazy(elements[flag]));
            }
        }
        components = null;
        component = null;
        elements = null;
    }
});
