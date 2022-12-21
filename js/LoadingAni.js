
/* 
const loadProgress = (window.performance.timing.loadEventEnd - window.performance.timing.navigationStart) / window.performance.timing.loadEventEnd;
console.log(`Page load progress: ${loadProgress * 100}%`); 

*/


$(document).ready(function(){
  setTimeout(() => {
    $("#LoadingAni").fadeOut(500);
  },3000);
  
});




