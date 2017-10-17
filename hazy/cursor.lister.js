Hazy.extend(Hazy.routerStyle, {
    "initClick": function(state) {
        var states = state.replace(/^\//, '').split(/\//),
            deep;
        for (deep = 0; deep < states.length; deep++) {
            Hazy.routerStyle.changeClick(states[deep], deep + 1);
        }
    },
    "changeClick": function(state, deep) {
        var eq;
        switch (deep) {
            case 1:
                {
                    eq = {
                        "home": 1,
                        "notebook": 2,
                        "algorithm": 3,
                        "gouache": 4,
                        "English": 5,
                        "Cuper": 6
                    }[state];
                    if (eq && $("#deeponemenu").length > 0) {
                        $("#deeponemenu").find('li').removeClass('click').eq(eq - 1).addClass('click');
                    }
                    break;
                }
            case 2:
                {
                    eq = {
                        "tool": 1,
                        "ECMAScript": 2,
                        "layout": 3,
                        "model": 4
                    }[state];
                    if (eq && $("#deeptwomenu").length > 0) {
                        $("#deeptwomenu").find('li').removeClass('click').eq(eq - 1).addClass('click');
                    }
                    break;
                }
        }
    }
});
