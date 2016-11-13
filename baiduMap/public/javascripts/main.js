/**
 * Created by REN on 2016/10/27.
 */

//异步加载百度地图
function loadBaiduMap() {
    function setScript(src) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        document.body.appendChild(script);
    }
    setScript("http://api.map.baidu.com/api?v=2.0&ak=zzdU1WVvahIRMaFG3PY6dYVCk7gK3Dnd&callback=showMap");
    setScript("http://api.map.baidu.com/library/DistanceTool/1.2/src/DistanceTool_min.js");
}

function showMap() {
    //初始化参数
    var map = new BMap.Map("mapContent");
    map.addControl(new BMap.MapTypeControl());
    map.enableScrollWheelZoom();
    map.centerAndZoom("杭州", 15);
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
    var top_left_navigation = new BMap.NavigationControl();
    map.addControl(top_left_control);
    map.addControl(top_left_navigation);

    //添加标记
    function setMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    }

    //自动返回   太SB了 先注释掉
    // var id = -1,myCurPosition;
    // document.getElementById("mapContent").onmouseup = function () {
    //     id && clearTimeout(id);
    //     id = setTimeout(function () {
    //         map.clearOverlays();
    //         if (myCurPosition) {
    //             map.panTo(myCurPosition);
    //             setMarker(myCurPosition);
    //         }else {
    //             getMyLocation();
    //         }
    //     }, 3000);
    // }

    //--------------------------------------------设置搜索--------------------------------------------------

    //格式化数据
    function formatData(data) {
        return data.item.value.province + data.item.value.city + data.item.value.district + data.item.value.street + data.item.value.business;
    }

    //设置位置及智能搜索
    function setPlaceAndSearch(data) {
        map.clearOverlays();
        var local = new BMap.LocalSearch(map, {
            onSearchComplete: function () {
                var point = local.getResults().getPoi(0).point;
                map.centerAndZoom(point, 18);
                setMarker(point);
            }
        });
        local.search(data);
    }

    //自动完成配置
    var completeSetting = {
        input: "suggestId",
        location: map
    }

    //设置自动完成
    var autoComplete = new BMap.Autocomplete(completeSetting);
    autoComplete.addEventListener("onconfirm", function (e) {
        setPlaceAndSearch(formatData(e));
    })

    //--------------------------------------------设置定位--------------------------------------------------
    function getMyLocation() {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (location) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var point = new BMap.Point(location.point.lng, location.point.lat);
                myCurPosition = point;
                map.centerAndZoom(point, 18);
                map.clearOverlays();
                setMarker(point);
            }
            else {
                alert('failed' + this.getStatus());
            }
        }, {enableHighAccuracy: true})
    }

    document.getElementById("myLocation").onclick = getMyLocation;

    //--------------------------------------------测量距离--------------------------------------------------
    var myDis = new BMapLib.DistanceTool(map);
    document.getElementById("getDistance").onclick = function () {
        myDis.open();
    };

    //--------------------------------------------导航--------------------------------------------------
    var psArr = [], curNum = 0;
    map.addEventListener("click", function (e) {
        var point = new BMap.Point(e.point.lng, e.point.lat);
        var marker = new BMap.Marker(point);
        psArr[curNum] && map.removeOverlay(psArr[curNum]);
        psArr[curNum] = marker;
        map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);

        curNum = ++curNum % 2;
    });

    document.getElementById("getRol").onclick = function () {
        if (!psArr[0] || !psArr[1]) {
            alert("请先选取两个坐标点再查询！");
            return;
        }
        var p1 = new BMap.Point(psArr[0].point.lng, psArr[0].point.lat);
        var p2 = new BMap.Point(psArr[1].point.lng, psArr[1].point.lat);
        var options = {
            renderOptions: {
                map: map,
                panel: "resultBox"
            }
        },transit;

        switch (document.getElementById("plan").value) {
            case "0":
                transit = new BMap.WalkingRoute(map, options);
                break;
            case "1":
                transit = new BMap.TransitRoute(map, options);
                break;
            case "2":
                transit = new BMap.DrivingRoute(map, options);
                break;
        }

        map.clearOverlays();
        transit.search(p1, p2);
        psArr = [],curNum=0;
    }

}


window.onload = loadBaiduMap;

