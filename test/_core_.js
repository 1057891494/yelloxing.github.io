describe('lazy core', function() {
    it('基本测试', function() {
        expect(true).toBe($$("<div>一个小型的Jquery，方便提供例子</div>").isTouch);
    });

    beforeEach(function() {
        //在每一个测试用例(it)执行之前都执行一遍beforeEach函数；
    });


    afterEach(function() {
        //在每一个测试用例(it)执行完成之后都执行一遍afterEach函数
    });


    beforeAll(function() {
        //在所有测试用例执行之前执行一遍beforeAll函数
    });


    afterAll(function() {
        //在所有测试用例执行完成之后执行一遍afterAll函数
    });


});

/*
expect(a).toBe(true);//期望变量a为true
expect(a).toEqual(true);//期望变量a等于true
expect(a).toMatch(/reg/);//期望变量a匹配reg正则表达式，也可以是字符串
expect(a.foo).toBeDefined();//期望a.foo已定义
expect(a.foo).toBeUndefined();//期望a.foo未定义
expect(a).toBeNull();//期望变量a为null
expect(a.isMale).toBeTruthy();//期望a.isMale为真
expect(a.isMale).toBeFalsy();//期望a.isMale为假
expect(true).toEqual(true);//期望true等于true
expect(a).toBeLessThan(b);//期望a小于b
expect(a).toBeGreaterThan(b);//期望a大于b
expect(a).toThrowError(/reg/);//期望a方法抛出异常，异常信息可以是字符串、正则表达式、错误类型以及错误类型和错误信息
expect(a).toThrow();//期望a方法抛出异常
expect(a).toContain(b);//期望a(数组或者对象)包含b
*/
