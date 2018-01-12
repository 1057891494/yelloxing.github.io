/**
 * 在被选元素内部的开头插入内容
 */
window.prepend = function(targetNode, node) {
    if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
        targetNode.insertBefore(node, targetNode.childNodes[0]);
    } else if (typeof node == 'string') {
        targetNode.insertBefore(stringToDom(node), targetNode.childNodes[0]);
    } else {
        throw new Error("Not acceptable type!");
    }
};

/**
 * 在被选元素内部的结尾插入内容
 */
window.append=function(targetNode, node){
    if (node.nodeType === 1 || node.nodeType === 11 || node.nodeType === 9) {
        targetNode.appendChild(node);
    } else if (typeof node == 'string') {
        targetNode.appendChild(stringToDom(node));
    } else {
        throw new Error("Not acceptable type!");
    }
};

/**
 * 字符串变成dom,必须有一个大的包裹
 */
window.stringToDom = function(nodeString) {
    var frameDiv = document.createElement("div");
    frameDiv.innerHTML = nodeString;
    return frameDiv.childNodes[0];
};


/**
 * 删除被选元素（及其子元素）
 */
window.remove = function(node) {
    var $parent = node.parentNode;
    $parent.removeChild(node);
};

/**
 * 把指定文字复制到剪切板
 */
window.clipboard = function(text) {
    window.prepend(document.getElementsByTagName('body')[0], window.stringToDom('<textarea id="clipboard-textarea">' + text + '</textarea>'));
    document.getElementById("clipboard-textarea").select();
    document.execCommand("copy", false, null);
    window.remove(document.getElementById('clipboard-textarea'));
};
