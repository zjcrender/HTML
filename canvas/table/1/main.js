/**
 * Created by REN on 2016/9/14.
 */

(function () {

    var canvas = document.querySelector("#canvas");
    var pen = canvas.getContext("2d");
    var arr = [60,90,150,130,170,190,125,175,155,165,155,145];

    pen.beginPath();
    pen.strokeRect(50,10,800,400);
    pen.closePath();
    pen.stroke();
    for (var i = 0;i<=400;i+=40){
        pen.beginPath();
        pen.font = "10px 宋体"
        pen.fillText((400-i)/2+"",10,i+10);
        pen.moveTo(50,i+10);
        pen.lineTo(850,i+10);
        pen.closePath();
        pen.stroke();
    }

    pen.lineWidth = 27;
    for(var  i=0;i<12;i++) {
        pen.beginPath();
        // pen.moveTo(86+i*57,410);
        // pen.lineTo(86+i*57,410-arr[i]*2);
        drawBarChart(86+i*57,arr[i]*2);
        pen.font = "10px 宋体"
        pen.fillText(i+1+"月",76+i*57,430);
        pen.closePath();
        pen.strokeStyle = "black";
        pen.stroke();
    }

    function drawBarChart(positionX,height) {
        var _h = 0;
        var id =  setInterval(function () {
            _h+=10;
            pen.beginPath();
            pen.strokeStyle = "#6be";
            pen.moveTo(positionX,410);
            pen.lineTo(positionX,410-_h);
            _h == height && (clearInterval(id));
            pen.closePath();
            pen.stroke();
        },50)
    }




})();