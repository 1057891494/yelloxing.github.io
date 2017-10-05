$.extend(Hazy.StepByStep, {
    "pwd": "",
    "toggle": function() {
        $.StepByStep.pwd='';
        if ($('#StepByStep').length < 1) {
            $('body').append("<ul class='StepByStep' id='StepByStep'>"+
            "   <li onclick='$.StepByStep.input(\"0\")'>0</li>"+
            "   <li onclick='$.StepByStep.input(\"1\")'>1</li>"+
            "   <li onclick='$.StepByStep.input(\"2\")'>2</li>"+
            "   <li onclick='$.StepByStep.input(\"3\")'>3</li>"+
            "   <li onclick='$.StepByStep.input(\"4\")'>4</li>"+
            "   <li onclick='$.StepByStep.input(\"5\")'>5</li>"+
            "   <li onclick='$.StepByStep.input(\"6\")'>6</li>"+
            "   <li onclick='$.StepByStep.input(\"7\")'>7</li>"+
            "   <li onclick='$.StepByStep.input(\"8\")'>8</li>"+
            "   <li onclick='$.StepByStep.input(\"9\")'>9</li>"+
            "</ul>");
        } else {
            $('#StepByStep').remove();
        }
    },
    "input": function(num) {
        $.StepByStep.pwd += num;
    }
});
