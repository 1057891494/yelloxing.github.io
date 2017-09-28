$.prototype.extend({
    //获取元素相对body的位置
    "getElementPosition": function() {
        var $this = $(this);

        var left = 0;
        var top = 0;

        var obj = $this[0];
        top = obj.offsetTop;
        left = obj.offsetLeft;
        obj = obj.offsetParent;
        while (obj) {
            top += obj.offsetTop;
            left += obj.offsetLeft;
            obj = obj.offsetParent;
        }

        $this.left = left;
        $this.top = top;

        return $this;
    }

});
