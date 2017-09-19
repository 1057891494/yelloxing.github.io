describe('lazy tool-inner', function() {

    it('测试内部使用工具', function() {
        expect('btn btn-warn btn-info submit').toBe(Lazy.uniqueClass('btn  btn-warn','btn-info btn submit'));
        expect('btn-warn').toBe(Lazy.operateClass('btn btn-warn','btn btn-info',true));
    });
});
