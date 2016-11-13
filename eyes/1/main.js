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
            return -Math.atan2(dx,dy)*180/Math.PI;
        }


        var EyeBell = document.getElementsByClassName("EyeBell");
        var EyeBellLength = EyeBell.length;
        for (j=0;j<EyeBellLength;j++) {
            EyeBell[j].style.top="5px";
        }
        for(var i=0;i<eye.length;i++) {
            var angel = getAngle(eye[i]);
            eye[i].style.transform="rotate("+angel+"deg)";
        }
    }

    createEyeBell();

    window.onmousemove = MouseMove;


})();