Hazy.controller("ExampleCtrl", function($scope) {

    //初始化代码
    $scope.initCode = `
        <script>
            /*这里你可以写脚步*/
        </script>
        <style>
            /*这里填写你要的样式*/
        </style>
        <div class='unique-example'>
            <!--你可以在这里写例子代码！-->
        </div>
    `;

    //应用代码
    $scope.apply = function(code) {
        var code = Hazy("#exampleCode").val() + "";
        var script = $scope.findScript(code);
        Hazy("#exampleView").html(code);
        window["eval"].call(window, script);
    };

    //恢复代码
    $scope.reset = function() {
        Hazy("#exampleView").html($scope.initCode);
        Hazy("#exampleCode").val($scope.initCode);
    };

    //分析切割数据
    $scope.findScript = function(code) {
        if (!code) return '';
        var scripts = (code + "").trim().replace(/[\n\f\r ]/g, '').match(/<script>.*<\/script>/g),
            flag, resultStr = '';
        if (!scripts) return '';
        for (flag = 0; flag < scripts.length; flag++) {
            resultStr += (Hazy("<div>" + scripts[flag] + "</div>").text() + "");
        }
        return resultStr;
    };

    //初始化
    var params = (window.location.hash + '').split('?')[1];
    if (params) {
        var href = (params + "").trim().replace(/^code=['"]/, '').replace(/['"]$/, '');
        if (href) {
            $.ajax('get', href, function(data) {
                $scope.initCode = data;
                $scope.reset();
            });
        } else {
            $scope.reset();
        }
    } else {
        $scope.reset();
    }


});
