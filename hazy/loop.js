Hazy.extend(Hazy.looper, {
    //推进轮询数组并尝试启动
    /*
     *  task:function//执行方法，目前不支持异步，后期可能会思考如何支持
     */
    "loop": function(task) {
        Hazy.looper.task.unshift(task);
        Hazy.looper.start();
    },

    "start": function() {
        if (!Hazy.looper.isRun) {
            Hazy.looper.isRun = true;
            Hazy.looper.do();
        }
    },

    "do": function() {
        if (Hazy.looper.task.length <= 0) {
            Hazy.looper.isRun = false;
        } else {
            (Hazy.looper.task.pop())();
            Hazy.looper.do();
        }
    }
});
