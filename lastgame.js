var have = 0;
var hint = [
    [38.894089,139.819286],
    [38.893605,139.819195],
    [38.893045,139.819120],
    [38.893004,139.819710],
    [38.892536,139.819731],
    [38.892820,139.818615]
];
/*
var marker1 = hint[0],marker2 = hint[1],marker3 = hint[2],marker4 = hint[3],marker5 = hint[4],marker6 = hint[5];
var mopt = {title: "ヒント"};
var m1 = L.marker(marker1,mopt).addTo(mymap);
var m2 = L.marker(marker2,mopt).addTo(mymap);
var m3 = L.marker(marker3,mopt).addTo(mymap);
var m4 = L.marker(marker4,mopt).addTo(mymap);
var m5 = L.marker(marker5,mopt).addTo(mymap);
var m6 = L.marker(marker6,mopt).addTo(mymap);
*/

var date = null;
var daitai = [38.892774,139.819248];
var point = [38.892594,139.819152];

//var m7 = L.marker(point,mopt).addTo(mymap);

var gpsmarker = L.marker(mymap.getCenter()).addTo(mymap);
gpsmarker.bindPopup("捕捉中...").openPopup();

var maxTrial = 100;
var watchId = null;             // 最初はnullにしておく
function tryWatchGPS() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
    watchId = navigator.geolocation.watchPosition(
        onSuccess, onError, {
            maximumAge: 0, timeout: 10000, enableHighAccuracy: true
        });
    alert("Start!");
}
function onSuccess(pos) {
    var latlng = L.latLng([pos.coords.latitude, pos.coords.longitude]);
    mymap.panTo(latlng);
    var lie = latlng.distanceTo(daitai);
    var hint1 = latlng.distanceTo(hint[0]);
    var hint2 = latlng.distanceTo(hint[1]);
    var hint3 = latlng.distanceTo(hint[2]);
    var hint4 = latlng.distanceTo(hint[3]);
    var hint5 = latlng.distanceTo(hint[4]);
    var hint6 = latlng.distanceTo(hint[5]);
    var dist = latlng.distanceTo(point);

    if(hint1 <= 10){
        info.innerHTML = "広いなぁ";
        have = have + 1;
    }else if(hint2 <= 10){
        info.innerHTML = "クルマが走っている";
    }else if(hint3 <= 10){
        info.innerHTML = "あっち";
    }else if(hint4 <= 10){
        info.innerHTML = "近い！";
    }else if(hint5 <= 10){
        info.innerHTML = "これはホール？";
        have = have + 1;
    }else if(hint6 <= 10){
        info.innerHTML = "あれ？";
        have = have + 1;
    }
    else if (dist <= 10){
        if (have <= 1){
            var leftBottom = [0, 0], rightTop = [0.002, 0.003];
            mymap.setMaxBounds([leftBottom, rightTop]);
            var imageUrl = 'src/otakara.png',
                imageBounds = [leftBottom, rightTop];
            L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

            if (date != null){
                info.innerHTML = "お宝";
            }else{
                info.innerHTML = "見つかった。";
                sessionStorage.setItem('key','exsist');
                date = sessionStorage.getItem('key');
            }
        }else if(have == 2){
            var leftBottom = [0, 0], rightTop = [0.002, 0.003];
            mymap.setMaxBounds([leftBottom, rightTop]);
            var imageUrl = 'src/hihou.png',
                imageBounds = [leftBottom, rightTop];
            L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

            if (date != null){
                info.innerHTML = "おしまい";
            }else{
                info.innerHTML = "見つかった。";
                sessionStorage.setItem('key','exsist');
                date = sessionStorage.getItem('key');
            }
        }else{
            var leftBottom = [0, 0], rightTop = [0.002, 0.003];
            mymap.setMaxBounds([leftBottom, rightTop]);
            var imageUrl = 'src/black parl.png',
                imageBounds = [leftBottom, rightTop];
            L.imageOverlay(imageUrl, imageBounds).addTo(mymap);

            if (date != null){
                info.innerHTML = "おしまい";
            }else{
                info.innerHTML = "見つかった。";
                sessionStorage.setItem('key','exsist');
                date = sessionStorage.getItem('key');
            }
        }
    }
    else{
        info.innerHTML = lie;  //距離を出すかまよう
    }

    gpsmarker.setPopupContent(
        "ここは "+latlng+"です."
    ).openPopup().setLatLng(latlng);
}
function onError(err) {
    restN = "あと"+(--maxTrial)+"回試行します。";
    gpsmarker.setPopupContent("捕捉失敗:"+restN).openPopup();
    if (maxTrial <= 0) {
            navigator.geolocation.clearWatch(watchId);
    }
}
function stoptryWatchGPS() {
    navigator.geolocation.clearWatch(watchId);
    gpsmarker.setPopupContent(
        "おしまいです."
    ).openPopup();
    alert("Stop!");
}



document.getElementById("start").addEventListener("click", function(){
    tryWatchGPS();
});

document.getElementById("stop").addEventListener("click", function(){
        stoptryWatchGPS();
});

document.getElementById("again").addEventListener("click",function(){
    date =null;
});
