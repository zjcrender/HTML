/**
 * Created by REN on 2016/8/24 0024.
 */

(function () {

    function Bullet(x) {
        this._htmlNode = document.createElement("div");
        this.htmlNode.className = "bullet";
        this.htmlNode.style.left = x + "px";
        this._bulletHeight = 50;
        this.gone = false;
    }

    Object.defineProperty(Bullet.prototype, "htmlNode", {
        get: function () {
            return this._htmlNode;
        }
    });

    Object.defineProperty(Bullet.prototype, "bulletHeight", {
        set: function (value) {
            this._bulletHeight = value;
        },
        get: function () {
            return this._bulletHeight;
        }
    });

    Bullet.prototype.shoot = function () {
        this.bulletHeight += 5;
        this.htmlNode.style.bottom = this.bulletHeight + "px";
        if (this.bulletHeight>400) {
            this.gone=true;
        }
    }

    Bullet.prototype.removeBullet = function () {
        this.htmlNode.parentNode.removeChild(this.htmlNode);
    }



    window.Bullet = Bullet;

})();