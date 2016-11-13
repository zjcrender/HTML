/**
 * Created by REN on 2016/9/14.
 */

(function () {

    var canvas = document.querySelector("#canvas");
    var pen = canvas.getContext("2d");
    var arr = [60,90,150,130,170,190,125,175,155,165,155,145];
    pen.font = "10px 宋体";


    function drawBorder(width,height,stepX,stepY,times) {
        var _times = times || 1;
        var _width = width*_times,_height=height*_times,_stepX=stepX*_times,_stepY=stepY*_times;
        //画矩形
        pen.beginPath();
        pen.strokeRect(0,0,_width,_height);
        pen.closePath();
        pen.stroke();
        pen.fillText("0",-20,_height);
        pen.fillText(height+"",-20,0);
        for (var i=_stepY;i<_height;i+=_stepY) {
            drawLin("horizontal",0,i,_width);
            pen.fillText(height-i/_times+"",-20,i);
        }
        pen.beginPath();
        pen.strokeStyle = "#6be";
        pen.moveTo(_stepX,_height-arr[0]*_times);
        for (var i=_stepX;i<_width;i+=_stepX) {
            // drawLin("vertical",i,_height,arr[(i/_stepX-1)]*_times,30*_times,"#6be");
            pen.lineTo(i,_height-arr[(i/_stepX-1)]*_times);
            pen.fillText(i/_stepX+"月",i-8,_height+20);
        }
        pen.stroke();

        for (var i=_stepX;i<_width;i+=_stepX) {
            pen.beginPath();
            pen.arc(i,_height-arr[(i/_stepX-1)]*_times,5*_times,0,2*Math.PI);
            pen.stroke();
        }


    }


    function drawLin(direction,startX,startY,length,width,color) {
        var _endX = startX,_endY = startY;
        pen.beginPath();
        pen.lineWidth = width || 2;
        pen.strokeStyle = color || "black";
        pen.moveTo(startX,startY);
        direction == "vertical" && (_endY-=length);
        direction == "horizontal" && (_endX+=length);
        pen.lineTo(_endX,_endY);
        pen.closePath();
        pen.stroke();
    }




    pen.translate(50,50);
    drawBorder(650,200,50,50,1);

















})();