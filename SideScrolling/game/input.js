export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            // console.log(e.key, this.keys); //看當下按了什麼?
            if ((
                //這裡要小心！！英文大小寫不能打錯。
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } else if (e.key === "d") {
                this.game.debug = !this.game.debug;
            }else if (e.key === " ") {
                this.game.enemies.forEach(enemy => {
                    enemy.speedX = 0 //怪物停止移動
                });
                this.game.gamePause = true;//停止生成怪物
                this.game.speed = 0 //地圖停止移動
                //禁止玩家按其他案件
                //還要可以結束這狀態
            }
        });
        window.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            //console.log(e.key, this.keys);//玩家按了什麼
        });

    }
}


