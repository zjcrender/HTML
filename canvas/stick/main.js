/**
 * Created by REN on 2016/9/18.
 */

(function () {

    var canvas = document.querySelector("#myCanvas");
    canvas.style.background = "#6be";
    var pen = canvas.getContext("2d");
    pen.font = "20px 宋体";

    var height,width,distance,score=0;

    function initialState() {
        height=0;
        pen.clearRect(0,0,400,600);
        pen.fillStyle = "black";
        pen.fillText("分数："+score,160,100);
        pen.beginPath();
        pen.fillStyle = "#006c54";
        pen.fillRect(0,400,50,200);
        distance = Math.floor(Math.random()*100+100);
        width = Math.floor(Math.random()*100+50);
        pen.fillRect(distance,400,width,200);
        pen.fillStyle = "#ffe957";
        pen.fillRect(16,370,30,30);
        pen.closePath();
    }

    initialState();

    document.onkeydown = function (e) {
        pen.beginPath();
        pen.strokeStyle = "#f29f3f";
        pen.lineWidth = 4;
        pen.moveTo(48,404);

        if (e.code=="Space") {
            height += 5;
            pen.lineTo(48,404-height);
            pen.stroke();
        }
    }

    document.onkeyup = function (e) {
        if (e.code=="Space") {
            var deg=Math.PI;
            var id = setInterval(function () {
                deg+=0.01*Math.PI;
                pen.clearRect(46,400-height,height+4,height);
                pen.save();
                pen.beginPath();
                pen.translate(50,404);
                pen.rotate(deg);
                pen.moveTo(2,0);
                pen.lineTo(2,height);
                pen.stroke();
                pen.restore();
                if (deg>1.49*Math.PI){
                    clearInterval(id);
                    var d=16;
                    id = setInterval(function () {
                        pen.clearRect(d,370,30,30);
                        d+=5;
                        pen.fillRect(d,370,30,30);
                        if (height<distance-50 || height>distance+width-50) {
                           while (d-16>=height){
                                clearInterval(id);
                                alert("失败了！");
                               score=0;
                               initialState();
                               break;
                            }
                        }else if (d-16>=distance+width-52){
                            clearInterval(id) ;
                            score++;
                            initialState();
                        }
                    },10)
                }
            },10);
        }
    }


})();