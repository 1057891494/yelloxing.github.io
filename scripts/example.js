function apply() {
    console.log('apply开发中');
}

function reset() {
    console.log('reset开发中');
}

//恢复数据
var param = ((window.location.hash + '').split('?')[1] + '') || '';
