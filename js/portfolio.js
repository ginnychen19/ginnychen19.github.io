let Pic01Index = 1;
showPic01(Pic01Index);
//編號預設等於1 ，將1帶入並執行showSlides

function plusSlides01(n) {
    showPic01(Pic01Index += n);
}
//若呼叫plusSlides()，執行 showSlides 並執行n+1

function currentSlide01(n) {
    showPic01(Pic01Index = n);
}
//若呼叫currentSlide01()，執行showPic01 並Pic01Index會等於當前數值

function showPic01(n) {
    let i;
    let Pic01s = document.getElementsByClassName("myPic01");
    //slides 是抓到全部的div

    //n，表示當前數字(this)
    //如果當前累加數字超過原數量，數字變回1
    if (n > Pic01s.length) { Pic01Index = 1 }
    //如果當前累加數字<1，數字變回總長
    if (n < 1) { Pic01Index = Pic01s.length }

    //for(給初始值；給做的條件；遞增的方式 )
    //全部變關閉狀態
    for (i = 0; i < Pic01s.length; i++) {
        Pic01s[i].style.display = "none";
    }
    //slides[slideIndex - 1]是當前這個，打開
    Pic01s[Pic01Index - 1].style.display = "block";
}


let Pic02Index = 1;
showPic02(Pic02Index);
function plusSlides02(n) {
    showPic02(Pic02Index += n);
}
function currentSlide02(n) {
    showPic02(Pic02Index = n);
}
function showPic02(n) {
    let i;
    let Pic02s = document.getElementsByClassName("myPic02");
    if (n > Pic02s.length) { Pic02Index = 1 }
    if (n < 1) { Pic02Index = Pic02s.length }
    for (i = 0; i < Pic02s.length; i++) {
        Pic02s[i].style.display = "none";
    }
    Pic02s[Pic02Index - 1].style.display = "block";
}

let Pic03Index = 1;
showPic03(Pic03Index);
function plusSlides03(n) {
    showPic03(Pic03Index += n);
}
function currentSlide03(n) {
    showPic03(Pic03Index = n);
}
function showPic03(n) {
    let i;
    let Pic03s = document.getElementsByClassName("myPic03");
    if (n > Pic03s.length) { Pic03Index = 1 }
    if (n < 1) { Pic03Index = Pic03s.length }
    for (i = 0; i < Pic03s.length; i++) {
        Pic03s[i].style.display = "none";
    }
    Pic03s[Pic03Index - 1].style.display = "block";
}

let Pic04Index = 1;
showPic04(Pic04Index);
function plusSlides04(n) {
    showPic04(Pic04Index += n);
}
function currentSlide04(n) {
    showPic04(Pic04Index = n);
}
function showPic04(n) {
    let i;
    let Pic04s = document.getElementsByClassName("myPic04");
    if (n > Pic04s.length) { Pic04Index = 1 }
    if (n < 1) { Pic04Index = Pic04s.length }
    for (i = 0; i < Pic04s.length; i++) {
        Pic04s[i].style.display = "none";
    }
    Pic04s[Pic04Index - 1].style.display = "block";
}

let Pic05Index = 1;
showPic05(Pic05Index);
function plusSlides05(n) {
    showPic05(Pic05Index += n);
}
function currentSlide05(n) {
    showPic05(Pic05Index = n);
}
function showPic05(n) {
    let i;
    let Pic05s = document.getElementsByClassName("myPic05");
    if (n > Pic05s.length) { Pic05Index = 1 }
    if (n < 1) { Pic05Index = Pic05s.length }
    for (i = 0; i < Pic05s.length; i++) {
        Pic05s[i].style.display = "none";
    }
    Pic05s[Pic05Index - 1].style.display = "block";
}

//------------圖片點擊放大-----------------------------------

function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
}
//------------換Menudiv程式-----------------------------------


let MenuIndex = 1;
showMenus(MenuIndex);
let picsIndex = 1;
showPics(picsIndex);
let priceIndex = 1;
showprices(priceIndex);

function plusMenu(n) {
    showMenus(MenuIndex += n);
    showPics(picsIndex += n);
    showprices(priceIndex += n);
}
function showMenus(n) {
    let j;
    let titles = document.getElementsByClassName("menutitle");

    if (n > titles.length) { MenuIndex = 1 }
    if (n < 1) { MenuIndex = titles.length }

    for (j = 0; j < titles.length; j++) {
        titles[j].style.display = "none";
    }
    titles[MenuIndex - 1].style.display = "block";
}
function showPics(n) {
    let k;
    let pics = document.getElementsByClassName("menupic");

    if (n > pics.length) { picsIndex = 1 }
    if (n < 1) { picsIndex = pics.length }

    for (k = 0; k < pics.length; k++) {
        pics[k].style.display = "none";
    }
    pics[picsIndex - 1].style.display = "block";
}
function showprices(n) {
    let k;
    let prices = document.getElementsByClassName("menuprice");

    if (n > prices.length) { priceIndex = 1 }
    if (n < 1) { priceIndex = prices.length }
    for (k = 0; k < prices.length; k++) {
        prices[k].style.display = "none";
    }
    prices[priceIndex - 1].style.display = "block";
}
