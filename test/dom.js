describe('lazy dom', function() {

    it('append[在被选元素的结尾插入内容]', function() {
        expect($$("body").append(`
        <ul>
            <li id='language'>002：CSS</li>
        </ul>
    `).isTouch).toBe(true);
    });

    it('prepend[在被选元素的开头插入内容]', function() {
        expect($$("body").prepend(`
        <header>
            <h1>[DOM]测试代码</h1>
        </header>
    `).isTouch).toBe(true);
    });

    it('after[在被选元素之后插入内容]', function() {
        expect($$("#language").after(`
        <li id='dd'>003：JavaScript</li>
    `).isTouch).toBe(true);
    });

    it('before[在被选元素之前插入内容]', function() {
        expect($$("#language").before(`
        <li>001：HTML</li>
    `).isTouch).toBe(true);
    });

    it('html[设置或获取内部html]', function() {
        expect($$("#language").html("<div>【html测试数据】</div>").html()).toBe("<div>【html测试数据】</div>");
    });

    it('text[设置或获取内部text]', function() {
        expect($$("#language").text("【text测试数据】").text()).toBe("【text测试数据】");
    });

    it('val[设置或返回表单字段的值]', function() {
        $$("#language").html(`<div>
            <label></label>
            <input id='val-name'/>
        </div>`);
        expect($$("#val-name").val("设置或返回表单字段的值").val()).toBe("设置或返回表单字段的值");
    });

    it('attr[用于设置/改变属性值]', function() {
        expect($$("#val-name").attr("class", "用于设置/改变属性值").attr('class')).toBe("用于设置/改变属性值");
    });

    it('css[设置或返回被选元素的一个样式属性]', function() {
        expect($$("#val-name").css('font-size', '30px').css({
            'color': 'red',
            'width': '360px',
            'outline': '0px',
            'border': '0px'
        }).css('font-size')).toBe("30px");
    });

    it('empty[从被选元素中删除子元素]', function() {

        $$("body").append(`
            <section>
                <header id='classTest'>empty[从被选元素中删除子元素]</header>
                <div id='empty-id'>
                    你看不见这里的东西
                </div>
                <div id='remove-id'>
                remove测试
                    <ul>
                        <li>不存在之物</li>
                    </ul>
                </div>
            </section>
        `);

        expect($$("#empty-id").empty().html()).toBe('');
    });

    it('remove[删除被选元素（及其子元素）]', function() {
        $$("#remove-id").remove();
        expect($$("#remove-id").length).toBe(0);

    });

    it('addClass[向被选元素添加一个或多个类]', function() {
        expect($$('#classTest').addClass('addClass1 addClass2 addClass3 toggleClass').class()).toBe('addClass1 addClass2 addClass3 toggleClass');
    });

    it('removeClass[从被选元素删除一个或多个类]', function() {
        expect($$('#classTest').removeClass('addClass1 addClass2 removeClass').class()).toBe('addClass3 toggleClass');
    });

    it('toggleClass[对被选元素进行添加/删除类的切换操作]', function() {
        expect($$('#classTest').toggleClass('addClass3 addClass2 removeClass toggleClass').class()).toBe('addClass2 removeClass');
    });

    it('class[设置或获取class]', function() {
        expect($$('#classTest').class('class1  class2').class()).toBe('class1 class2');
    });

});
