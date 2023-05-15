/*
一個簡單的範例，它將每個狀態的值和名稱配對。
這將有助於代碼的可讀性。
*/
const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    DEATH: 4,
}
class State {
    constructor(state) {
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0; //為了在每次進入時初始化
        this.player.frameY = 0;
        this.player.maxframe = 4;//因為從0計，所以要記得-1
    }
    handleInput(input) {
        //這邊是設定說，當玩家按了什麼按鈕，要把狀態改成 const states的哪一碼
        //this.player.setState(states.RUNNING); 
        //這行主要是去調用player.js中的setState去切換狀態
        if (input.includes('ArrowRight') || input.includes('ArrowLeft')) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}
export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxframe = 8;
    }
    handleInput(input) {
        //這邊是設定說，當玩家按了什麼按鈕，要把狀態改成 const states的哪一碼
        //這邊的數字會對應到frameY；
        if (input.includes('ArrowDown')) {
            this.player.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}
export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        if (this.player.onGround()) this.player.vy -= 30;
        this.player.frameX = 0;
        this.player.maxframe = 6;
        this.player.frameY = 1;
        
    }
    handleInput(input) {
        if (this.player.vy > this.player.weight) {
            this.player.setState(states.FALLING, 1);
        }
    }
}
export class Falling extends State {
    constructor(player) {
        super('Falling');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxframe = 6;
        this.player.frameY = 2;
    }
    handleInput(input) {
        if (this.player.onGround()) {//等他回到地面再變跑的模式
            this.player.setState(states.RUNNING, 1);
        }
    }
}
export class Death extends State {
    constructor(player) {
        super('DEATH');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.maxframe = 11;
        this.player.frameY = 8;
    }
    handleInput(input) {
        // 禁用所有案上下左右鍵的反應
        if (input.includes('ArrowDown') ||
            input.includes('ArrowUp') ||
            input.includes('ArrowRight') ||
            input.includes('ArrowLeft')) {
            return;
        }
    }
}
/*
handleInput(input)這邊
當角色處於特定狀態時，
它只會對有限數量的鍵盤輸入做出反應
*/
/*
這邊的大方向是

*/
