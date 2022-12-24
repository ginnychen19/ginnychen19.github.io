function onhoverfb(x) {
    $('.fb img')[0].src = "./img/svg/facebook_D.svg";
    $('.fb')[0].style.right = " -180px";
    $('.fb a')[0].style.color = "var(--myYellow)";
    $('.fb')[0].style.transition = "1.0s\nease";
}
function normalfb(x) {
    $('.fb img')[0].src = "./img/svg/facebook_H.svg";
    $('.fb')[0].style.right = " -300px";
    $('.fb a')[0].style.color = "var(--myWhite)";
}
function onhoverins(x) {
    $(".ins img")[0].src = "./img/svg/instagram_D.svg";
    $('.ins')[0].style.right = " -90px";
    $('.ins a')[0].style.color = "var(--myYellow)";
    $('.ins')[0].style.transition = "1.0s\nease";
}
function normalins(x) {
    $(".ins img")[0].src = "./img/svg/instagram_H.svg";
    $('.ins')[0].style.right = " -300px";
    $('.ins a')[0].style.color = "var(--myWhite)";
}
function onhoverPixiv(x) {
    $(".Pixiv img")[0].src = "./img/svg/Pixiv_D.svg";
    $('.Pixiv')[0].style.right = " -180px";
    $('.Pixiv a')[0].style.color = "var(--myYellow)";
    $('.Pixiv')[0].style.transition = "1.0s\nease";
}
function normalPixiv(x) {
    $(".Pixiv img")[0].src = "./img/svg/Pixiv_H.svg";
    $('.Pixiv')[0].style.right = " -300px";
    $('.Pixiv a')[0].style.color = "var(--myWhite)";
} 