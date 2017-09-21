describe('lazy find', function() {

    it('[测试自定义小型sizzle选择器]', function() {
        $$("body").append(`
            <header id='find-id'>
                <h1>[find]测试代码</h1>
                <div name='info'>
                    <span class='info username'>
                    1
                        <span class='info btn'>
                        2
                        <input class='btn info' type='button' value='按钮'>
                        </span>
                    </span>
                </div>
            </header>
        `);
        console.log($$("#find-id").find("div > span.info,.username .btn ,[   name=   'info']    [class='info btn']"));
    });
});
