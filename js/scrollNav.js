/*
這段程式碼是在做即時監測網頁元素的可視性 (IntersectionObserver)。
它會在網頁載入時執行，並建立一個 IntersectionObserver 物件。


IntersectionObserver 物件會接收一個 callback 函式，
當監測的元素與網頁可視範圍有交集 (intersecting) 時，callback 函式就會被呼叫。
callback 函式會接收一個 entries 的陣列，每一個 entry 都代表監測的元素。

在 callback 函式中，透過迴圈遍歷每一個 entry，並判斷它們是否與網頁可視範圍有交集。
如果有，就給相對應的連結 (a 標籤) 的style新增 color :"var(--myWhite);還有transition:"0.3s\nease"
如果沒有，就改回原來的顏色

最後，透過 observe() 方法監測每一個 div 元素。
當這些 div 元素與網頁可視範圍有交集時，就會呼叫 callback 函式，並更新相對應的連結。
 */

window.addEventListener('load', () => {

  let lastPos = 0;
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('#header');

  //--------1. 判斷是否在header區---------------------------------
  const isHeader = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        navbar.style.opacity = "100%";
      } else {
        navbar.style.opacity = "0%";
        navbar.style.transition = "1.0s\nease";
      }
    })
  }
  let observer = new IntersectionObserver(isHeader);
  observer.observe(header);

  //--------2. 消失----------------------------------------------
  const navBlockText = document.querySelector('#navBlockText');

  document.addEventListener('scroll', function () {
    let currentPos = window.scrollY;
    //   往下滑
    if (currentPos > lastPos) {
      navBlockText.style.right = "-100px"; //讓nav bar消失
      navBlockText.style.transition = "1.0s\nease";
    } else {
      navBlockText.style.right = "22px"; //讓nav bar出現
      navBlockText.style.transition = "1.0s\nease";
    }
    lastPos = currentPos;//再記住現在位置，跟未來的位置做比較
  });


  //--------3. 點擊圖片時，收起或打開文字區--------------------------
  const imgBT = document.querySelector('#BackToTop');

  imgBT.addEventListener('click', function () {
    //如果現在是看得到文字的話，點一下可以來
    //如果是看不到文字的話，點一下可以打開

    //要小心，這裡需要確實轉換成int才能做比較！不然他會以為是字符串
    //navBlockText.style.right 的值是字符串，而不是數字
    if (parseInt(navBlockText.style.right, 10) > 0) {
      navBlockText.style.right = "-100px"; //讓nav bar消失
      navBlockText.style.transition = "1.0s\nease";
    } else {
      navBlockText.style.right = "22px"; //讓nav bar出現
      navBlockText.style.transition = "1.0s\nease";
    }
  });

  //--------4. 判斷是在哪一區，navbar就亮哪一區---------------------
  const observer02 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const a = document.querySelector(`[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        a.style.color = "var(--myWhite)";
        a.style.transition = "0.3s\nease";
      } else {
        a.style.color = "var(--myYellow)";
      }
      a.addEventListener('mouseover', function () {
        a.style.color = "var(--myLGreen)";
      });
      a.addEventListener('mouseout', function () {
        if (entry.isIntersecting) {a.style.color = "var(--myWhite)";} else {a.style.color = "var(--myYellow)"}
      });
    });
  }, {
    //當目標元素的可見度達到 40% 時才觸發 callback 函式。
    threshold: [0.4]
  });
  // 以此類推，監測其他 div
  const portfolio = document.querySelector('#portfolio');
  observer02.observe(portfolio);
  const process = document.querySelector('#process');
  observer02.observe(process);
  const problem = document.querySelector('#problem');
  observer02.observe(problem);
  const contactMe = document.querySelector('#contactMe');
  observer02.observe(contactMe);


});