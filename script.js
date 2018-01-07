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

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

window.Core={};
__webpack_require__(2);
__webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * 请求页面
 */
window.doAjax=function(url, callback, errorback) {
    var xmlhttp = getXHR();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (callback) {
                    callback(this.responseText);
                }
            } else {
                if (errorback) {
                    errorback();
                }
            }
        }
    };
    xmlhttp.open('get', url + "?Token=" + (new Date()).valueOf(), true);
    xmlhttp.send();
};

/**
 * 获取ajax对象
 */
window.getXHR=function() {
    var xmlhttp = window.Core.xmlhttp;
    if (xmlhttp) {
        return xmlhttp;
    }
    if (window.XMLHttpRequest) {
        xmlhttp = new window.XMLHttpRequest();
    } else {
        xmlhttp = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    window.Core.xmlhttp = xmlhttp;
    return xmlhttp;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

window.bookContentDom = undefined;
window.contentDom = undefined;
window.bookname = "";
window.openBook = function(url) {
    window.bookname = url.split(/\//)[1] + "/" + url.split(/\//)[2];
    window.location.hash = url.split(/\//)[1] + "/" + url.split(/\//)[2];
    if (!window.bookContentDom) {
        window.bookContentDom = document.getElementById('book-content');
    }
    window.contentDom = undefined;
    window.doAjax(url, function(data) {
        window.bookContentDom.innerHTML = data;
        var script = window.bookContentDom.getElementsByTagName('script');
        if (script.length > 0) {
            window["eval"].call(window, script[0].innerText);
        }
    }, function() {
        window.bookContentDom.innerHTML = "通信错误";
    });
};
window.openContent = function(url) {
    window.location.hash = window.bookname + "/" + url.match(/\/([A-Za-z0-9]+)\./)[0].replace(/\//, '').replace(/\./, '');
    if (!window.contentDom) {
        window.contentDom = document.getElementById('content');
    }
    window.doAjax(url, function(data) {
        window.contentDom.innerHTML = data;
        var script = window.contentDom.getElementsByTagName('script');
        if (script.length > 0) {
            window["eval"].call(window, script[0].innerText);
        }
    }, function() {
        window.contentDom.innerHTML = "通信错误";
    });
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);