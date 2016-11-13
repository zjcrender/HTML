/**
 * Created by REN on 2016/10/10.
 */

(function () {

    var canvas = document.querySelector("#canvas");
    var avatar = document.querySelector("#canvasAvatar");
    var head = document.querySelector("#head");
    var pen1 = canvas.getContext("2d");
    var pen2 = avatar.getContext("2d");
    var pen3 = head.getContext("2d");
    var video, id, PIC, isOpen = false;
    var maskX = 200, maskY = 100;
    pen2.globalAlpha = 0.4;


    function createVideoTag() {
        video = document.createElement("video");
        video.autoplay = true;
    }

    function getVideoDevices() {
        navigator.mediaDevices.getUserMedia({
            audio: false, video: true
        }).then(function (result) {
            video.srcObject = result;
        }).catch(function (err) {
            console.log(err);
        })
    }

    function render() {
        pen1.drawImage(video, 0, 0);

        id = requestAnimationFrame(render);
    }

    function addLisitners() {
        document.querySelector("#getVideo").addEventListener("click", function () {
            pen2.clearRect(0, 0, 600, 400);
            startVideo();
        });

        document.querySelector("#getIMG").addEventListener("click", function () {
            cancelAnimationFrame(id);
            isOpen = false;
            PIC = pen1.getImageData(0, 0, 600, 400);
            setMask(maskX, maskY);
            pen3.putImageData(PIC,-maskX,-maskY);
        })

        avatar.addEventListener("mousedown", function (e) {
            if (!isOpen) {
                var startX = e.offsetX, startY = e.offsetY;
                if (startX >= maskX && startX <= maskX + 200 && startY >= maskY && startY <= maskY + 200) {
                    avatar.onmousemove = function (ev) {
                        var dx = startX - ev.offsetX, dy = startY - ev.offsetY;
                        var nx = maskX - dx,ny = maskY - dy;
                        nx < 0 && (nx=0);nx>400&&(nx = 400);
                        ny < 0 && (ny=0);ny>200&&(ny = 200);
                        setMask(nx, ny);
                        pen3.clearRect(0, 0, 200, 200);
                        pen3.putImageData(PIC,-nx,-ny);
                        avatar.onmouseup = function () {
                            avatar.onmousemove = "";
                            maskX -= dx, maskY -= dy;
                            dx=dy=0;
                        }
                    }
                }
            }
        })

    }

    function startVideo() {
        if (!isOpen) {
            isOpen = true;
            getVideoDevices();
            render();
        }
    }

    //默认200x200
    function setMask(x, y) {
        pen2.clearRect(0, 0, 600, 400);
        pen2.fillRect(0, 0, 600, 400);
        pen2.clearRect(x, y, 200, 200);
    }


    function init() {
        createVideoTag();
        addLisitners();

    }

    init();


})();