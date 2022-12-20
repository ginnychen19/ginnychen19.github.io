$(function () {
    //全部選擇隱藏
    $('div[id^="Q_"]').hide();
    $('#sltQ').change(function () {
        let sltValue = $(this).val();
        console.log(sltValue);

        $('div[id^="Q_"]').hide();
        //指定選擇顯示
        $(sltValue).show();
    });
});