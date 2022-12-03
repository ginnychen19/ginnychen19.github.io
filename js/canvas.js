import "./confetti-js-master/dist/index.min.js";

var canvas1Settings = {
    target: 'canvas1',
    max: 300,
    size: 0.6,
    props: ['square',
        'triangle',
        { 'type': 'svg', 'src': 'img/svg/Weed_dark.svg' },
    ],
    colors: [[233, 224, 217], [254, 162, 32], [110, 149, 76]],
    clock: 3
};
var canvas1 = new ConfettiGenerator(canvas1Settings);
canvas1.render();
