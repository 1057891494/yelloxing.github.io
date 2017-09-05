class DoRouter {
    constructor() {
        this.menus = {
            name: ["数据", "显示", "控制", "高效", "工具", "其它"],
            engName: ['data', 'dispaly', 'control', 'efficient', 'tooler', 'other'],
            menu: [{
                //数据
                name: [],
                menu: [

                ]
            }, {
                //显示
                name: ["样式属性"],
                menu: [
                    [{
                        name: "Transform 转换",
                        menu: "src/display/tranform.html"
                    }, {
                        name: "z-index技术周边",
                        menu: "src/display/z-index.html"
                    }, {
                        name: "垂直对齐方式",
                        menu: "src/display/vertical-align.html"
                    }]
                ]
            }, {
                //控制
                name: ["技术周边"],
                menu: [
                    [{
                        name: "正则表达式",
                        menu: "src/control/RegExp.html"
                    }]
                ]
            }, {
                //高效
                name: [],
                menu: [

                ]
            }, {
                //工具
                name: ["工具使用"],
                menu: [
                    [{
                        name: "Mac常用文件和命令",
                        menu: "src/tool/mac-normal.html"
                    },{
                        name: "Git使用",
                        menu: "src/tool/git.html"
                    }]
                ]
            }, {
                //其它
                name: [],
                menu: [

                ]
            }]
        };
    }

    getRootNav() {
        return this.menus.name;
    }

    getMenuByName(navName) {
        navName = navName || this.menus["name"][0];
        let index = -1;
        for (index = 0; index < this.menus.name.length; index++) {
            if (this.menus.name[index] === navName) {
                return this.menus.menu[index];
            }
        }
        return [];
    }
    getEnglishNameByName(navName) {
        navName = navName || this.menus["name"][0];
        let index = -1;
        for (index = 0; index < this.menus.name.length; index++) {
            if (this.menus.name[index] === navName) {
                return this.menus.engName[index];
            }
        }
        return "undefined";
    }

}

export {
    DoRouter as Router
};
