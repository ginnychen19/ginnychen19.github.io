/* 
如果您希望在第一次按擊圖像時執行代碼，並在之後的按擊中不再執行，您可以使用以下方法：
  1.在代碼中定義一個全局變量，用於判斷是否為第一次按擊圖像。
  2.在 click 事件的回調函數中檢查該變量的值。如果變量的值為 true，則跳過代碼的執行；
    如果變量的值為 false，則執行代碼，並將變量的值設置為 true。
*/
imgMyG = document.querySelector("#MyG");

var firstClick = true;

imgMyG.addEventListener('click', function () {
    if (!firstClick) return; // 如果不是第一次按擊，則退出函數

    firstClick = false;
    var i = 0;
    var txt = '歡迎呀，想知道什麼資訊呢?';
    var speed = 100;

    document.querySelector(".dialogue").style.display = "block";

    function typeWriter() {
        if (i < txt.length) {
            document.getElementById("dialogueText").innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            //這邊的else就是指，當我所有文字載入完，我的i > txt.length，就可以開始執行以下程式
            document.querySelector(".ans").style.display = "block";

            const button01 = document.querySelector("button#ans01");
            const button02 = document.querySelector("button#ans02");
            const ahref01 = document.querySelector("a#ans01");
            const ahref02 = document.querySelector("a#ans02");
            
            button01.innerHTML = "我想委託~";
            button02.innerHTML = "我想玩遊戲！";

            
            // 為按鈕添加事件處理器
            //我可以判定如果對話是哪個「編號」就執行哪個動作或連接到哪裡
            button01.addEventListener('click', function () {
                ahref01.href = "https://www.facebook.com/";      
            });
            button02.addEventListener('click', function () {
                ahref02.href = "https://www.instagram.com/ginnychen19/";
            }); 

            /* // 創建按鈕
            const button1 = document.createElement('button');
            const button2 = document.createElement('button');
            // 設定按鈕文字
            button1.textContent = '我想委託~';
            button2.textContent = '我想玩遊戲！';

            // 將按鈕將按鈕加入到文本的父元素中
            const textParent = document.getElementById('dialogueText').parentNode;
            textParent.appendChild(button1);
            textParent.appendChild(button2);

            // 為按鈕添加事件處理器
            button1.addEventListener('click', function () {
                // 按鈕 1 的事件處理器
            });
            button2.addEventListener('click', function () {
                // 按鈕 2 的事件處理器
            }); 

            */
        }
    }
    typeWriter();
});










