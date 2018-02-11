/*! yelloxing.github.io V4 | (c) 2007, 2018 心叶 | Apache-2.0 https://github.com/yelloxing/yelloxing.github.io.git */

// 引入Luna.js
require('../node_modules/luna-library/luna.js');

$(function() {
    $('pre.code').append('<div class="clipboard"></div>');
    $('div.clipboard').bind('click', function() {
        $.clipboard($(this).parent().text(), function() {
            alert('复制成功，现在可以粘贴了.');
        }, function() {
            alert('非常抱歉，复制失败！');
        });
    });
});