import {
    Ajax
} from './component/ajax.js';
import {
    Router
} from './sprout.router.js';
import {
    NavTemplate
} from './component/nav.template.js';
import {
    Storage
} from './component/storage.js';

class IndexClass {
    constructor() {
        this.ajax = new Ajax('get');
        this.router = new Router();
        this.navTemplate = new NavTemplate();
        this.names = this.router.getRootNav();
        this.storage = new Storage();
    }

    getHtmlByName(name) {
        return this.navTemplate.getTemplateByName(name, this.router.getMenuByName(name), this.router.getEnglishNameByName(name));
    }

    getNavHtml() {
        return this.navTemplate.getNavTemplate(this.names);
    }

}

/*
 * 启动app
 */

let indexClass = new IndexClass();
let sprout = document.getElementById('sprout');
let sprout_nav = document.getElementById('sprout_nav');
let sprout_footer = document.getElementById('sprout_footer');
let sprout_phone_tool = document.getElementById('phone_tool');
let tool = document.getElementById('tool');
let close_page = document.getElementById('close_page');
let paper = document.getElementById('paper');

sprout_nav.innerHTML = indexClass.getNavHtml();

window.openPage = function(url) {
    window.isBrowerLoad = true;
    window.location.href = window.location.href.split("/#")[0] + "#/" + url;
    var data = indexClass.storage.getValueByKey(url.replace(/[/.]/g, '_[-]_'));
    if (data) {
        sprout.innerHTML = data;
        sprout_nav.style.display = "none";
        sprout_phone_tool.style.display = "none";
    } else {
        indexClass.ajax.doRemote(url, function(data) {
            sprout.innerHTML = data;
            sprout_nav.style.display = "none";
            sprout_phone_tool.style.display = "none";
            indexClass.storage.setValueWithKey(url.replace(/[/.]/g, '_[-]_'), data);
        });
    }
    tool.style.display = 'none';
    sprout.style.height = 'auto';
    close_page.style.display = 'block';
    paper.style.display = 'block';
};
window.cleanBlog = function() {
    indexClass.storage.deleteAll();
    window.location.href = window.location.href.split("/#")[0];
};
window.closePage = function() {
    window.location.href = window.location.href.split("/#")[0];
};
window.navCursor = function(name) {
    sprout.innerHTML = indexClass.getHtmlByName(name);
};

var url = window.location.href.split("/#/")[1];
if (url) {
    tool.style.display = 'none';
    indexClass.ajax.doRemote(url, function(data) {
        sprout.innerHTML = data;
        sprout_nav.style.display = "none";
        sprout_phone_tool.style.display = "none";
        close_page.style.display = 'block';
        paper.style.display = 'block';
        indexClass.storage.setValueWithKey(url.replace(/[/.]/g, '_[-]_'), data);
    });
} else {
    indexClass.ajax.doRemote("src/github.html", function(data) {
        sprout.innerHTML = data;
    });
}

if (window.addEventListener) {
    window.addEventListener('popstate', function() {
        if (window.isBrowerLoad) {
            window.isBrowerLoad = false;
            return;
        }
        window.isBrowerLoad = true;
        window.location.href = window.location.href;
    }, false);
} else {
    window.attachEvent('onpopstate', function() {
        if (window.isBrowerLoad) {
            window.isBrowerLoad = false;
            return;
        }
        window.isBrowerLoad = true;
        window.location.href = window.location.href;
    });
}

window.toggleTool = function() {
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
