let mineNum = 10;
let sLength = 8;
let step = 0;
let openedBlock = 0;
let time = 0;


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
        for (let i = 0; i < x; i++) {
            this.array[i] = [];
            for (let j = 0; j < y; j++) {
                this.array[i][j] = new Block();
            }
        }
        for (let k = 0; k < z; k++) {
            const r1 = ~~(Math.random() * x);
            const r2 = ~~(Math.random() * y);
            this.array[r1][r2].ismine = true;
        }
    }
    setFlag(x, y) {
        this.array[x][y].flagged = true;
        mineNum--;
    }
    setOpened(x, y) {
        this.array[x][y].opened = true;
    }
}

function op(data) {
    alert(data);
}

function newGame(x, y, num) {
    let a1 = new Area();
    a1.setBlock(x, y, num);
    time = 0;
    timer = setInterval(() => {           //issue：多次点击好像会创建很多timer，加速计时
        time++;
        document.getElementById("timer").innerHTML = time;
    }, 1000);
    step = 0;
    openedBlock = 0;

    let bArea = document.getElementById("block-area");
    for (let i = 0; i < y; i++) {
        let newDivy = document.createElement("div");
        newDivy.className = "row";
        for (let j = 0; j < x; j++) {
            let newDivx = document.createElement("div");
            newDivx.className = "unopened";
            // let op = open(this);
            newDivx.addEventListener("click", () => op(this));
            newDivy.appendChild(newDivx);
        }
        bArea.appendChild(newDivy);
    }
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
            around.forEach(function(item) {
                return openBlock((a1.array[item[0]] || {}), (a1.array[item[1]] || {}));
            });
        } else {
            //显示数字
        }
    }
}

function click(x, y) {
    if (a1.array[x][y].ismine) {
        lose();
    } else {
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
            }
            if ((a1.array[item[0]] || {})([item[1]] || {}).flagged) {
                fCount++;
            }
        });
        if (mCount == fCount) {
            around.forEach(function(item) {
                if ((a1.array[item[0]] || {})([item[1]] || {}).ismine) {
                    if (!((a1.array[item[0]] || {})([item[1]] || {}).flagged)) {
                        lose();
                    }
                } else {
                    openBlock((a1.array[item[0]] || {}), (a1.array[item[1]] || {}));
                }
            });
        }
    }
}

document.getElementById("newBtn").addEventListener("click", () => newGame(sLength, sLength, mineNum));
document.getElementById("mine").innerHTML = mineNum;
document.getElementById("step").innerHTML = step;
document.getElementById("timer").innerHTML = time;