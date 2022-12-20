
window.addEventListener('load', () => {

    /*1.判斷是否到process和problem區，到了再執行進入動畫
      加入 class="animate__animated animate__fadeInUp"
    */
    const process = document.querySelector('#process');
    const problem = document.querySelector('#problem');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const element = entry.target;

            if (entry.isIntersecting) {
                setTimeout(() => {
                    element.classList.add('animate__fadeInUp');
                }, 200);
            } else { }
        });

        observer.observe(process);
        observer.observe(problem);
    });

    /*2.判斷是否到process和problem區，到了再執行進入動畫
      加入 class="animate__animated animate__fadeInUp"
    */
    //全部選擇隱藏
    $('div[id^="Q_"]').hide();
    $('#sltQ').change(function () {
        let sltValue = $(this).val();
        //console.log(sltValue);
        $('div[id^="Q_"]').hide();
        //指定選擇顯示
        $(sltValue).show();
    });

});
