/**
 * Created by REN on 2016/10/10.
 */
(function () {
    var canvas = document.querySelector("#canvas");
    var pen = canvas.getContext("2d");
    var video;

    function loadVideo() {
        video = document.createElement("video");
        video.autoplay = true;
        video.src = "video.mp4";
    }

    function render() {
        pen.drawImage(video, 0, 0);
        requestAnimationFrame(render);
    }

    function init() {
        loadVideo();
        render();
    }
    init();



})();