/**
 * Created by Render on 2016/8/23 0023.
 */

window.REN = window.REN || {};

(function () {

    function Ball(color) {
        this._htmlNode = document.createElement("div");
        this._color = color;
    }

    var pro = Ball.prototype;

    pro.getHtmlNode = function () {
        this.ballStyle();
        this.randomPosition();
        this.move();
        return this._htmlNode;
    }

    pro.ballStyle = function () {
        this._htmlNode.style.width = "40px";
        this._htmlNode.style.height = "40px";
        this._htmlNode.style.backgroundColor = this._color;
        this._htmlNode.style.borderRadius = "50%";
        this._htmlNode.style.position = "absolute";
    }

    pro.randomPosition = function () {
        this._htmlNode.style.top = Math.floor(Math.random() * 700) + "px";
        this._htmlNode.style.left = Math.floor(Math.random() * 1400) + "px";
    }

    pro.move = function () {
        var nowX = parseInt(this._htmlNode.style.left);
        var nowY = parseInt(this._htmlNode.style.top);
        var speedX, speedY;
        while (true) {
            speedX = 10 - Math.floor(Math.random() * 21);
            speedY = 10 - Math.floor(Math.random() * 21);
            if (!(speedX == 0 && speedY == 0)) break;
        }

        var id = setInterval(function () {
            nowX += speedX, nowY += speedY;
            this._htmlNode.style.left = nowX + "px";
            this._htmlNode.style.top = nowY + "px";
            if ((nowX <= -40 || nowX >= document.body.clientWidth-40) || (nowY <= -40 || nowY >= window.screen.height-40)) {
                clearInterval(id);
                this._htmlNode.parentNode.removeChild(this._htmlNode);
            }
        }.bind(this), 20)
    }


    REN.Ball = Ball;

})();
