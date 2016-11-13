/**
 * Created by REN on 2016/8/24 0024.
 */

(function () {

    function Gun() {
        this._htmlNode = document.createElement("div");
        this._htmlNode.className = "gun";
        this._htmlNode.style.left = 250 + "px";
        this._x = 250;
    }

    Object.defineProperty(Gun.prototype, "htmlNode", {
        get: function () {
            return this._htmlNode;
        }
    });
    Object.defineProperty(Gun.prototype, "x", {
        set: function (value) {
            this._x = value;
        },
        get: function () {
            return this._x;
        }
    });

    Gun.prototype.moveToLeft = function () {
        if (this.x > 0) {
            this.x -= 5;
            this.htmlNode.style.left = this.x + "px";
        }
    }

    Gun.prototype.moveToRight = function () {
        if (this.x < 500) {
            this.x += 5;
            this.htmlNode.style.left = this.x + "px";
        }
    }

    window.Gun = Gun;

})();