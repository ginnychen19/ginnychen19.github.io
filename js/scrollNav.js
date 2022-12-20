let lastPos = 0;
const navbar = document.querySelector('.navbar');
const header = document.querySelector('#header');

// 1. 消失
document.addEventListener('scroll',function(){
let currentPos =  window.scrollY;
//   往下滑
if (currentPos > lastPos) {
    navbar.style.right = "-180px"; //讓nav bar消失
    navbar.style.transition = "1.0s\nease"; 
} else {
    navbar.style.right = "0px"; //讓nav bar出現
    navbar.style.transition = "1.0s\nease"; 
}
lastPos = currentPos;//再記住現在位置，跟未來的位置做比較
});

// 2. 判斷是否在header區
const isHeader = (entries, observer) =>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting){
        navbar.style.opacity = "100%";
    }else{
        navbar.style.opacity = "0%";
        navbar.style.transition = "1.0s\nease"; 
    }
  })
  
}

let observer = new IntersectionObserver(isHeader);
observer.observe(header);