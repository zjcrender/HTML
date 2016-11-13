/**
 * Created by Administrator on 2016/8/15 0015.
 */

(function () {

    var player = document.getElementById("music");
    var lrcbox = document.getElementById("lrc");
    var obj = {};

    $.get("BlurredLines.lrc").done(function (data) {
        var content, time, word;
        var p = /\[(\d+):(\d+)\.\d+\](.+)/g

        while (true) {
            content = p.exec(data);
            if (content) {
                time = content[1] * 60 + content[2] * 1;
                word = content[3];
                obj[time] = word;
            } else {
                break;
            }
        }
    })

    function judge(obj) {
        for (var x in obj) {
            return true;
        }
        return false;
    }

    var id = setInterval(function () {
        var playtime = Math.floor(player.currentTime);
        if (judge(obj)) {
            if (obj[playtime]) {
                lrcbox.innerHTML = obj[playtime];
                delete obj[playtime];
            }
        } else {
            clearInterval(id);
            lrcbox.innerHTML = "播放完毕";
        }
    }, 500)

    // console.log(obj);


})();