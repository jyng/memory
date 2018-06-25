
//
// var socket = io.connect(window.location.origin);
//     socket.on('data', function(data) {
//         r = data.val;
//         console.log(r);
//     });
var r;
var socket = io.connect(window.location.origin);
socket.on('data',function(data) {
    r = data;
});
console.log(r);
