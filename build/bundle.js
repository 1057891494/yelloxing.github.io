/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ajax = __webpack_require__(1);

var _sproutRouter = __webpack_require__(2);

var _navTemplate = __webpack_require__(3);

var _storage = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexClass = function () {
    function IndexClass() {
        _classCallCheck(this, IndexClass);

        this.ajax = new _ajax.Ajax('get');
        this.router = new _sproutRouter.Router();
        this.navTemplate = new _navTemplate.NavTemplate();
        this.names = this.router.getRootNav();
        this.storage = new _storage.Storage('blog');
    }

    _createClass(IndexClass, [{
        key: 'getHtmlByName',
        value: function getHtmlByName(name) {
            return this.navTemplate.getTemplateByName(name, this.router.getMenuByName(name), this.router.getEnglishNameByName(name));
        }
    }, {
        key: 'getNavHtml',
        value: function getNavHtml() {
            return this.navTemplate.getNavTemplate(this.names);
        }
    }]);

    return IndexClass;
}();

/*
 * 启动app
 */

var indexClass = new IndexClass();
var sprout = document.getElementById('sprout');
var sprout_nav = document.getElementById('sprout_nav');
var sprout_footer = document.getElementById('sprout_footer');
var sprout_phone_tool = document.getElementById('phone_tool');
var tool = document.getElementById('tool');
var close_page = document.getElementById('close_page');
var paper = document.getElementById('paper');

sprout_nav.innerHTML = indexClass.getNavHtml();

window.openPage = function (url) {
    window.isBrowerLoad = true;
    window.location.href = window.location.href.split("/#")[0] + "#/" + url;
    var data = indexClass.storage.getValueByKey(url.replace(/[/.]/g, '_split_'));
    if (data) {
        sprout.innerHTML = data;
        sprout_nav.style.display = "none";
        sprout_phone_tool.style.display = "none";
    } else {
        indexClass.ajax.doRemote(url, function (data) {
            sprout.innerHTML = data;
            sprout_nav.style.display = "none";
            sprout_phone_tool.style.display = "none";
            indexClass.storage.setValueWithKey(url.replace(/[/.]/g, '_split_'), data);
        });
    }
    tool.style.display = 'none';
    sprout.style.height = 'auto';
    close_page.style.display = 'block';
    paper.style.display = 'block';
};
window.cleanBlog = function () {
    indexClass.storage.deleteAll();
    window.location.href = window.location.href.split("/#")[0];
};
window.closePage = function () {
    window.location.href = window.location.href.split("/#")[0];
};
window.navCursor = function (name) {
    sprout.innerHTML = indexClass.getHtmlByName(name);
};

var url = window.location.href.split("/#/")[1];
if (url) {
    tool.style.display = 'none';
    indexClass.ajax.doRemote(url, function (data) {
        sprout.innerHTML = data;
        sprout_nav.style.display = "none";
        sprout_phone_tool.style.display = "none";
        close_page.style.display = 'block';
        paper.style.display = 'block';
        indexClass.storage.setValueWithKey(url.replace(/[/.]/g, '_split_'), data);
    });
} else {
    indexClass.ajax.doRemote("src/github.html", function (data) {
        sprout.innerHTML = data;
    });
}

if (window.addEventListener) {
    window.addEventListener('popstate', function () {
        if (window.isBrowerLoad) {
            window.isBrowerLoad = false;
            return;
        }
        window.isBrowerLoad = true;
        window.location.href = window.location.href;
    }, false);
} else {
    window.attachEvent('onpopstate', function () {
        if (window.isBrowerLoad) {
            window.isBrowerLoad = false;
            return;
        }
        window.isBrowerLoad = true;
        window.location.href = window.location.href;
    });
}

window.toggleTool = function () {
    if ('block' == tool.style.display) {
        tool.style.display = 'none';
        sprout.style.height = 'auto';
        sprout.style.overflow = "auto";
    } else {
        tool.style.display = 'block';
        sprout.style.height = 'calc(100vh - 246px)';
        sprout.style.overflow = "hidden";
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoAjax = function () {
    function DoAjax(doMethod) {
        _classCallCheck(this, DoAjax);

        this.method = doMethod;
        if (window.XMLHttpRequest) {
            this.xmlhttp = new XMLHttpRequest();
        } else {
            this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    _createClass(DoAjax, [{
        key: "doRemote",
        value: function doRemote(url, callback) {
            console.debug(">>> Sprout:Ajax.doRemote(" + this.method + "," + url + ")");
            this.xmlhttp.onreadystatechange = function () {

                if (!this.xmlhttp && this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                }
            };
            this.xmlhttp.open(this.method, url + "?Token=" + new Date().valueOf(), true);
            this.xmlhttp.send();
        }
    }]);

    return DoAjax;
}();

exports.Ajax = DoAjax;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoRouter = function () {
    function DoRouter() {
        _classCallCheck(this, DoRouter);

        this.menus = {
            name: ["数据", "显示", "控制", "高效", "工具", "其它"],
            engName: ['data', 'dispaly', 'control', 'efficient', 'tooler', 'other'],
            menu: [{
                //数据
                name: [],
                menu: []
            }, {
                //显示
                name: ["样式属性"],
                menu: [[{
                    name: "Transform 转换",
                    menu: "src/display/tranform.html"
                }, {
                    name: "z-index技术周边",
                    menu: "src/display/z-index.html"
                }]]
            }, {
                //控制
                name: ["技术周边"],
                menu: [[{
                    name: "正则表达式",
                    menu: "src/control/RegExp.html"
                }]]
            }, {
                //高效
                name: [],
                menu: []
            }, {
                //工具
                name: ["工具使用"],
                menu: [[{
                    name: "Mac常用文件和命令",
                    menu: "src/tool/mac-normal.html"
                }, {
                    name: "Git使用",
                    menu: "src/tool/git.html"
                }]]
            }, {
                //其它
                name: [],
                menu: []
            }]
        };
    }

    _createClass(DoRouter, [{
        key: "getRootNav",
        value: function getRootNav() {
            return this.menus.name;
        }
    }, {
        key: "getMenuByName",
        value: function getMenuByName(navName) {
            navName = navName || this.menus["name"][0];
            var index = -1;
            for (index = 0; index < this.menus.name.length; index++) {
                if (this.menus.name[index] === navName) {
                    return this.menus.menu[index];
                }
            }
            return [];
        }
    }, {
        key: "getEnglishNameByName",
        value: function getEnglishNameByName(navName) {
            navName = navName || this.menus["name"][0];
            var index = -1;
            for (index = 0; index < this.menus.name.length; index++) {
                if (this.menus.name[index] === navName) {
                    return this.menus.engName[index];
                }
            }
            return "undefined";
        }
    }]);

    return DoRouter;
}();

exports.Router = DoRouter;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoNavTemplate = function () {
    function DoNavTemplate() {
        _classCallCheck(this, DoNavTemplate);

        this.templateCache = {};
    }

    _createClass(DoNavTemplate, [{
        key: 'getTemplateByName',
        value: function getTemplateByName(name, data, englishName) {
            if (this.templateCache[name]) {
                return this.templateCache[name];
            } else {
                var templateHtml = '<ul class=' + englishName + '>';
                var typeLoop = -1;
                for (typeLoop = 0; typeLoop < data.name.length; typeLoop++) {
                    templateHtml += this.getTypeTemplate(data.name[typeLoop], data.menu[typeLoop]);
                }
                return templateHtml += '</ul>';
            }
        }
    }, {
        key: 'getTypeTemplate',
        value: function getTypeTemplate(name, data) {
            var templateHtml = '<li class="menu split"><span class="menu title">' + name + '</span><ul class="menu block">';
            var clickLoop = -1;
            for (clickLoop = 0; clickLoop < data.length; clickLoop++) {
                templateHtml += '<li class="menu item" onclick=\'openPage(\"' + data[clickLoop].menu + '\")\'><div class="item name">' + data[clickLoop].name + '</div></li>';
            }
            return templateHtml += '</ul></li>';
        }
    }, {
        key: 'getNavTemplate',
        value: function getNavTemplate(names) {
            var templateHtml = '<ul>';
            var navLoop = -1;
            for (navLoop = 0; navLoop < names.length; navLoop++) {
                templateHtml += '<li onclick=\'navCursor("' + names[navLoop] + '")\'>' + names[navLoop] + '</li>';
            }
            return templateHtml += '</ul>';
        }
    }]);

    return DoNavTemplate;
}();

exports.NavTemplate = DoNavTemplate;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DoStorage = function () {
    function DoStorage(name) {
        _classCallCheck(this, DoStorage);

        this.storage = window.localStorage;
        this.storageName = name;
        var oldValue = this.storage.getItem(this.storageName) || '{}';
        this.storage.setItem(this.storageName, oldValue);
    }

    _createClass(DoStorage, [{
        key: 'getValueByKey',
        value: function getValueByKey(key) {
            return JSON.parse(this.storage.getItem(this.storageName))[key];
        }
    }, {
        key: 'deleteAll',
        value: function deleteAll() {
            this.storage.setItem(this.storageName, '{}');
        }
    }, {
        key: 'setValueWithKey',
        value: function setValueWithKey(key, value) {
            var item = JSON.parse(this.storage.getItem(this.storageName));
            item[key] = value;
            this.storage.setItem(this.storageName, JSON.stringify(item));
        }
    }]);

    return DoStorage;
}();

exports.Storage = DoStorage;

/***/ })
/******/ ]);