/**
 * Created by REN on 2016/9/13.
 */
(function () {

    var width = 260;
    var height= 260;
    var dot = {
        x : width / 2,
        y : height / 2,
        radius : 6
    };
    var radius = 120;
    var borderWidth = 6;


    var clock = document.getElementById('clock');
    var clockBg = document.createElement('canvas');
    var clockPointers = document.createElement('canvas');

    clockPointers.width = clockBg.width = width;
    clockPointers.height = clockBg.height = height;
    clockPointers.style.position = 'absolute';
    clockPointers.style.left = 0;
    clockPointers.style.right = 0;

    clock.appendChild(clockBg);
    clock.appendChild(clockPointers);

    var bgCtx = clockBg.getContext('2d');

    bgCtx.beginPath();
    bgCtx.lineWidth = borderWidth;
    bgCtx.strokeStyle = "#83fcd8";
    bgCtx.arc(dot.x, dot.y, radius, 0, 2 * Math.PI, true);
    bgCtx.stroke();
    bgCtx.closePath();

    bgCtx.beginPath();
    bgCtx.fillStyle = 'greenyellow';
    bgCtx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, true);
    bgCtx.fill();
    bgCtx.closePath();



    for (var i = 0, angle = 0, tmp, len; i < 60; i++) {
        bgCtx.beginPath();

        if ( i % 5 === 0 ) {
            bgCtx.lineWidth = 5;
            len = 12;
            bgCtx.strokeStyle = "#6be";
        } else {
            bgCtx.lineWidth = 2;
            len = 6;
            bgCtx.strokeStyle ="#b8f788";
        }

        tmp = radius - borderWidth / 2;
        bgCtx.moveTo(
            dot.x + tmp * Math.cos(angle),
            dot.y + tmp * Math.sin(angle)
        );
        tmp -= len;
        bgCtx.lineTo(dot.x + tmp * Math.cos(angle), dot.y + tmp * Math.sin(angle));
        bgCtx.stroke();
        bgCtx.closePath();

        angle += Math.PI / 30; // 每次递增1/30π
    }

    var ptCtx = clockPointers.getContext('2d');

    function updatePointers() {
        ptCtx.clearRect(0, 0, width, height);　

        // 获取当前时间
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();

        // 算出时分秒指针现在应指向圆的几分之几处
        h = h > 12 ? h - 12 : h;
        h = h + m / 60;
        h = h / 12;
        m = m / 60;
        s = s / 60;

        drawPointers(h, 6, 65,"#f29f3f"); // 画时针
        drawPointers(m, 4, 82,"#ffe957"); // 画分针
        drawPointers(s, 2, 92,"#f2b6b6"); // 画秒针
    }

    // angle是角度，lineWidth是指针宽度，length是指针长度
    function drawPointers(angle, lineWidth, length,color) {
        angle = angle * Math.PI * 2 - Math.PI / 2;

        ptCtx.beginPath();
        ptCtx.strokeStyle = color;
        ptCtx.lineWidth = lineWidth;
        ptCtx.moveTo(dot.x, dot.y);
        ptCtx.lineTo(dot.x + length * Math.cos(angle), dot.y + length * Math.sin(angle));
        ptCtx.stroke();
        ptCtx.closePath();
    }

    setInterval(updatePointers, 1000);
    updatePointers();




    //["#6be","#f2b6b6","#ffe957","#f29f3f","#bdb76a","#ffe957","#83fcd8","#61ff69","#b8f788","#000"];
})();