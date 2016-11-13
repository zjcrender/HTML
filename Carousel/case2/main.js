/**
 * Created by REN on 2016/9/22.
 */

(function () {

    var container = document.querySelector("#container");
    var contentArr = document.querySelectorAll(".content");
    var pre = document.querySelector("#pre");
    var next = document.querySelector("#next");
    var tab = document.querySelectorAll("span");
    var preDivArr = [], newDivArr = [];
    var imgArr = ["url('img/lb-1.jpg')", "url('img/lb-2.jpg')", "url('img/lb-3.jpg')", "url('img/lb-4.jpg')"];
    var ctDEG = 0, index = 0, doneNum = 0, isPlay = false, id;

    //添加事件
    function addListener() {
        //为content添加完成动画事件
        for (var i = 0; i < 30; i++) {
            contentArr[i].addEventListener("transitionend", function () {
                doneNum++;
                if (doneNum == 30) {
                    doneNum = 0;
                    removePre();
                    isPlay = false;
                }
            });
        }
        //点击显示前一张
        pre.onclick = function () {
            autoPlay();
            play(index - 1);
        }
        //点击显示下一张
        next.onclick = function () {
            autoPlay();
            play(index + 1);
        }
        //点击显示对应图片
        for (var i = 0, j = tab.length; i < j; i++) {
            tab[i].onclick = function () {
                autoPlay();
                play(parseInt(this.innerHTML) - 1);
            }
        }
    }

    //动态创建新图
    function setNewPIC(n, UpDown) {
        var thisDEG;
        n %= 4;
        UpDown === "up" && (thisDEG = -ctDEG + 90);
        UpDown === "down" && (thisDEG = -ctDEG - 90);
        for (var i = 0; i < 30; i++) {
            var div = document.createElement("div");
            preDivArr[i] = newDivArr[i];
            newDivArr[i] = div;
            div.style.backgroundImage = imgArr[n];
            div.style.backgroundPosition = -26 * i + "px 0px";
            div.style.transform = "rotateX(" + thisDEG + "deg)";
            contentArr[i].appendChild(div);
        }
    }

    //轮播图切图函数
    function play(n) {
        if (!isPlay) {
            isPlay = true;
            if (n === index) {
                return;
            } else if (n > index) {
                setNewPIC(n, "down");
                ctDEG += 90;
            } else {
                n === -1 && (n = 3);
                setNewPIC(n, "up");
                ctDEG -= 90;
            }
            index = n;
            for (var i = 0; i < 30; i++) {
                (function (i) {
                    setTimeout(function () {
                        contentArr[i].style.transform = "rotateX(" + ctDEG + "deg)";
                    }, i * 30)
                })(i);
            }
        }
    }

    //动态删除上一张
    function removePre() {
        for (var i = 0; i < 30; i++) {
            contentArr[i].removeChild(preDivArr[i]);
            contentArr[i] = newDivArr[i];
        }
    }

    //自动播放及重置定时器
    function autoPlay() {
        id && clearInterval(id);
        id = setInterval(function () {
            play(index + 1);
        }, 5000)
    }

    //初始化函数
    function init() {
        setNewPIC(0);
        addListener();
        autoPlay();
    }

    init();

})();