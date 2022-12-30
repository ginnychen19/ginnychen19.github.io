/* 
如果您希望在第一次按擊圖像時執行代碼，並在之後的按擊中不再執行，您可以使用以下方法：
  1.在代碼中定義一個全局變量，用於判斷是否為第一次按擊圖像。
  2.在 click 事件的回調函數中檢查該變量的值。如果變量的值為 true，則跳過代碼的執行；
    如果變量的值為 false，則執行代碼，並將變量的值設置為 true。
*/

const imgMyG = document.querySelector("#MyG");
const button01 = document.querySelector("button#ans01");
const button02 = document.querySelector("button#ans02");
var txt01 = '你準備好來玩猜數字小遊戲了嗎?';
var txt02 = '計時開始！請作答~';

//将 txt 数组作为参数传递给 typeWriter 函数
function typeWriter(txt, clear) {
    // 先清空原有的文本內容
    if (clear) {
        // 先清空原有的文本內容
        document.getElementById("dialogueText").innerHTML = "";
    }

    var thistxt = txt;
    var i = 0;
    var speed = 100;

    // 使用 setInterval 來循環輸出文字
    var interval = setInterval(function () {
        if (i < thistxt.length) {
            document.getElementById("dialogueText").innerHTML += thistxt.charAt(i);
            i++;
        } else {
            // 停止 setInterval
            clearInterval(interval);
            //這邊的else就是指，當我所有文字載入完，我的i > txt.length，就可以開始執行以下程式
            //用setTimeout是因為我希望這邊延遲出現
            setTimeout(() => {
                document.querySelector(".ans").style.display = "block";

                button01.innerHTML = "我準備好了！";
                button02.innerHTML = "";
            }, 800);
        }
    }, speed);
}

function talk(thistxt) {
    setTimeout(() => {
        document.querySelector(".dialogue").style.display = "block";
        typeWriter(thistxt);
    }, 500);
}

talk(txt01);

// 為按鈕添加事件處理器
//我可以判定如果對話是哪個「編號」就執行哪個動作或連接到哪裡
button01.addEventListener("click", function () {
});


button02.addEventListener("click", function () {
    typeWriter(txt02, true);
});

