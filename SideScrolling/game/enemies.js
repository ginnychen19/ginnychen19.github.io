class Enemy {
    constructor() {
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        //移動時
        this.x -= this.speedX;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //確認是否移出是窗外，移出擦除。
        if (this.x + this.width < 0) this.markedForDeletion = true;

    }
    draw(context) {
        if (this.game.debug) {
            context.strokeRect(
                this.x + 10,
                this.y +5,
                this.width -30, //修改碰撞器高寬
                this.height /1.5
            );
        }    
        context.drawImage(
            this.image,
            this.frameX * this.width,
            0,
            this.width,
            this.height,

            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 60;
        this.height = 44;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;//因為要從最右邊往左前進，有的推遠、推近生成。
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 1; //每隻速度會不同
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = document.getElementById("enemy_fly");
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime) {
        super.update(deltaTime); //super是再取用上面的funtion
        this.angle += this.va; //下面這兩行會導致有微微上下搖的效果。
        this.y += Math.sin(this.angle);
    }
}
export class GroundEnemy extends Enemy {
    constructor(game) {
        super(); //為何要加這個??
        this.game = game;
        this.width = 60;
        this.height = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.height - (85);
        this.image = document.getElementById("enemy_plant");
        this.speedX =  Math.random() + 1; //這邊如果是0的話永遠不會動qq
        this.speedY = 0;
        this.maxFrame = 1;
    }
    update(deltaTime) {
        super.update(deltaTime); //super是再取用上面的funtion
    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super();
        this.game = game;
        this.width = 120;
        this.height = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.image = document.getElementById("enemy_spider_big");
        this.speedX = Math.random() + 1; //這邊如果是0的話永遠不會動qq
        this.speedY =  Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }
    update(deltaTime) {
        super.update(deltaTime); //super是再取用上面的funtion
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
        if (this.y> -this.height) this.markedForDeletion = true;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.width / 2, 0);
        context.lineTo(this.x + this.width / 2, this.y + 50);
        context.stroke();   
    }
}