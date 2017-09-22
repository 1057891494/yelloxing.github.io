(function(window, Lazy, undefined) {
    'use strict';

    Lazy.extend({

        /*一个小型的sizzle.js选择器*/
        "doSelector": function(selector, context, isMustEasy) {
            /**
             * 先把单纯的提取出来解决了
             *
             * isMustEasy如果为true,表示这是一个必须在这里被解决的问题，如果没有被解决，这是无法被接受的
             *
             */
            context = Lazy(context)[0];
            selector = selector || "";
            selector = selector.trim();
            var noSpaceSelector = selector.replace(/ /g, '');
            if (selector == '') {
                if (context.querySelectorAll) {
                    return context.querySelectorAll("*");
                } else {
                    return context.getElementsByTagName("*");
                }
            }
            //变量必须字母，下划线或美元符开头，除了开头的，还可以包含数字，-，
            if (/^#[_\w$](?:[_\w\d$]|-)*$/.test(selector)) {
                //Id选择器
                var elem = context.getElementById(new String(selector).replace(/^#/, ''));
                if (elem) {
                    return [elem];
                } else {
                    return [];
                }
            } else if (/^([_\w$](?:[_\w\d$]|-)*$)|\*/.test(selector)) {
                //标签选择器或者*
                //不区分大小写
                var elems = context.getElementsByTagName(selector);
                var resultData = [],
                    elem = null;
                var flag = 0;
                for (; flag < elems.length; flag++) {
                    elem = elems[flag];
                    if (elem && elem.nodeType && elem.nodeType === 1) {
                        resultData.push(elem);
                    }
                }
                return resultData;
            } else if (/^\.[_\w$](?:[_\w\d$]|-)*$/.test(selector)) {
                //如果是class选择器
                selector = selector.replace(/^\./, '');
                var elems = [];
                if (document.getElementsByClassName) {
                    elems = context.getElementsByClassName(selector);
                } else {
                    return Lazy(context).find("." + selector);
                }
                return elems;
                //废弃
            // } else if (/^\[name=("|')[_\w\d$]+\1\]$/.test(noSpaceSelector)) {
            //     var name = /("|')(.+)\1/.exec(selector)[2].trim();
            //     var elems = document.getElementsByName(name);
            //     var resultData = [],
            //         elem = null;
            //     var flag = 0;
            //     for (; flag < elems.length; flag++) {
            //         elem = elems[flag];
            //         if (elem && elem.nodeType && elem.nodeType === 1) {
            //             resultData.push(elem);
            //         }
            //     }
            //     return resultData;
            } else if (/^\[[_\w\d$]+=("|')[_\w\d$]+\1\]$/.test(noSpaceSelector)) {
                debugger
                //如果是属性
                var elems = [],
                    tempelems = [];
                if (context.querySelectorAll) {
                    tempelems = context.querySelectorAll("*");
                } else {
                    tempelems = context.getElementsByTagName("*");
                }
                var attrname = /^\[([_\w\d$]+)=/.exec(noSpaceSelector)[1];
                var attrvalarray = /("|')(.+)\1/.exec(selector)[2].trim().split(/ +/);

                var flag = 0,
                    ittr = "",
                    inFlag = 0;
                checkitem: for (; flag < tempelems.length; flag++) {
                    ittr = Lazy(tempelems[flag]).attr(attrname);
                    console.log(ittr);
                    if (ittr) {
                        ittr = " " + ittr + " ";
                        for (inFlag = 0; inFlag < attrvalarray.length; inFlag++) {
                            if (!ittr.search(" " + attrvalarray[inFlag] + " ")) {
                                continue checkitem;
                            }
                        }
                        elems.push(tempelems[flag]);
                    }
                }
                return elems;
            } else if (isMustEasy) {
                /**
                 * 对于[class='btn']的class属性，变成.btn的形式
                 */

                /**
                 * 前面已经查找了ID,class,name,*,undefined，对于余下的不包含层级关系的节点查找，都必须在这里结束
                 *
                 * 集合可能的对象是div#info.btn[ class='btn-warn']
                 */
                var selectorArray = [];
                //当前字符串，是否是新的开始，是否已经遇到[
                var cursor = ['', true, 0],
                    flag = 0,
                    curStr = '',
                    levelObj = {
                        "level1": false, //节点级别
                        "level2": false, //属性级别
                        "level3": false, //class级别
                        "level4": false //id级别
                    },
                    curLevel = "level1";

                for (; flag < selector.length; flag++) {
                    curStr = selector[flag];
                    if (cursor[1]) {
                        //如果是新的开始
                        if ("[" == curStr) {
                            cursor[2] = 1;
                            curLevel = 'level2';
                        }
                        if ("." == curStr) {
                            curLevel = 'level3';
                        }
                        if ("#" == curStr) {
                            curLevel = 'level4';
                        }
                        cursor[0] = curStr;
                        cursor[1] = false;
                    } else {
                        if ("#" == curStr) {
                            if (cursor[0].trim() != '') {
                                levelObj[curLevel] = selectorArray.length;
                                selectorArray.push(cursor[0]);
                            }
                            curLevel = 'level4';
                            cursor[0] = curStr;
                        } else if ("." == curStr) {
                            if (cursor[0].trim() != '') {
                                levelObj[curLevel] = selectorArray.length;
                                selectorArray.push(cursor[0]);
                            }
                            curLevel = 'level3';
                            cursor[0] = curStr;
                        } else if ("[" == curStr) {
                            if (cursor[2] > 0) {
                                throw new Error(selector + ' is illegal!');
                            }
                            curLevel = 'level2';
                            if (cursor[0].trim() != '') {
                                levelObj[curLevel] = selectorArray.length;
                                selectorArray.push(cursor[0]);
                            }
                            cursor[0] = curStr;
                            cursor[2] = 1;
                        } else if (']' == curStr) {
                            if (cursor[2] != 1) {
                                throw new Error(selector + ' is illegal!');
                            }
                            levelObj[curLevel] = selectorArray.length;
                            selectorArray.push(cursor[0] + "]");
                            cursor[0] = '';
                            cursor[2] = 0;
                        } else {
                            //非特殊字符
                            cursor[0] += curStr;
                        }
                    }
                }
                if (cursor[0].trim() != '') {
                    levelObj[curLevel] = selectorArray.length;
                    selectorArray.push(cursor[0]);
                }
                curLevel = levelObj["level4"] || levelObj["level3"] || levelObj["level2"] || levelObj["level1"] || 0;
                var curSel = selectorArray[curLevel];
                selectorArray[curLevel] = false;

                var basArray = Lazy.doSelector(curSel, context);

                return basArray;
            }
            /**
             * 对于不是上面简单的字符串，进行下面的选择查找
             */
            return Lazy.doFind(selector, context);

        }
    });
})(window, window.Lazy);
