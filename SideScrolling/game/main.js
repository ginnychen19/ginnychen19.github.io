import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './backgrond.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';
import { BgMusic,UiSound,playerSound,EnemySound } from './music.js';

window.addEventListener('load', function () {
    const canvas = this.document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');

    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 175; //(引響狗的高度)設定畫布中的地板有多高
            this.speed = 0; //影響整體畫面初始速度
            this.background = new Background(this)
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.time = 0;
            this.maxTime = 60; //因為我後面把單位變成秒了，所以這邊單位要變
            this.formattedTime = "00:00";
            this.gameOver = false;
            this.gamePause = false;
            this.gameBGmusic = false;
            this.lives = 5;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();

        }
        update(deltaTime) {
            //時間計數器
            var senced = deltaTime / 1000;
            this.time += senced;
            const formatTime = (time) => {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                return formattedTime;
            };
            this.formattedTime = formatTime(Math.floor(this.time));
            //遊戲是否結束判斷
            if (this.time > this.maxTime) this.gameOver = true;
            //遊戲背景
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //生成敵人
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => { //enemy是從addEnemy()底下收進來的 new FlyingEnemy(this)
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);//刪除當前這個enemy
            })
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.UI.draw(context)
        }
        addEnemy() {
            if (this.gamePause) return;
            if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));

            this.enemies.push(new FlyingEnemy(this));//讓FlyingEnemy可以取得this.game物件
            //console.log(this.enemies);//會發現每秒都有多新增敵人
        }
    }

    const game = new Game(canvas.width, canvas.height);
    //console.log(game);
    let lastime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastime;
        // console.log(deltaTime);
        //這個console.log可以發現requestAnimationFram的時間是算的很細的。
        //因此我們把時間加入到.update()
        lastime = timeStamp;
        // game.draw(ctx);
        //要加clearRect，要不然會有無限殘影。
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        //不是this.gameOver喔！
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});