var mineNum = 10;
var sLength = 8;
var step = 0;
var openedBlock = 0;

class Block {
    constructor() {
        this.opened = false;
        this.flagged = false;
        this.ismine = false;
    }
}

class Area {
    constructor() {
        this.array = [];
    }
    setBlock(x, y, z) {
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                this.array[j][i] = new Block();
            }
        }
        for (let i = 0; i < z; i++) {
            const r1 = (Math.random() * (x - 0 + 1) | 0) + 0;
            const r2 = (Math.random() * (y - 0 + 1) | 0) + 0;
            this.array[r1][r2].ismine = true;
        }
    }
    setFlag(x, y) {
        this.array[x][y].flagged = true;
        mine--;
    }
    setOpened(x, y) {
        this.array[x][y].opened = true;
    }
}

function setTimer() {
    let time = 0;
    var timer = setInterval(() => {
        time++;
    }, 1000);
}

function newGame(length, num) {
    let a1 = new Area();
    a1.setBlock(length, length, num);
    setTimer();
    step = 0;
}

function win() {
    clearInterval(timer);
}

function lose() {
    clearInterval(timer);
}

function openBlock(x, y) {
    if (!a1.array[x][y].flagged) {
        a1.array[x][y].opened = true;
        openedBlock++;
        notMine = length * length - mineNum;
        if (openedBlock == notMine) {
            win();
        }
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
        let count = 0;
        around.forEach(function(item) {
            if ((a1.array[item[0]] || {})([item[1]] || {}).ismine) {
                count++;
            }
        });
        if (count == 0) {
            count = ""; //不显示0
            return around.forEach(function(item) {
                openBlock((a1.array[item[0]] || {}), (a1.array[item[1]] || {}));
            });
        }else {
            //显示数字
        }
        }
    }

function click(x, y) {
    if(a1.array[x][y].ismine) {
        lose();
    }else {
        openBlock(x, y);
        step++;
    }
}

function doubleClick(x, y) {
    if (a1.array[x][y].opened) {
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
        let mCount, fCount;
        around.forEach(function(item) {
            if ((a1.array[item[0]] || {})([item[1]] || {}).ismine) {
                mCount++;
            }else if ((a1.array[item[0]] || {})([item[1]] || {}).flagged) {
                fCount++;
            }
        });
        if (mCount == fCount) {
            around.forEach(function(item) {
                if ((a1.array[item[0]] || {})([item[1]] || {}).ismine) {
                    if (!((a1.array[item[0]] || {})([item[1]] || {}).flagged)) {
                        lose();
                    }
                }else {
                    openBlock((a1.array[item[0]] || {}), (a1.array[item[1]] || {}));
                }
            });
        }
    }
}