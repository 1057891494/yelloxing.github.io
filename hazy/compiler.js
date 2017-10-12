Hazy.extend({
    /*编译预定义行为的组件，目前只支持元素类型的组件，并且请保证你的指令以hazy-开头*/
    "compiler": function(dom) {
        var components = Hazy.innerObject.component,
            component, flag, elements, element;
        for (component in components) {
            /*
                element{type:Hazy}
            */
            elements = Hazy(component, dom);
            for (flag = 0; flag < elements.length; flag++) {
                element = Hazy(elements[flag]);
                if (element.attr(component + '-compiler')) {
                    throw new Error(component + ' had compiler');
                }
                var data=element.attr('data')||'';
                components[component](element,data);
                element.attr(component + '-compiler', new Date());
                element.prepend("<!--" + component + " Begin 【走一步 再走一步】-->");
                element.append("<!--" + component + " End 【走一步 再走一步】-->");
            }
        }
        components = null;
        component = null;
        elements = null;
        element = null;
    }
});
