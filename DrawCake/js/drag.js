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
    useRubbish() {
        const self = this;
        this.rubbish.on("click", function (e) {
            if (self.delete) {
                self.delete = false;
                $(this).find("path").removeClass("checked");
            } else {
                self.delete = true;
                $(this).find("path").addClass("checked");
            }
        });
    }

    ClickDecoration() {
        const decoration = $(".decoration");
        decoration.on("mousedown", (e) => {
            e.preventDefault();
            let MyDrag = $(e.target).clone().removeClass("ani01").addClass("draggable").addClass("copy");
            let oldClass = e.target.classList[1];
            let newClass = `${e.target.classList[1]}_M`;

            MyDrag.removeClass(oldClass).addClass(newClass);
            this.home.append(MyDrag);
            $(MyDrag).draggabilly();

            const self = this;
            $(document).on('click', '.draggable', function () {
                if (self.delete) {
                    $(this).remove();
                }
            });
        });
    }
}
