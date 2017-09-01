class DoNavTemplate {
    constructor() {
        this.templateCache = {};
    }

    getTemplateByName(name, data,englishName) {
        if (this.templateCache[name]) {
            return this.templateCache[name];
        } else {
            let templateHtml = '<ul class='+englishName+'>';
            let typeLoop = -1;
            for (typeLoop = 0; typeLoop < data.name.length; typeLoop++) {
                templateHtml += this.getTypeTemplate(data.name[typeLoop], data.menu[typeLoop]);
            }
            return templateHtml += '</ul>';
        }
    }

    getTypeTemplate(name, data) {
        let templateHtml = '<li class="menu split"><span class="menu title">' + name + '</span><ul class="menu block">';
        let clickLoop = -1;
        for (clickLoop = 0; clickLoop < data.length; clickLoop++) {
            templateHtml += '<li class="menu item" onclick=\'openPage(\"' + data[clickLoop].menu + '\")\'><div class="item name">' + data[clickLoop].name + '</div></li>';
        }
        return templateHtml += '</ul></li>';
    }

    getNavTemplate(names) {
        let templateHtml = '<ul>';
        let navLoop = -1;
        for (navLoop = 0; navLoop < names.length; navLoop++) {
            templateHtml += '<li onclick=\'navCursor("' + names[navLoop] + '")\'>' + names[navLoop] + '</li>';
        }
        return templateHtml += '</ul>';
    }

}

export { DoNavTemplate as NavTemplate }







