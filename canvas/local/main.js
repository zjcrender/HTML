/**
 * Created by REN on 2016/10/11.
 */

(function () {

    var canvas = document.querySelector("#canvas");
    var pen = canvas.getContext("2d");
    var ranges = document.querySelectorAll(".range");
    var view = document.querySelector("#view");
    localStorage.color = localStorage.color || "rgb(66,178,238)";
    pen.strokeStyle = localStorage.color;

    canvas.onmousedown = function (e) {
        pen.beginPath();
        pen.moveTo(e.offsetX,e.offsetY);

        canvas.onmousemove = function (ev) {
            pen.lineTo(ev.offsetX,ev.offsetY);
            pen.stroke();
        }

        document.onmouseup = function () {
            canvas.onmousemove = "";
            savePIC();
        }

    };

    function savePIC() {
        var PIC = canvas.toDataURL();
        localStorage.img = PIC;
    }

    document.querySelector("#clear").onclick = function () {
        pen.clearRect(0, 0, 400, 400);
        savePIC();
    };

    for (var i=0,j=ranges.length;i<j;i++) {
        ranges[i].index = i;
        ranges[i].oninput = function () {
            var color = getColor();
            localStorage["c"+this.index] = this.value;
            pen.strokeStyle = color;
            view.style.backgroundColor = color;
            localStorage.color = color;
        }
    }

    function getColor() {
        return "rgb("+ranges[0].value+","+ranges[1].value+","+ranges[2].value+")";
    }

    if (localStorage.img) {
        var img = document.createElement("img");
        img.src = localStorage.img;
        pen.drawImage(img, 0, 0, 400, 400);
        pen.strokeStyle = localStorage.color;
        view.style.backgroundColor = localStorage.color;
        for (var i=0,j=ranges.length;i<j;i++) {
            ranges[i].value = localStorage["c"+i];
        }
    }


})();