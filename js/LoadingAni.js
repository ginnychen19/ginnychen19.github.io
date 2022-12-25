
/* 
const loadProgress = (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / window.performance.timing.loadEventEnd;
console.log(`Page load progress: ${loadProgress * 100}%`); 

*/
import '../confetti-js-master/src/confetti.js';
import "https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js";

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


/* function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-lazy="image.jpg"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-lazy');
        img.setAttribute('src', src);
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    observer.observe(img);
  });
}

lazyLoadImages(); */
//在 HTML 中，您可以將圖片的 src 屬性替換為 data-lazy 屬性，如下所示：
//</img>這樣，當圖片需要顯示時，JavaScript 代碼就會觸發 IntersectionObserver 並加載圖片。


/* 取得圖片的載入進度 */
function Loadedprogress() {
  $(document).imagesLoaded()
  .progress(function (instance, image) {
    // 載入進度百分比
    var percentage = Math.round((instance.progressedCount / instance.images.length) * 100);
    //console.log(percentage + "%");
    var progresscolor = document.querySelector('div.progresscolor');
    var progressimg = document.querySelector('#progress>img');
    var adjustedPercentage = 100-percentage;

    progresscolor.style.width = percentage + '%';
    progresscolor.innerHTML = percentage + '%';
    if(adjustedPercentage >= 8 && adjustedPercentage <= 95){
      progressimg.style.right = adjustedPercentage + '%';
    }
  })
}




$(document).ready(function () {
  // 使用 $.fn.imagesLoaded 方法確保所有圖片載入完成
  $(document).imagesLoaded(function () {
    Loadedprogress();
    setTimeout(() => {
      $("#LoadingAni").fadeOut(500);
      canvas1.render();
    }, 2000);
  });
});




