var mymap = L.map(mapid, {scrollWheelZoom: false});
mymap.setView([38.894331,139.819382], 17)
L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
 attribution:
   '<a href="http://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
}).addTo(mymap);
