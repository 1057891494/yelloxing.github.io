Hazy.extend(Hazy.routerStyle, {
    "initClick": function(state) {
        var states = state.replace(/^\//, '').split(/\//),
            deep;
        for (deep = 0; deep < states.length; deep++) {
            Hazy.routerStyle.changeClick(states[deep], deep + 1);
        };
    },
    "changeClick": function(state, deep) {
        switch (deep) {
            case 1:
                {
                    var eq = {
                        "home": 1,
                        "notebook": 2,
                        "opensource": 3,
                        "case": 4,
                        "other": 5
                    }[state];
                    if (eq && $("#deeponemenu").length > 0) {
                        $("#deeponemenu").find('li').removeClass('click').eq(eq - 1).addClass('click');
                    }
                    break;
                }
            case 2:
                {
                    var eq = {
                        "tool": 1
                    }[state]
                    if (eq && $("#deeptwomenu").length > 0) {
                        $("#deeptwomenu").find('li').removeClass('click').eq(eq - 1).addClass('click');
                    }
                    break;
                }
        }
    }
});
