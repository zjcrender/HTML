/**
 * Created by REN on 2016/8/24 0024.
 */

(function () {

    var container = document.querySelector("#container");
    var gun = new Gun();
    var bullentArr = [];
    var planArr = [];
    container.appendChild(gun.htmlNode);

    document.addEventListener("keydown", function (event) {
        if (event.keyCode == 32) {
            var x = parseInt(gun.htmlNode.style.left) + 23;
            var bullent = new Bullet(x);
            bullentArr.push(bullent);
            container.appendChild(bullent.htmlNode);
        }
        if (event.keyCode == 37) gun.moveToLeft();
        if (event.keyCode == 39) gun.moveToRight();
    })




    setInterval(function () {
        for (var i = 0; i < bullentArr.length; i++) {
            if (bullentArr[i].gone) {
                bullentArr[i].removeBullet();
                bullentArr.splice(i, 1);
            }
            if (bullentArr.length>0)
                bullentArr[i].shoot();
        }
    }, 20);

    setInterval(function () {
        var randomNum = Math.floor(Math.random()*5);
        var plane = new Plane(randomNum,randomNum%2);
        planArr.push(plane);
        container.appendChild(plane.htmlNode);
    },1500)
    
    setInterval(function () {
        for (var i = 0;i<planArr.length;i++) {
                planArr[i].move();
            if (planArr[i].gone) {
                planArr[i].removePlane();
                planArr.splice(i,1);
            }
        }
    },20)

    setInterval(function () {

        for (var i=0;i<bullentArr.length;i++) {
            for (var j=0;j<planArr.length;j++) {
                if ((bullentArr[i].htmlNode.offsetLeft>=planArr[j].htmlNode.offsetLeft &&
                    bullentArr[i].htmlNode.offsetLeft<=planArr[j].htmlNode.offsetLeft+70)&&
                    (bullentArr[i].htmlNode.offsetTop>=planArr[j].htmlNode.offsetTop &&
                    bullentArr[i].htmlNode.offsetTop<=planArr[j].htmlNode.offsetTop + 30)) {
                    bullentArr[i].htmlNode.style.display="none";
                    planArr[j].htmlNode.style.display="none";
                }
            }
        }

    },20)

})();