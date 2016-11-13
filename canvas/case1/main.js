/**
 * Created by REN on 2016/9/13.
 */
(function () {

    var canvas = document.querySelector("#canvas");
    var pen = canvas.getContext("2d");


    drawArc(200,"#cd2e3e");
    drawArc(160,"white");
    drawArc(120,"#cd2e3e");
    drawArc(80,"#02468d");
    drawStar(80, "white");


    function drawArc(R,color) {
        pen.beginPath();
        pen.arc(250,250,R,0,2*Math.PI);
        pen.fillStyle = color;
        pen.fill();
    }

    function drawStar(R,color) {
        pen.beginPath();
        pen.moveTo(250, 250 - R);
        for (var i = 1; i <= 5; i++) {
            var x = 250 + Math.sin(Math.PI * 4 / 5 * i) * R;
            var y = 250 - Math.cos(Math.PI * 4 / 5 * i) * R;
            pen.lineTo(x, y);
        }
        pen.stroke();
        pen.fillStyle = color;
        pen.fill();
    }

})();