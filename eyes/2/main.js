/**
 * Created by Administrator on 2016/8/9 0009.
 */


(function () {

    var face = document.getElementsByClassName("face");
    var eye = document.getElementsByClassName("eye");
    var eyeLength = eye.length;

    function getElementCenterPositionX(Element) {
        var PositionX = Element.offsetLeft+Element.offsetWidth/2;
        var Parent = Element.offsetParent;
        while (Parent != null) {
            PositionX += Parent.offsetLeft;
            Parent = Parent.offsetParent;
        }
        return PositionX;
    }

    function getElementCenterPositionY(Element) {
        var PositionY = Element.offsetTop+Element.offsetHeight/2;
        var Parent = Element.offsetParent;
        while (Parent != null) {
            PositionY += Parent.offsetTop;
            Parent = Parent.offsetParent;
        }
        return PositionY;
    }

    function createEyeBell() {
        for(var i=0; i<eyeLength;i++) {
            var EyeBell = document.createElement("div");
            eye[i].appendChild(EyeBell);
            EyeBell.className="EyeBell";
            EyeBellStyle(EyeBell);
        }
    }

    function EyeBellStyle(EyeBell) {
        EyeBell.style.width="20px";
        EyeBell.style.height="20px";
        EyeBell.style.borderRadius="50%";
        EyeBell.style.backgroundColor="black";
        EyeBell.style.position="absolute";
        EyeBell.style.left="20px";
        EyeBell.style.top="20px";
    }

    function MouseMove(event) {
        var event = event || window.event;

        function getAngle(Element) {
            var dx=getElementCenterPositionX(Element)-event.pageX;
            var dy=getElementCenterPositionY(Element)-event.pageY;
            return Math.atan2(dx,dy);
        }

        function EyeBellNewPositionX(EyeBell) {
            var R = EyeBell.offsetParent.clientWidth/2-EyeBell.clientWidth/2;
            var X = R-R*Math.sin(getAngle(EyeBell));
            return X;
        }

        function EyeBellNewPositionY(EyeBell) {
            var R = EyeBell.offsetParent.clientHeight/2-EyeBell.clientHeight/2-5;
            var Y = R+5-R*Math.cos(getAngle(EyeBell));
            return Y;
        }

        var EyeBell = document.getElementsByClassName("EyeBell");
        var EyeBellLength = EyeBell.length;
        for (var j=0;j<EyeBellLength;j++) {
            EyeBell[j].style.left=EyeBellNewPositionX(EyeBell[j])+"px";
            EyeBell[j].style.top=EyeBellNewPositionY(EyeBell[j])+"px";
        }
    }

    createEyeBell();

    window.onmousemove = MouseMove;


})();