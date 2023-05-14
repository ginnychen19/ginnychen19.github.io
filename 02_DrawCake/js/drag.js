// console.log("yl3grweg")
export class dragDecoration {
    constructor() {
        this.home = $("#cake-decoration");
        this.rubbish = $('.trash-can');
        this.delete = false;
        this.goToDraw = $('.pastry-bag02');
        this.decorations = $(".decoration");
        this.copys = $(".copy");
        this.draggies = [];
    }
    useRubbish() {//垃圾桶事件控制
        const self = this;
        this.rubbish.on("click", function (e) {
            //e.target是垃圾桶按鈕
            if (self.delete) {
                self.delete = false;
                $(this).find("path").removeClass("checked");
                console.log("false");
            } else {
                self.delete = true;
                $(this).find("path").addClass("checked");
                console.log("true");
            }
        });
    }

    ClickDecoration() {//點擊初始物件，新增物件並使其可動
        const decoration = $(".decoration");
        decoration.on("mousedown", (e) => {
            e.preventDefault();
            let MyDrag = $(e.target).clone().removeClass("ani01").addClass("draggable").addClass("copy");
            let oldClass = e.target.classList[1];
            let newClass = `${e.target.classList[1]}_M`;

            MyDrag.removeClass(oldClass).addClass(newClass);
            this.home.append(MyDrag);
            $(MyDrag).draggabilly();

            /* 判斷是否要刪除 */
            const self = this;
            $(document).on('click', '.draggable', function () {//點到有.draggable的元素
                console.log("delete的狀態是" + self.delete);
                // console.log("this.rubbish的class有" + $('.trash-can').html());
                if (self.delete) {
                    $(this).remove();
                }
            });
        });
    }
}
