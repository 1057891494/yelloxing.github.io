Hazy.prototype.extend({
    /*提供动画效果*/
    "animation": function(protojson, duration, callback) {
        var $this = Hazy(this);
        //初始化
        if (!protojson || typeof protojson != 'object') {
            throw new Error('protojson is illegal!');
        }
        if (typeof duration != 'number' && duration) {
            throw new Error('duration is illegal!');
        }

        var key, value, beginproto, oldValue, loopTimerData = {},
            unit;
        Hazy.clock.timer(function(deep) {
            //其中deep为0-100，单位%，表示改变的程度
            for (key in protojson) {

                //提取处理(只处理一次，提供的是预处理，不实施)
                if (!loopTimerData[key]) {
                    value = protojson[key];
                    oldValue = $this.css(key);
                    beginproto = {
                        "value": oldValue.replace(/[pxrem%]/g, ''),
                        "unit": oldValue.replace(/[\d\.]/g, '')
                    };

                    //处理
                    if (/^[\d\.]+px$/.test(value) && (!oldValue || beginproto.unit == 'px')) {
                        value = value.replace(/px$/, '');
                        unit = "px";
                    } else if (/^[\d\.]+%$/.test(value) && (!oldValue || beginproto.unit == '%')) {
                        value = value.replace(/%$/, '');
                        unit = "%";
                    } else if (/^[\d\.]+$/.test(value) && (!oldValue || beginproto.unit == '')) {
                        unit = "";
                    } else if (/^[\d\.]+em$/.test(value) && (!oldValue || beginproto.unit == 'em')) {
                        value = value.replace(/em$/, '');
                        unit = "em";
                    } else if (/^[\d\.]+rem$/.test(value) && (!oldValue || beginproto.unit == 'rem')) {
                        value = value.replace(/rem$/, '');
                        unit = "rem";
                    } else {
                        oldValue = oldValue || 'undefined';
                        throw new Error(value + ' is illegal for animation,old value is ' + oldValue + '!');
                    }
                    beginproto.value = beginproto.value || 0;
                    loopTimerData[key] = {
                        "deep": value - beginproto.value,
                        "unit": unit,
                        "beginValue": beginproto.value
                    };
                    beginproto = null;
                }

                //以后直接计算，因为此时不会出现问题了，故意捣乱的目前不管
                unit = loopTimerData[key].unit;
                value = loopTimerData[key].beginValue - (-loopTimerData[key].deep * deep * 0.01);
                $this.css(key, value + "" + unit);

            }
        }, duration, callback);
    }
});

Hazy.extend(Hazy.clock, {
    //把tick函数推入堆栈
    "timer": function(tick, duration, callback) {
        if (!tick) {
            throw new Error('tick is required!');
        }
        duration = duration || Hazy.clock.speeds;
        Hazy.clock.timers.push({
            "createTime": new Date(),
            "tick": tick,
            "duration": duration,
            "callback": callback
        });
        Hazy.clock.start();
    },

    //开启唯一的定时器timerId
    "start": function() {
        if (!Hazy.clock.timerId) {
            Hazy.clock.timerId = window.setInterval(Hazy.clock.tick, Hazy.clock.interval);
        }
    },

    //被定时器调用，遍历timers堆栈
    "tick": function() {
        var createTime, flag, tick, callback, timer, duration, passTime, needStop,deep,
            timers = Hazy.clock.timers;
        Hazy.clock.timers = [];
        Hazy.clock.timers.length = 0;
        for (flag = 0; flag < timers.length; flag++) {
            //初始化数据
            timer = timers[flag];
            createTime = timer.createTime;
            tick = timer.tick;
            duration = timer.duration;
            callback = timer.callback;
            needStop = false;

            //执行
            passTime = (+new Date() - createTime) / duration;
            if (passTime >= 1) {
                needStop = true;
            }
            passTime = passTime > 1 ? 1 : passTime;
            deep = 100 * passTime;
            tick(deep);
            if (passTime < 1) {
                //动画没有结束再添加
                Hazy.clock.timers.push(timer);
            } else if (callback) {
                callback();
            }
        }
        if (Hazy.clock.timers.length <= 0) {
            Hazy.clock.stop();
        }
    },

    //停止定时器，重置timerId=null
    "stop": function() {
        if (Hazy.clock.timerId) {
            window.clearInterval(Hazy.clock.timerId);
            Hazy.clock.timerId = null;
        }
    }
});
