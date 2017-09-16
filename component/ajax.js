class DoAjax {
    constructor(doMethod) {
        this.method = doMethod;
        if (window.XMLHttpRequest) {
            this.xmlhttp = new XMLHttpRequest();
        } else {
            this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    doRemote(url, callback) {
        console.debug(">>> Sprout:Ajax.doRemote(" + this.method + "," + url + ")");
        this.xmlhttp.onreadystatechange = function() {

            if (!this.xmlhttp && this.readyState == 4 && this.status == 200) {
                callback(this.responseText);
            }
        }
        this.xmlhttp.open(this.method, url + "?Token=" + (new Date()).valueOf(), true);
        this.xmlhttp.send();
    }

}

export { DoAjax as Ajax };
