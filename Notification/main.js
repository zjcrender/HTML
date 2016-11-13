/**
 * Created by REN on 2016/10/28.
 */

(function () {

    if (Notification) {
        if (Notification.permission == "default") {
            Notification.requestPermission(function (status) {
                Notification.permission = status;
            });
        }else if(Notification.permission == "granted") {

            var config = {
                body: "明天周末！",
                dir:"rtl"
            };
            var not = new Notification("Title", config);

            not.onclick = function () {
                this.close();
            }





        }else if (Notification.permission == "denied") {
            alert("您拒绝了弹出通知！");
        }else {
            console.log("WTF?!!?");
        }
    }else {
        alert("不支持通知！");
    }


})();