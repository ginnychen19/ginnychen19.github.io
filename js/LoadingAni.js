import "https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.1.0/fontfaceobserver.standalone.js";
import "https://cdn.jsdelivr.net/npm/confetti-js@0.0.18/dist/index.min.js";
import "https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js";

var canvas1Settings = {
  target: 'canvas1',
  max: 150,
  size: 1.2,
  props: [
    'square',
    'triangle',
  ],
  colors: [[233, 224, 217], [254, 162, 32]],
  clock: 5,
  width: "1900",
  height: "1080",

  respawn: true
};

/* 取得圖片的載入進度 */
function Loadedprogress() {
  $(document).imagesLoaded()
    .done(function () {
      console.log('all images successfully loaded');
    })
    .progress(
      function (instance, image) {
      // 載入進度百分比
      var percentage = Math.round((instance.progressedCount / instance.images.length) * 100);
      // console.log(percentage + "%");
      var progresscolor = document.querySelector('div.progresscolor');
      var progressimg = document.querySelector('#progress>img');
      var adjustedPercentage = 100 - percentage;

      progresscolor.style.width = percentage + '%';
      progresscolor.innerHTML = percentage + '%';
      if (adjustedPercentage >= 8 && adjustedPercentage <= 95) {
        progressimg.style.right = adjustedPercentage + '%';
      }
    })
}

var font = new FontFaceObserver('GenJyuuGothic-B');
font.load().then(function () {
  console.log('GenJyuuGothic-B has loaded.');
});


$(document).ready(function () {
  // 使用 $.fn.imagesLoaded 方法確保所有圖片載入完成
        Loadedprogress();
        setTimeout(() => {
          $("#LoadingAni").fadeOut(500);
          var canvas1 = new ConfettiGenerator(canvas1Settings);
          canvas1.render();
        }, 2000);
      });




