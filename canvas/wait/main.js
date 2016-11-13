/**
 * Created by REN on 2016/9/14.
 */

(function () {

    var canvas = document.querySelector("#canvas");
    var pen = canvas.getContext("2d");
    var deg = 0;

    function drawWaitBar() {
        var _R = 1.5;
        var _alpha = 0;
        for (var i = 0;i<320;i+=20) {
            _alpha += 0.05;
            _R += 0.5;
            pen.save();
            pen.beginPath();
            pen.rotate(i*Math.PI/180);
            pen.arc(0,-60,_R,0,2*Math.PI);
            pen.closePath();
            pen.fillStyle = "rgba(0,0,0,"+_alpha+")";
            pen.fill();
            pen.restore();
        }
    }

    setInterval(function () {
        pen.clearRect(0,0,500,500);
        pen.font = "20px 宋体"
        pen.fillText("Waiting",215,255);
        deg += 20*Math.PI/180;
        pen.save();
        pen.translate(250,250);
        pen.rotate(deg);
        drawWaitBar();
        pen.restore();

    },100)

})();