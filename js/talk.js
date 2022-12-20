var i = 0;
var txt = '歡迎呀，想知道什麼資訊呢?';
var speed = 100;


function typeWriter() {
    if (i < txt.length) {
        document.getElementById("dialogueText").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    document.getElementById("dialogue").style.display = "block";
}