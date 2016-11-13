/**
 * Created by Administrator on 2016/8/20 0020.
 */

(function () {

    var container = document.querySelector("#container");
    var left = document.querySelector(".left");
    var right = document.querySelector(".right");
    var top = document.querySelector(".top");
    var bottom = document.querySelector(".bottom");

    var imgsrc = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg", "images/6.jpg"];
    var index = 0, inchange = false , interval;

    var card = new ren.Card(imgsrc[0]);
    container.appendChild(card.getHtmlNode());

    function changeImage(direction) {
        if (!inchange) {
            inchange = true;
            var changeDirection, positionTo;
            switch (direction) {
                case "left":
                    changeDirection = "left";
                    positionTo = 800;
                    break;
                case "right":
                    changeDirection = "left";
                    positionTo = -800;
                    break;
                case "top":
                    changeDirection = "top";
                    positionTo = 600;
                    break;
                case "bottom":
                    changeDirection = "top";
                    positionTo = -600;
                    break;
            }
            index++, index %= imgsrc.length;
            card.move(changeDirection, 0, positionTo, "gone");
            card = new ren.Card(imgsrc[index]);
            container.appendChild(card.getHtmlNode());
            card.move(changeDirection, -positionTo, 0, "show");
            setTimeout(function () {
                inchange = false;
            }.bind(this), 1000)
        }
    }


    left.onclick = function () {
        changeImage("left");
        resetInterval();
    }

    right.onclick = function () {
        changeImage("right");
        resetInterval();
    }

    top.onclick = function () {
        changeImage("top");
        resetInterval();
    }

    bottom.onclick = function () {
        changeImage("bottom");
        resetInterval();
    }

    function resetInterval() {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(function () {
            var randomNumber = Math.floor(Math.random()*4);
            switch (randomNumber) {
                case 0:
                    changeImage("left");
                    break;
                case 1:
                    changeImage("right");
                    break;
                case 2:
                    changeImage("top");
                    break;
                case 3:
                    changeImage("bottom");
                    break;
            }
        },4000)
    }

    resetInterval();

})();