
/* 
const loadProgress = (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / window.performance.timing.loadEventEnd;
console.log(`Page load progress: ${loadProgress * 100}%`); 

*/
import '../confetti-js-master/src/confetti.js';

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


$(document).ready(function () {
  setTimeout(() => {
    $("#LoadingAni").fadeOut(500);
    canvas1.render();  
  }, 5000);  
});




