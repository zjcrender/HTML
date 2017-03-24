/**
 * Created by Administrator on 2016/8/23 0023.
 */


(function () {

    var ballColor = ["#6be","#333","#ffe957","#f29f3f"];
    var ballColorLength = ballColor.length;

    function creatBall(Num) {
        for (var i=0;i<Num;i++) {
            var randomNum = Math.floor(Math.random()*ballColorLength);
            var ball = new REN.Ball(ballColor[randomNum]);
            document.body.appendChild(ball.getHtmlNode());
        }
    }

    creatBall(40);



})();
