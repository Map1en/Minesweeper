let Bar = new Vue({
    el: '#bar',
    data: {
        step: 0,
        time: 0,
        timer: undefined,
        mineNum: 40,
        level: [false, true, false],
    },
    methods: {
        chknewGame: function () {
            if (Game.isGameEnd()) this.newGame;
        },
        newGame: function () {
            for (let i = 0; i < this.level.length; i++) {
                if (this.level[i] == true) {
                    Grid.switchGrid(i);
                    this.switchMineNum(i);
                    break;
                }
            }
            this.resetStep();
            this.resetTime();
            Game.isStart = false;
        },
        switchLevel: function (level) {
            if (Game.isGameEnd()) {
                this.level = this.level.map(() => false);
                this.level[level] = true;
                this.switchMineNum(level);
                this.resetStep();
                this.resetTime();
                Grid.switchGrid(level);
            }
        },
        switchMineNum: function (level) {
            this.mineNum = Game.diff[level].mineNum;
        },
        setStep: function () {
            this.step++;
        },
        setTime: function () {
            this.timer = setInterval(() => {
                this.time++;
            }, 1000);
        },
        setMineNum: function (num) {
            this.mineNum += num;
        },
        resetStep: function () {
            this.step = 0;
        },
        resetTime: function () {
            this.time = 0;
        },
        stopTimer: function () {
            clearInterval(this.timer);
        }
    }
});

let Grid = new Vue({
    el: '#grid',
    template:
        `
        <div id="grid" :style="field.size">
            <div class="row" v-for="y in field.y" :key="y.id">
                <div
                    class="block" :class="isOpened(x, y)" v-for="x in field.x" :key="x.id" :x="x" :y="y"
                ></div>
            </div>
        </div>
        `,
    data: {
        field: {
            x: 16,
            y: 16,
            mineNum: 40,
            size: {width: '480px', height: '480px'}
        },
    },
    computed: {
        isOpened: function (x, y) {
            Block.initData();
            return {
                opened : Block.Opened(x, y)
            };
        }
    },
    methods: {
        switchGrid: function (level) {
            this.field = Game.diff[level];
        },
        openGrid: function (x, y) {
            if (Game.GameStart(x, y)) {
                if (!Game.isOver && !Block.Opened(x, y)) {
                    if (!Block.Flagged(x, y)) {
                        Game.openBlock();
                    }
                }
            }
        },
        setFlag: function (x, y) {
            if (Game.GameStart(x, y)) {
                if (!Block.Opened(x, y)) {
                    if (!Block.Flagged(x, y)) {
                        Block.setFlagged();
                        //add::before
                        Bar.setMineNum(-1);
                    } else {
                        Block.removeFlagged();
                        ////remove::before
                        Bar.setMineNum(1);
                    }
                }
            }
        },
        removeGrid: function () {  //应该不用这个
            ;
        },
        setGameOver: function (bool, x, y) {
            if (bool) {
                for (let i = 0; i < this.field.x; i++) {
                    for (let j = 0; j < this.field.y; j++) {
                        if (!Block.Opened(x, y)) {
                            //add flag
                        }
                    }
                }
            } else {
                //add bomb0
                for (let i = 0; i < this.field.x; i++) {
                    for (let j = 0; j < this.field.y; j++) {
                        if (Block.isBomb(i, j)) {
                            //add bomb
                        }
                        if (Block.Flagged(i, j) && !Block.isBomb(i, j)) {
                            //add wrongflag
                        }
                    }
                }
            }
        }
    }
});

let Block = new Vue({
    data: {
        isMine: [],
        isOpened: [],
        isFlagged: [],
    },
    methods: {
        initData: function () {
            for (let i = 0; i < Grid.field.x; i++) {
                this.isMine[i] = [];
                this.isOpened[i] = [];
                this.isFlagged[i] = [];
                for (let j = 0; j < Grid.field.x; j++) {
                    this.isMine[i][j] = false;
                    this.isOpened[i][j] = false;
                    this.isFlagged[i][j] = false;
                }
            }
        },
        generateMine: function (x, y, num) {
            for (let k = 0; k < num; k++) {
                const R1 = ~~(Math.random() * Grid.field.x);
                const R2 = ~~(Math.random() * Grid.field.y);
                if (R1 == x && R2 == y) {
                    k--;
                } else if (this.isBomb(R1, R2)) {
                    k--;
                } else {
                    this.isMine[R1][R2] = true;
                }
            }
        },
        Opened: function (x, y) {
            return this.isOpened[x][y];
        },
        Flagged: function (x, y) {
            return this.isFlagged[x][y];
        },
        isBomb: function (x, y) {
            return this.isMine[x][y];
        },
        setOpened: function (x, y) {
            this.isOpened[x][y] = true;
        },
        setFlagged: function (x, y) {
            this.isFlagged[x][y] = true;
        },
        removeFlagged: function (x, y) {
            this.isFlagged[x][y] = false;
        },

    }
});


let Game = new Vue({
    data: {
        diff: {
        0: { x: 9, y: 9, mineNum: 10, size:{width: '270px', height: '270px'} },
        1: { x: 16, y: 16, mineNum: 40, size:{width: '480px', height: '480px'} },
        2: { x: 30, y: 16, mineNum: 99, size:{width: '900px', height: '480px'} },
        },
        isStart: false,
        isOver: true,
        notMine: 0,
    },
    methods: {
        isGameEnd: function () {
            return this.isOver ? true : confirm('Reset Game?');
        },
        GameStart: function (x, y) { //有问题
            return this.isStart ? true : (
                !this.isStart,
                Block.initData(),
                Block.generateMine(x, y)
            );
        },
        openBlock: function (x, y) {
            if (!Block.isBomb(x, y)) {
                if (!Block.Flagged(x, y)) {
                    Block.isOpened = true;
                    //Grid.open
                    this.notMine = Grid.field.x * Grid.field.y - Grid.field.mineNum; //暂时放这
                    let count = 0;
                    around.forEach((v) => {
                        if (between(v[0], Grid.field.x) && between(v[1], Grid.field.y)) {
                            if ((Block.isBomb[v[0]] || {})[v[1]] || {}) count++;
                        }
                    });
                    const around = [
                        [x - 1, y - 1],
                        [x, y - 1],
                        [x + 1, y - 1],
                        [x - 1, y],
                        [x + 1, y],
                        [x - 1, y + 1],
                        [x, y + 1],
                        [x + 1, y + 1],
                    ];
                    if (count == 0) {
                        around.forEach((v) => {
                            if (between(v[0], Grid.field.x) && between(v[1], Grid.field.y)) {
                                if (!Block.Opened([v[0]], [v[1]])) {
                                    return this.openBlock(v[0], v[1]);
                                }
                            }
                        });
                    } else {
                        //class add mark
                    }
                }
            } else {
                this.result(false, x, y);
            }
        },
        result: function (bool, x, y) {
            let percent = (openedBlock / game.notMine * 100).toFixed(2);
            let message = {
                1 : "胜利！用时" + (time / 100).toFixed(2) + "秒！要进行下盘游戏吗？",
                2 : "糟糕踩到雷啦！完成度"+percent+"%！要不要重开一盘？"
            };
            this.isOver = true;
            this.isStart = false;
            Bar.stopTimer();
            Grid.setGameOver(bool, x, y);
            window.setTimeout(() => {
                if (bool ? confirm(message[1]) : confirm(message[2])) {
                    Bar.newGame();
                }
            });
        }
    }
});


//暂时
function between(x, max) {
    return x >= 0 && x <= (max - 1);
}