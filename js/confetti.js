/* 
const Wheight = window.innerHeight;
alert(Wheight) 
*/


var Weed = "img/svg/Weed_dark.svg";
var canvas1Settings = {
    target: 'canvas1',
    max: 150,
    size: 1.2,
    props: ['square',
        'triangle',
        { 'type': 'svg', 'src': 'img/svg/WdDark.svg' },
    ],
    colors: [[233, 224, 217], [254, 162, 32], [110, 149, 76]],
    clock: 5,
    width: "1900",
    height: "1080",

    respawn: true
};
var canvas1 = new ConfettiGenerator(canvas1Settings);

window.onload = function () {
    canvas1.render();
};            