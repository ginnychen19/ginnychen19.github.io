/* 畫布處理區塊 */
var _canvas02 = document.getElementById('touch-draw');
var _canvas = document.getElementById('draw-cake');
var ctx = _canvas.getContext('2d');
ctx.canvas.willReadFrequently = true;
_canvas.width = 510;
_canvas.height = 550;
_canvas02.width = 510;
_canvas02.height = 550;
let imageData00 = ctx.createImageData(_canvas.width, _canvas.height);

//奶油大小和橡皮擦的事件再replaceSvgImages()完成後做。
export class drawCanvas {
    constructor() {
        /* 控制器們 */
        this.drawCanvas = this;
        this.drawColor = document.getElementById("drawColor");
        this.cakeColor = document.getElementById("cakeColor");
        this.cream = $('.cream');
        this.eraser = $('.eraser');
        this.isEraser = false;
        this.undo = $('.undo');
        this.color = this.drawColor.value;
        this.color02 = "#000000";
        this.scale = 1;
        this.restore_array = [];
        this.undoIndex = -1;
    }
    CreamColorChange() {/*換奶油顏色*/
        this.drawCream = $("#drawCream")[0];
        this.img = new Image();
        this.img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(this.drawCream));

        /* 因為我希望this指的要是 drawCanvas，所以用bind */
        this.drawColor.addEventListener("change", function (e) {
            this.color = e.target.value;
            $(this.drawCream).find("polygon").attr("fill", this.color);
            this.drawCream = $("#drawCream")[0];
            this.img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(this.drawCream));
        }.bind(this))
    }
    CreamSizeChange() {//奶油按鈕事件控制
        const self = this; // 保存class的this

        this.cream.eq(0).attr("aria-label", "0.2");
        this.cream.eq(1).attr("aria-label", "0.4");
        this.cream.eq(2).attr("aria-label", "0.7");
        this.cream.eq(3).attr("aria-label", "1.0");

        this.cream.eq(3).find("path").addClass("checked"); //預設選中
        this.cream.on("click", function (e) {
            $(self.cream).find('.checked').not($(this)).removeClass('checked');
            $(this).find("path").toggleClass("checked");
            self.scale = $(this).attr("aria-label");//有送過去！
        });
    }
    useEraser() {//橡皮擦按鈕事件控制
        const self = this;
        this.eraser.on("click", function (e) {
            if (!self.isEraser) {
                self.isEraser = true;
            } else {
                self.isEraser = false;
            }
            // console.log(self.eraser.find("path"));
            $(self.eraser).find("path").toggleClass("checked");
        });
    }
    draw = () => {//畫奶油
        const self = this; // 保存class的this
        var canterX = 30;
        var canterY = 30;
        $(_canvas02).on("mousedown", openCvs);
        $(_canvas02).on("mouseup", closeCvs);

        $(_canvas02).on("touchstart", openCvs);
        $(_canvas02).on("touchend", closeCvs);

        function openCvs(e) {
            e.preventDefault();
            _canvas02.addEventListener("mousemove", clickCvs);
            _canvas02.addEventListener("touchmove", clickCvs02, { passive: true });
        }
        function closeCvs(e) {
            _canvas02.removeEventListener("mousemove", clickCvs);
            _canvas02.removeEventListener("touchmove", clickCvs02);
            /* 加入到陣列 */
            console.log(self.undoIndex);
            self.undoIndex += 1;
            self.restore_array.push(ctx.getImageData(0, 0, _canvas.width, _canvas.height));
        }
        function clickCvs02(e) {
            // e.preventDefault();
            /*canvas*/
            var rect = ctx.canvas.getBoundingClientRect();
            var canvasOffsetX = rect.left;
            var canvasOffsetY = rect.top;
            /* 滑鼠 */
            /*e.client就直接是滑鼠與目前瀏覽器的距離*/
            var x = e.touches[0].clientX - canvasOffsetX;
            var y = e.touches[0].clientY - canvasOffsetY;
            console.log(x);
            console.log(y);
            drawCream(x, y);
        }
        function clickCvs(e) {
            /* 獲得滑鼠之於canvas的位置 */
            /* 01.因為我的canvas和瀏覽器窗口的量是會變的，所以要算差多少 */
            /* 02.我的滑鼠位置之於瀏覽器窗口也會一直變 */
            /* 03.所以取得當前變量後，相減才會得到正確的位置 */
            /*canvas*/
            var rect = ctx.canvas.getBoundingClientRect();
            var canvasOffsetX = rect.left;
            var canvasOffsetY = rect.top;
            /* 滑鼠 */
            /*e.client就直接是滑鼠與目前瀏覽器的距離*/
            var x = e.clientX - canvasOffsetX;
            var y = e.clientY - canvasOffsetY;

            drawCream(x, y);
        }
        function drawCream(x, y) {
            ctx.save();
            /* 這裡決定是要畫還是要擦除 */
            if (!self.isEraser) {
                ctx.globalCompositeOperation = "source-over";
            } else {
                ctx.globalCompositeOperation = 'destination-out';
            }
            ctx.drawImage(self.img,
                0, 0, 490, 490,
                x, y, 60, 60
            );
            ctx.restore();
        }
    }
    useUndo() {
        const self = this;
        this.undo.on("click", function (e) {
            self.undoIndex = self.undoIndex - 1;
            self.restore_array.pop();
            ctx.putImageData(self.restore_array[self.undoIndex], 0, 0);
            // if (self.undoIndex < 0) {
            //     console.log("<0");
            //     return;
            // } else if (self.undoIndex = 0) {
            //     self.undoIndex = -1;
            //     console.log(self.undoIndex);
            //     self.restore_array = [""];
            //     console.log("我空了" + self.restore_array);
            //     ctx.putImageData(imageData00, 0, 0);
            // } else {
            //     self.undoIndex = self.undoIndex - 1;
            //     console.log(self.undoIndex);
            //     if (self.restore_array.length > 1) { // 檢查陣列是否大於 1
            //         self.restore_array.pop();
            //         ctx.putImageData(self.restore_array[self.undoIndex], 0, 0);
            //     }
            //     console.log(self.restore_array);
            // }
        });
    }
    CakeColorChange() {/*換蛋糕顏色*/
        this.cakeColor.addEventListener("change", (e) => {
            $(".cakePIC").attr("src", `./Source/SVG/game/${cakeColor.value}.svg`);
        })
    }
}

