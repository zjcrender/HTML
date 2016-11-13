/**
 * Created by REN on 2016/8/24 0024.
 */

(function () {

    function Plane(num,derictionNum) {
        this._htmlNode = document.createElement("img");
        this.htmlNode.src = this.imgSrc[num];
        this.htmlNode.className = "plane"
        this._distance = 0;
        this.speed = (num + 1) * 2;
        this.gone = false;
        this.deriction;
        switch (derictionNum) {
            case 0:
                this.deriction = "left";
                this.htmlNode.style.transform = "rotate3d(0,1,0,180deg)";
                break;
            case 1:
                this.deriction = "right";
                break;
        }
        this.htmlNode.style[this.deriction] = "-100px";
    }

    Object.defineProperty(Plane.prototype, "htmlNode", {
        get: function () {
            return this._htmlNode;
        }
    });

    Plane.prototype.imgSrc = ["images/plane0001.png", "images/plane0002.png",
        "images/plane0003.png", "images/plane0004.png", "images/plane0005.png"];

    Plane.prototype.syncDistance = function () {
        this._distance += this.speed;
        if (this._distance > 550) {
            this.gone = true;
        }
    }

    Plane.prototype.move = function () {
        this.syncDistance();
        this.htmlNode.style[this.deriction] = this._distance + "px";
    }

    Plane.prototype.removePlane = function () {
        this.htmlNode.parentNode.removeChild(this.htmlNode);
    }


    window.Plane = Plane;

})();