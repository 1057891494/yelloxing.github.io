describe('lazy search', function() {

    it('parent[返回被选元素的直接父元素]', function() {
        $$("body").append(`
            <header class='parent'>
                <h1 id='parent-id'>[search]测试代码</h1>
            </header>
        `);
        expect($$("#parent-id").parent().class()).toBe('parent');
    });

    it('parents[返回被选元素的所有祖先元素]', function() {
        $$("body").append(`
        <div class='1' id='outer-id'>
            <div class='2'>
                <div id='middle-id'  class='3'>
                    <span class='平行的span'>
                        平行的span
                    </span>
                    <div  class='4'>
                        <div id='inner-id'  class='5'>
                            最内部
                        </div>
                    </div>
                    <span class='span1' id='spanRoot'>
                        span1
                    </span>
                    <span class='span2'>
                        span2
                    </span>
                    <span class='span3'>
                        span3
                    </span>
                </div>
            </div>
        </div>
    `);
        expect($$($$("#middle-id").parents()[0]).class()).toBe('2');
        expect($$($$("#middle-id").parents()[1]).class()).toBe('1');
    });

    it('children[返回被选元素的所有直接子元素]', function() {
        expect($$($$("#middle-id").children()[0]).class()).toBe('平行的span');
        expect($$($$("#middle-id").children()[1]).class()).toBe('4');
    });

    it('siblings[返回被选元素的所有同胞元素]', function() {
        expect($$("#spanRoot").siblings().length).toBe(5);
    });

    it('next[返回被选元素的下一个同胞元素]', function() {
        expect($$("#spanRoot").next().class()).toBe('span2');
    });

    it('nextAll[返回被选元素的所有跟随的同胞元素]', function() {
        expect($$("#spanRoot").nextAll().length).toBe(2);
    });

    it('prev[返回被选元素的前一个同胞元素]', function() {
        expect($$("#spanRoot").prev().class()).toBe('4');
    });

    it('prevAll[返回被选元素的所有之前的同胞元素]', function() {
        expect($$("#spanRoot").prevAll().length).toBe(2);
    });

    it('first[返回被选元素的首个元素]', function() {
        expect($$("#middle-id").children().first().class()).toBe("平行的span");
    });

    it('last[返回被选元素的最后一个元素]', function() {
        expect($$("#middle-id").children().last().class()).toBe("span3");
    });

    it('eq[返回被选元素中带有指定索引号的元素，从0开始]', function() {
        expect($$("#middle-id").children().eq(2).class()).toBe("span1");
        expect($$("#middle-id").children().eq(3).class()).toBe("span2");
        expect($$("#middle-id").children().eq(4).class()).toBe("span3");
    });

    it('filter[返回集合里匹配的元素集合]', function() {
        expect($$("#middle-id").children().filter(function(lazyObj) {
            return true;
        }).length).toBe(5);
        expect($$("#middle-id").children().filter(function(lazyObj) {
            var result = lazyObj.class() == 'span3';
            return result;
        }).length).toBe(1);
    });

    it('not[返回不匹配标准的所有元素]', function() {
        expect($$("#middle-id").children().not(function(lazyObj) {
            return false;
        }).length).toBe(5);
    });

});
