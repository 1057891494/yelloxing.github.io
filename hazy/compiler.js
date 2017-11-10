Hazy.extend({
    /*编译预定义行为的组件，目前只支持元素类型的组件，并且请保证你的指令以hazy-开头*/
    "compiler": function(dom) {
        var components = Hazy.innerObject.component,
            component, flag, elements, element;
        for (component in components) {
            /*
                element{type:Hazy}
            */
            switch (components[component][0].selector + '') {
                case 'E':
                    {
                        elements = Hazy(component, dom);
                        break;
                    }
                case 'A':
                    {
                        elements = Hazy('[' + component + ']', dom);
                        break;
                    }
                default:
                    {
                        elements = Hazy(component, dom);
                    }
            }

            for (flag = 0; flag < elements.length; flag++) {
                element = Hazy(elements[flag]);
                if (element.attr(component + '-compiler')) {
                    throw new Error(component + ' had compiler');
                }
                var data = element.attr('data') || '';
                components[component][1](element, data, (function() {
                    var ctrlElems = element.parents(),
                        flg, ctrlName;
                    for (flg = 0; flg < ctrlElems.length; flg++) {
                        ctrlName = Hazy(ctrlElems[flg]).attr('scope');
                        if (ctrlName && Hazy(ctrlElems[flg]).attr('hazy-controller-compiler')) {
                            return ctrlName;
                        }
                    }
                    return undefined;
                })());
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
