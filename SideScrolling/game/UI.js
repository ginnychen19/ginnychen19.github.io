import { BgMusic, UiSound, playerSound, EnemySound } from './music.js';
const canvas = document.getElementById("canvas1");
export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Microsoft JhengHei";
        this.livesImage = document.getElementById("lives");
        this.SettingsImage = document.getElementById("Settings");
        this.BGmusic = new BgMusic(this.game);//背景音樂
        this.UImusic = new UiSound(this.game);//Ui音樂
        this.canvas = document.getElementById("canvas1");
    }
    drawSetting(context) {
        var mouseX; //滑鼠位置，用於控制滑塊的移動
        var mouseY;
        this.SettingX = this.game.width - 100;
        this.SettingY = 0;
        this.SettingWidth = 100;
        this.SettingHeight = 100;

        function eventMouseUp(event) {
            //Hit Setting	

            // //Hit Play
            // if ( (mouseY >= playY) && (mouseY <= playY+bH) && (mouseX >= playX) && (mouseX <= playX+bW) ) {
            //     /*
            //     滑鼠的 Y 座標 >= 播放按鈕的 Y 座標，
            //     並且 <= 播放按鈕的 Y 座標 + 按鈕的高度 (bH)；
            //     同時，滑鼠的 X 座標 >= 等於播放按鈕的 X 座標，
            //     並且 <= 播放按鈕的 X 座標 + 按鈕的寬度 (bW)。
            //     條件成立表示滑鼠點擊了播放按鈕的範圍。
            //     */
            //     if (audioElement.paused) {
            //         audioElement.play();

            //     } else {
            //         audioElement.pause();

            //     }

            // }
            // //Hit loop
            // if ( (mouseY >=loopY) && (mouseY <= loopY+bH) && (mouseX >= loopX) && (mouseX <= loopX+bW) ) {
            //     if (audioElement.loop) {
            //         audioElement.loop=false;
            //     } else {
            //         audioElement.loop = true;
            //     }

            // }
        }



        canvas.addEventListener("mouseup", eventMouseUp, false);

        //繪製設定介面
        context.drawImage(
            this.SettingsImage,
            0, 0,
            240, 240,

            this.SettingX, this.SettingY,
            this.SettingWidth, this.SettingHeight
        );
        // if(fff)
    }

    draw(context) {
        // console.log(this.currentBGmusicState);
        this.BGmusic.Playmusic();
        this.UImusic.Playmusic();
        // this.currentBGmusicState.play();
        //遊戲結束提示
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + "px " + this.fontFamily;

            if (this.game.lives <= 0) {
                /* 背景填充 */
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
                context.fillRect(
                    (this.game.width / 2) * 0.5,
                    (this.game.height / 2) * 0.5,
                    this.game.width / 2,
                    this.game.height / 2
                );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                );
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "你死了",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );

            } else if (this.game.score >= 60) {
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.fillRect(
                    (this.game.width / 2) * 0.5,
                    (this.game.height / 2) * 0.5,
                    this.game.width / 2,
                    this.game.height / 2
                );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                );
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "你是黑暗生物害怕的英雄！",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            } else if (this.game.score >= 25) {
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.fillRect(
                    (this.game.width / 2) * 0.5,
                    (this.game.height / 2) * 0.5,
                    this.game.width / 2,
                    this.game.height / 2
                );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                )
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "還不錯，你是個好狗狗",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            } else {
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.fillRect(
                    (this.game.width / 2) * 0.5,
                    (this.game.height / 2) * 0.5,
                    this.game.width / 2,
                    this.game.height / 2
                );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                )
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "你是來給黑暗生物加餐的嗎?",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            }
        } else {
            context.font = this.fontSize + "px " + this.fontFamily;
            context.textAlign = 'left';
            context.fillStyle = this.game.fontColor;
            //分數繪製
            context.fillText("已蒐集: " + this.game.score, 20, 50);
            //時間計數器
            context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
            context.fillText('時間: ' + this.game.formattedTime, 20, 80)
            //生命計數器
            for (let i = 0; i < this.game.lives; i++) {
                context.drawImage(
                    this.livesImage,
                    30 * i + 20, 95,
                    25, 25
                ); //間距 * i + 起始位置
            }
            this.drawSetting(context);
        }

    }

}