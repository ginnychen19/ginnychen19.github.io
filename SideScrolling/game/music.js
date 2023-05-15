class musicSetting {
    constructor(game) {
        this.game = game;
        this.volume = 1;
        this.addAudioDiv = document.getElementById("addAudio");
    }
}

export class BgMusic extends musicSetting {//環境音樂
    constructor(game) {
        super(game);
        this.bgm_Splash = document.getElementById("bgm_Splash");
        this.bgm_Game = document.getElementById("bgm_Game");
        this.musicStates = [
            this.bgm_Splash,
            this.bgm_Game
        ]
        this.currentMusicState = this.musicStates[0];
        this.isPlay = false;
    }
    setState(stateNB) {
        // console.log(this.currentMusicState);
        if (this.isPlay) {
            this.currentMusicState.pause();//如果有音樂要先關
        }
        this.state = stateNB;
        this.currentMusicState = this.musicStates[this.state];
    }
    Playmusic() {
        if (this.game.gameOver) {//遊戲結束換一個背景音樂
            this.isPlay = true;//確保初始狀態已撥過
            this.setState(1);
            this.currentMusicState.play();//放新的
            this.currentMusicState.loop = true; //機車ㄝ，非得放在這裡

            if (this.game.lives <= 0) {
            } else if (this.game.score >= 60) {
            } else if (this.game.score >= 25) {
            } else {
            }

        } else {//遊戲未結束一直播。
            this.setState(0);
            this.currentMusicState.volume = 0.5;
            this.currentMusicState.play();
            // console.log(this.currentMusicState.volume);

        }
    }
}
export class UiSound extends musicSetting {
    constructor(game) {
        super(game);
        this.Mfail = document.getElementById("fail");
        this.Mwin = document.getElementById("win");
        this.UimusicStates = [
            this.Mwin,
            this.Mfail
        ]
    }
    setState(stateNB) {
        this.state = stateNB;
        this.currentUimusicState = this.UimusicStates[this.state];
    }
    Playmusic() {
        if (this.game.gameOver) {
            if (this.game.lives <= 0) {
                this.setState(1);//設定要撥哪個狀態，1是失敗的歌曲
                this.currentUimusicState.play();

            } else if (this.game.score >= 60) {
                this.setState(0);
                this.currentUimusicState.play();
            } else if (this.game.score >= 25) {
                this.setState(0);
                this.currentUimusicState.play();
            } else {
                this.setState(0);
                this.currentUimusicState.play();
            }
        } else {

        }
    }
}
export class playerSound extends musicSetting {
    constructor(game) {
        super(game);
        this.Mjump = document.getElementById("jump");
        this.Mwalk = document.getElementById("walk");
        this.musicStates = [
            this.Mjump,
            this.Mwalk,
        ]
        this.currentMusicState = this.musicStates[0];
    }
    Playmusic(soundState, input) {
        const object = this.musicStates[soundState];
        let copy = object;
        if (input.includes('ArrowUp')) {
            let copy = object.cloneNode(true);
            this.addAudioDiv.appendChild(copy);
        }
        copy.play();

        copy.addEventListener('ended', () => { //播完要清乾淨元素
            this.addAudioDiv.innerHTML = '';
        });
    }

}
export class EnemySound extends musicSetting {
    constructor(game) {
        super(game);
        this.Mcollect = document.getElementById("collect");
        this.musicStates = [
            this.Mcollect,
        ]
        this.currentMusicState = this.musicStates[0];
    }
    Playmusic(soundState) {
        //使用cloneNode()複製音樂元素，解決音效播放對不上蒐集的問題。
        //可是要記得清掉元素，不然瀏覽器會報錯
        const object = this.musicStates[soundState];
        if (!object) {
            console.error(`Invalid sound state: ${soundState}`);
            return;
        }
        const copy = object.cloneNode(true);
        this.addAudioDiv.appendChild(copy);

        copy.play();

        copy.addEventListener('ended', () => { //播完要清乾淨元素
            this.addAudioDiv.innerHTML = '';
        });
    }
}
/*
在上述程式碼中，當子類別BgMusic的建構函式被呼叫時，
會先執行super(game)，這樣就會先呼叫父類別musicSetting的建構函式，
並把game這個參數傳給它。
接著，子類別就可以在自己的建構函式中使用this.game
來存取父類別傳遞進來的game參數，同時也可以定義自己的屬性和方法。
*/