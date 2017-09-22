(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /**
         * 核心小型sizzle代码
         */
        "doFind": function(selector, context) {
            var $$this = Lazy(context);
            $$this.selector = $$this.selector + ":find(" + selector + ")";
            /**
             * 0.对表达式用逗号分开
             * 1.对表达式分组。
             * 2.初始化集合（right->left）。
             * 3.在当前的上下文里过滤要找的节点，并更新上下文，重复这一过程，直到结尾。
             */

            //0.对表达式用逗号分开
            selector = selector.trim();
            $$this.length = 0;
            if (/,/.test(selector)) {
                var selectors = selector.split(/ ?, ?/),
                    tempArray = [],
                    flag = 0,
                    innerFlag = 0;
                for (; flag < selectors.length; flag++) {
                    if (!/^ +$/.test(selectors[flag])) {
                        tempArray = $$this.find(selectors[flag]);
                        for (innerFlag = 0; innerFlag < tempArray.length; innerFlag++) {
                            $$this[$$this.length] = tempArray[innerFlag];
                            $$this.length += 1;
                        }
                    }
                }
            } else {
                //1.对表达式分组
                //4种dom元素间关系的判断，分别是 “+”, “>”, “ ”, “~”
                var splitHook = {
                    "+": true,
                    ">": true,
                    " ": true,
                    "~": true,
                };
                var flag = 0;
                var selectorArray = [];
                var curString = "";
                var hadSpotlight = false;
                var isClosed = 0;
                var needCloseArray = [];
                for (; flag < selector.length; flag++) {
                    if (splitHook[selector[flag]]) {
                        //如果没闭合时候出现了意外字符
                        if (isClosed > 0) {
                            if (selector[flag] == " ") {
                                if (!hadSpotlight) {
                                    curString += selector[flag];
                                }
                            } else {
                                throw new Error('+ > ~ is illegal value!');
                            }
                        } else {
                            //如果是
                            if (curString != "") {
                                selectorArray.push(curString);
                                curString = "";
                            }
                            if (selector[flag] == " " && hadSpotlight) {
                                //toDo
                            } else {
                                if (selectorArray[selectorArray.length - 1] == " ") {
                                    selectorArray[selectorArray.length - 1] = selector[flag];
                                } else {
                                    selectorArray.push(selector[flag]);
                                }
                            }
                        }
                        hadSpotlight = true;
                    } else {
                        //如果不是“+”, “>”, “ ”, “~”
                        hadSpotlight = false;
                        if (selector[flag] == "'" || selector[flag] == '"' || selector[flag] == "[" || selector[flag] == "]") {
                            //如果是需要闭合的
                            if (needCloseArray.length > 0 && selector[flag] == needCloseArray[needCloseArray.length - 1]) {
                                //如果这次闭合了
                                isClosed -= 1;
                                needCloseArray.length -= 1;
                            } else {
                                if (']' == selector[flag]) {
                                    throw new Error('] is illegal value!');
                                }
                                //如果这次出现了新的需要闭合
                                if ('[' == selector[flag]) {
                                    needCloseArray[needCloseArray.length] = "]";
                                } else {
                                    needCloseArray[needCloseArray.length] = selector[flag];
                                }
                                isClosed += 1;
                            }
                        }
                        curString += selector[flag];
                    }
                }
                if (curString != '') {
                    selectorArray.push(curString);
                }


                //2.初始化集合（right->left）
                var popSelector = selectorArray.pop();
                var domArray = Lazy.doSelector(popSelector, context, true);

                //3.在当前的上下文里过滤要找的节点，并更新上下文，重复这一过程，直到结尾
                //停止学习的开发，开始搭建真实的项目

                //4.添加到本对象中去
                var flag = 0;
                for (; flag < domArray.length; flag++) {
                    $$this[flag] = domArray[flag];
                }
                $$this.length = flag;
            }
            return $$this;
        }
    });
})(window, window.Lazy);
