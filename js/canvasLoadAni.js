/* const canvasLoadAni = document.getElementById('canvasLoadAni');

const ctx = canvasLoadAni.getContext('2d');

const imageWidth = 10; // 圖像的寬度，單位為公分
const imageHeight = 10; // 圖像的高度，單位為公分
const imageSpacing = 7; // 圖像之間的距離，單位為公分
const imageColumn = 10 // 圖像要有幾列
const imageRow = 20 // 圖像要有幾行

const imgMain = new Image();
imgMain.src = "./img/svg/WdDark.svg";

imgMain.onload=function(){  
  
  for (let i = 0; i < imageColumn; i++) {
    for (let j = 0; j < imageRow; j++) {
      let x = j * (imageWidth + imageSpacing);
      let y = i * (imageHeight + imageSpacing);
      ctx.drawImage(imgMain, x, y, imageWidth, imageHeight);
    }
  }
} */
import '../confetti-js-master/src/confetti.js';

var canvasLoadAniSettings = {
    target: 'canvasLoadAni',
    max: 25,
    size: 3,
    
    props: [
        { 'type': 'svg', 'src': 'img/svg/WdDark.svg' },
    ],
    colors: [[233, 224, 217], [254, 162, 32], [110, 149, 76]],
    clock: 5,
    width: "1900",
    height: "1080",
    rotate:true,
   
    respawn: true,
};
var canvasLoadAni = new ConfettiGenerator(canvasLoadAniSettings);

window.onload = function () {
  canvasLoadAni.render();
};   