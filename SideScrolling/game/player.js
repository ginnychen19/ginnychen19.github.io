import { Sitting, Running, Jumping, Falling, Death } from './playerStates.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { playerSound, EnemySound } from './music.js';

//這邊的this = Player這個class ，也就是操控角色。
export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.scale = 1;//圖片要乘多少
        this.vy = 0; //控制角色掉落速度的變量
        this.weight = 1.5; //影響引力
        this.image = document.getElementById("myplayer");
        this.frameX = 0; //這邊是用來畫精靈圖。
        this.frameY = 0; //決定動作狀態。  
        this.maxframe; //決定動作狀態。 
        this.fps = 15; //這邊影響動畫看起來的速度。
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0; //以上三個用來計數動畫
        this.speed = 0;
        this.maxSpeed = 5;//控制移動速度
        this.states = [//這邊會放playerStates.js的各種狀態。
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
            new Death(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();

        this.playerSound = new playerSound(this.game);//玩家動作音樂
        this.EnemySound = new EnemySound(this.game);//敵人碰撞音樂
    }
    update(input, deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(input);//在每次更新前先檢查狀態
        // horizontal movement 左右移動
        this.x += this.speed;
        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
            this.playerSound.Playmusic(1,input);//聽起來不會重複撥放，不過要判斷死亡時停止撥放
        }
        else if (input.includes('ArrowLeft')){
            this.speed = -this.maxSpeed;
            this.playerSound.Playmusic(1,input);
        }
        else {this.speed = 0;}
        if (this.x < 0) this.x = 0;//不能超過牆壁
        if (this.x > this.game.width - (this.width * this.scale)) this.x = this.game.width - (this.width * this.scale);

        // vertical movement 上下移動
        if (input.includes('ArrowUp')) {
            this.speed = this.maxSpeed;
            this.playerSound.Playmusic(0,input);
        }
        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
        } else { this.vy = 0; }

        //畫動態圖
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxframe) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
            //這時可能會發現動態有少，所以我們在playerStates加入maxframe的值！
        }
    }

    draw(context) {
        // console.log(context);
        if (this.game.debug) {
            context.strokeRect(
                this.x + 20,
                this.y + this.height + 30,
                this.width - 40, //修改碰撞器高寬
                this.height / 1.5
            );
        }

        context.drawImage(
            this.image,

            this.frameX * this.width, this.frameY * this.height,
            this.width, this.height,

            this.x, this.y + (this.height * this.scale),//因為有除，所以要
            this.width * this.scale, this.height * this.scale
        );
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state, speed) {
        //把從playerStates.js接收到的狀態內容換到這裡
        this.currentState = this.states[state];//這是啥意思?
        this.game.speed = speed; //要加speed是因為這樣我們才可以在playerStates.js中，設定當我們是哪個動作時，畫面移動的速度要是0或正常。
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            // console.log();  
            if (
                enemy.x + 10 < this.x + this.width - 20 &&
                enemy.x + enemy.width - 30 > this.x + 20 &&
                enemy.y + 5 < this.y + this.height + 30 &&
                enemy.y + enemy.height / 1.5 > this.y + this.height / 1.5

            ) { // enemy.speedX = 0; //可以暫停
                enemy.markedForDeletion = true;
                if (enemy instanceof FlyingEnemy) {
                    this.game.score++;
                    this.EnemySound.Playmusic(0);
                } else if (enemy instanceof GroundEnemy) {
                    this.game.lives--;
                    if (this.game.lives <= 0) {
                        this.setState(4, 0);
                        setTimeout(() => {
                            this.game.gameOver = true;
                        }, 700);//因為死亡動畫撥一次完大概是700毫秒
                    }
                }

            } else {
                //no collosion
            }
        });
    }
}

/*
    this.vy 被初始化为 0，
    这意味着角色在垂直方向上不会运动，
    但当角色跳跃或下落时，
    this.vy 的值将会被修改，以控制角色的垂直运动。

    在 Player.update() 方法中，
    this.y += this.vy 可以更新角色在垂直方向上的位置。
*/
/*
    假设currentState是一个状态对象，
    它有一个名为enter()的方法，
    该方法会在状态进入时被调用，
    执行一些初始化操作或者开始执行该状态的逻辑。
*/
/*  checkCollision()
    這個判斷式是基於矩形碰撞檢測的原理。
    當兩個矩形有交集時，它們必定滿足以下四個條件：

    當前物件的左邊界 x 座標小於敵人的右邊界 x 座標。
    當前物件的右邊界 x 座標大於敵人的左邊界 x 座標。
    當前物件的上邊界 y 座標小於敵人的下邊界 y 座標。
    當前物件的下邊界 y 座標大於敵人的上邊界 y 座標。
    enemy.x < this.x + this.width &&
    enemy.x + enemy.width > this.x &&
    enemy.y < this.y + this.height &&
    enemy.y + enemy.height > this.y
*/