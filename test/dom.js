describe('lazy dom', function() {

    it('append[在被选元素的结尾插入内容]', function() {
        expect(true).toBe($$("body").append(`
            <ul>
                <li id='language'>002：CSS</li>
            </ul>
        `).isTouch);
    });

    it('prepend[在被选元素的开头插入内容]', function() {
        expect(true).toBe($$("body").prepend(`
            <header>
                <h1>测试代码</h1>
            </header>
        `).isTouch);
    });

    it('after[在被选元素之后插入内容]', function() {
        expect(true).toBe($$("#language").after(`
            <li id='dd'>003：JavaScript</li>
        `).isTouch);
    });

    it('before[在被选元素之前插入内容]', function() {
        expect(true).toBe($$("#language").before(`
            <li>001：HTML</li>
        `).isTouch);
    });

    it('html[设置或获取内部html]', function() {
        expect("<div>【html测试数据】</div>").toBe($$("#language").html("<div>【html测试数据】</div>").html());
    });

    it('text[设置或获取内部text]', function() {
        expect("【text测试数据】").toBe($$("#language").text("【text测试数据】").text());
    });

    it('val[设置或返回表单字段的值]', function() {
        $$("#language").html(`<div>
            <label></label>
            <input id='val-name'/>
        </div>`);
        expect("设置或返回表单字段的值").toBe($$("#val-name").val("设置或返回表单字段的值").val());
    });

    it('attr[用于设置/改变属性值]', function() {
        expect("用于设置/改变属性值").toBe($$("#val-name").attr("class", "用于设置/改变属性值").attr('class'));
    });

    it('css[设置或返回被选元素的一个样式属性]', function() {
        expect("30px").toBe($$("#val-name").css('font-size', '30px').css('font-size'));
    });

});
