/* 畫布處理區塊 */
var _canvas02 = document.getElementById('touch-draw');
var _canvas = document.getElementById('draw-cake');
var ctx = _canvas.getContext('2d');
ctx.canvas.willReadFrequently = true;
_canvas.width = 510;
_canvas.height = 550;
_canvas02.width = 510;
_canvas02.height = 550;

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
    CreamColorChange() {
        this.drawCream = $("#drawCream")[0];
        this.img = new Image();
        this.img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(this.drawCream));

        this.drawColor.addEventListener("change", function (e) {
            this.color = e.target.value;
            $(this.drawCream).find("polygon").attr("fill", this.color);
            this.drawCream = $("#drawCream")[0];
            this.img.src = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(this.drawCream));
        }.bind(this))
    }
    CreamSizeChange() {
        const self = this;

        this.cream.eq(0).attr("aria-label", "0.1");
        this.cream.eq(1).attr("aria-label", "0.3");
        this.cream.eq(2).attr("aria-label", "0.6");
        this.cream.eq(3).attr("aria-label", "0.9");

        this.cream.eq(3).find("path").addClass("checked");
        this.cream.on("click", function (e) {
            $(self.cream).find('.checked').not($(this)).removeClass('checked');
            $(this).find("path").toggleClass("checked");
            self.scale = $(this).attr("aria-label");
        });
    }
    useEraser() {
        const self = this;
        this.eraser.on("click", function (e) {
            if (!self.isEraser) {
                self.isEraser = true;
            } else {
                self.isEraser = false;
            }
            $(self.eraser).find("path").toggleClass("checked");
        });
    }
    draw = () => {
        const self = this; 
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
            self.undoIndex += 1;
            self.restore_array.push(ctx.getImageData(0, 0, _canvas.width, _canvas.height));
        }
        function clickCvs02(e) {

            var rect = ctx.canvas.getBoundingClientRect();
            var canvasOffsetX = rect.left;
            var canvasOffsetY = rect.top;

            var x = e.touches[0].clientX - canvasOffsetX;
            var y = e.touches[0].clientY - canvasOffsetY;
            drawCream(x, y)
        }
        function clickCvs(e) {
            var rect = ctx.canvas.getBoundingClientRect();
            var canvasOffsetX = rect.left;
            var canvasOffsetY = rect.top;
            var x = e.clientX - canvasOffsetX;
            var y = e.clientY - canvasOffsetY;

            drawCream(x, y);
        }
        function drawCream(x, y) {
            ctx.save();
        
            if (!self.isEraser) {
                ctx.globalCompositeOperation = "source-over";
            } else {
                ctx.globalCompositeOperation = 'destination-out';
            }
            ctx.drawImage(self.img,
                0, 0, 490, 490,
                x, y, 50*self.scale, 50*self.scale
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
        });
    }
    CakeColorChange() {
        this.cakeColor.addEventListener("change", (e) => {
            $(".cakePIC").attr("src", `./Source/SVG/game/${cakeColor.value}.svg`);
        })
    }
}

