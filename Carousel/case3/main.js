/**
 * Created by REN on 2016/9/20.
 */

(function () {

    var divs1 = document.querySelectorAll("#container .content1 div");
    var divs2 = document.querySelectorAll("#container .content2 div");
    console.log(divs1);

    for (var i=0,j=divs1.length;i<j;i++) {
        (function (i) {
            setTimeout(function () {
                divs1[i].style.transform = "rotateY(104.03deg)";
                divs1[i].style.opacity = 0;
                setTimeout(function () {
                    divs2[i].style.transform = "rotateY(0deg)";
                    divs2[i].style.opacity = 1;
                },370)
            },80*i)
        })(i)
    }





    var thistan = 85/340;
    var rad = Math.atan(thistan);

    console.log(rad*180/Math.PI+90);





})();