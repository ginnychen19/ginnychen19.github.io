/*
setvalue 函數會在遊戲開始時隨機生成 4 個不重複的數字，然後將這些數字顯示在網頁上。
setfinal 函數則是用於在玩家猜對答案時顯示提示信息。
myTimer 函數則是用於每秒計時的計時器功能。

在程式的最後，通過綁定按鈕的 onclick 事件來實現不同的操作：
點擊 "開始遊戲" 按鈕時，會啟動計時器並隨機生成答案。
點擊 "看答案" 按鈕時，會在彈出對話框中顯示答案。
點擊 "放棄重來" 按鈕時，會重新加載頁面。
點擊 "檢查答案" 按鈕時，會檢查玩家輸入的答案是否正確，並在網頁上顯示相應的提示信息。 
*/
function setfinal(idno) {
    alert(idno);
}



//計時功能
var myVar;
var n = 0;
function myTimer() {
    n += 1; //每次n+1
    document.getElementById("passTime").innerHTML = n + "秒"; //並輸出到上面id為n的文字<p>
}



var Answer;
var NumberRnd = [];
var ctn = 0;

// document.getElementById("btn_name").disabled = false;
document.getElementById("btn_lookAns").disabled = true;
document.getElementById("btn_restart").disabled = true;
document.getElementById("btn_checkAns").disabled = true;
document.getElementById("input_answer").disabled = true;
document.getElementById("btn_update").disabled = true;


var cmdStart = document.getElementById("btn_start"); //遊戲開始
cmdStart.onclick = function () {

    myVar = setInterval(function () {
        myTimer()
    }, 1000);
    // document.getElementById("btn_name").disabled = ture;
    document.getElementById("btn_lookAns").disabled = false;
    document.getElementById("btn_restart").disabled = false;
    document.getElementById("btn_checkAns").disabled = false;
    document.getElementById("input_answer").disabled = false;
    document.getElementById("btn_update").disabled = true;


    for (var i = 0; i < 4; i++) {
        NumberRnd[i] = Math.floor(Math.random() * 10);;
        for (var j = 0; j < i; j++) {
            if (NumberRnd[i] == NumberRnd[j]) {
                i--;
                break;
            }
        }
    }
    Answer = NumberRnd;
}

var cmdRenew = document.getElementById("btn_restart"); //放棄重來
cmdRenew.onclick = function () {
    window.location.reload();
}

var ul_show_check = document.querySelector("#show_check");
var cmdAnswer = document.getElementById("btn_lookAns"); //看答案
cmdAnswer.onclick = function () {
    document.getElementById("btn_lookAns").disabled = true;
    // document.getElementById("input_answer").disabled = true;
    // document.getElementById("btn_checkAns").disabled = true;
    var theAns = document.createElement("p");
    theAns.innerText = "答案是：" + Answer;
    ul_show_check.appendChild(theAns);

    console.log("答案是：" + Answer);
    
}

var cmdCheckanswer = document.getElementById("btn_checkAns"); //檢查答案

cmdCheckanswer.onclick = function () {
    document.getElementById("btn_start").disabled = true;

    if (document.getElementById("input_answer").value.length == 4) {
        var Dictionary = new Array();
        var A = 0,
            B = 0;
        var getInput = document.getElementById("input_answer").value; //取整數
        var Thousand = Math.floor(getInput / 1000);
        var Hundred = Math.floor((getInput % 1000) / 100);
        var Ten = Math.floor((getInput % 100) / 10);
        var Bit = Math.floor(getInput % 10);
        Dictionary[0] = Thousand;
        Dictionary[1] = Hundred;
        Dictionary[2] = Ten;
        Dictionary[3] = Bit;


        for (var i = 0; i < 4; i++) {
            if (NumberRnd[i] == Dictionary[i]) {
                A++;
                if (A == 4) {
                    ctn++;//回答次數+1
                    last_ctn = String(ctn);

                    var li = document.createElement("li");
                    li.innerText = document.getElementById("input_answer").value + "---";
                    var span = document.createElement("span");
                    span.innerText = "第" + ctn + "次回覆：" + A + "A" + B + "B";
                    li.appendChild(span);
                    ul_show_check.appendChild(li);

                    clearInterval(myVar); //==========停下時間=============

                    last_time = String(n);

                    var passGame = document.createElement("p");
                    passGame.innerText = "恭喜通關！總計" + last_ctn + "次回答，用時" + last_time + "秒";
                    ul_show_check.appendChild(passGame);
                    //setfinal("恭喜過關！上傳你的成績吧");
                    document.getElementById("btn_update").disabled = false;
                    return;
                }
            } else {
                for (var j = 0; j < 4; j++) {
                    if (NumberRnd[i] == Dictionary[j]) {
                        B++;
                    }
                }
            }
        }
        var li = document.createElement("li");
        li.innerText = document.getElementById("input_answer").value + "---";
        var span = document.createElement("span");
        ctn++;//回答次數+1
        span.innerText = "第" + ctn + "次回覆：" + A + "A" + B + "B";
        li.appendChild(span);
        ul_show_check.appendChild(li);
    } else {
        alert("請輸入四位數(不重複)");
    }
}



//轉換時間
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
  
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }
  
var cmdUpdate = document.getElementById("btn_update"); //上傳成績
cmdUpdate.onclick = function () {
    alert("無法上傳~因為這裡不用PHP");
}

