describe('lazy selector', function() {

    it('[基本的选择器选择测试]', function() {
        $$("body").append(`
            <header>
                <h1 class='usernmae'>[selector]测试代码</h1>
                <div id='apple'  class='usernmae'>
                    苹果
                </div>
                <input type='text' name='usernameSelector' value='username'>
            </header>
        `);
        expect($$("#apple").text().trim()).toBe('苹果');
        console.log($$("div"));
        console.log($$('[name="usernameSelector"]'));
        expect($$('[name="usernameSelector"]').val()).toBe('username');
        console.log($$(".usernmae"));
    });

});
