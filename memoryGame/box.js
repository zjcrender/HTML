/**
 * Created by Administrator on 2016/8/19 0019.
 */

window.game = window.game || {};

(function () {
    var nowNum = 1;

    // var cardPosition = { 0: };


    var container = document.createElement("div");
    container.className = "container";
    document.body.appendChild(container);

    function gameCard(num) {

        var selfNum = num;
        var card = document.createElement("div");
        card.className = "gamecard";
        card.innerHTML = selfNum;

        function cardPosition() {
            var x = Math.floor(Math.random() * 9) * 60;
            var y = Math.floor(Math.random() * 9) * 60;
            card.style.left = x + "px";
            card.style.top = y + "px";
        }

        cardPosition();

        card.onclick = function () {
            if (selfNum == nowNum) {
                nowNum++;
                card.style.display = "none";
            } else {
                alert("点错了");
            }
        }
        return card;
    }

    function gameStart() {
        var cards = document.getElementsByClassName("gamecard");
        cards[0].addEventListener("click", function () {
            for (var i = 0, j = cards.length; i < j; i++) {
                cards[i].innerHTML = "";
                cards[i].style.backgroundColor = "red";
            }
        })
    }

    function creatGameCard(num) {

        for (var i = 1; i < num; i++) {
            container.appendChild(gameCard(i));
        }
        var lastcard = gameCard(i);
        lastcard.addEventListener("click", function () {
            if (nowNum == num + 1) {
                alert("成功！")
            }
        });

        container.appendChild(lastcard);

        gameStart();

    }

    creatGameCard(9);

})();