document.oncontextmenu = function (event) {
    event.preventDefault();
};
let mineNum = 10;
let sLength = 9;
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
    setBlock(x, y) {
        for (let i = 0; i < sLength; i++) {
            this.array[i] = [];
            for (let j = 0; j < sLength; j++) {
                this.array[i][j] = new Block();
            }
        }
        for (let k = 0; k < mineNum; k++) {
            const r1 = ~~(Math.random() * sLength);
            const r2 = ~~(Math.random() * sLength);
            if (r1 == x && r2 == y) {      //第一次点击不会踩雷
                k--;
            } else if (this.array[r1][r2].ismine) {
                k--;
            } else {
                this.array[r1][r2].ismine = true;
            }
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

let a1 = new Area();
let bArea = document.getElementById("block-area");


function newGame(x, y) {
    time = 0;
    timer = setInterval(() => {           //issue：多次点击好像会创建很多timer，加速计时
        time++;
        document.getElementById("timer").innerHTML = time;
    }, 1000);
    step = 0;
    openedBlock = 0;

    for (let i = 0; i < y; i++) {
        let newDivy = document.createElement("div");
        newDivy.className = "row";
        for (let j = 0; j < x; j++) {
            let newDivx = document.createElement("div");
            newDivx.className = "unopened";
            newDivx.setAttribute("x", j);
            newDivx.setAttribute("y", i);
            newDivx.addEventListener(
                "click", (event) =>open(
                    event.srcElement.attributes.x.value, event.srcElement.attributes.y.value
                )
            );
            newDivx.addEventListener(
                "auxclick", (event) =>flag(
                    event.srcElement.attributes.x.value, event.srcElement.attributes.y.value
                )
            );
            newDivy.appendChild(newDivx);
        }
        bArea.appendChild(newDivy);
    }
}

function win() {
    // clearInterval(timer);
    console.log(win);
}

function lose(x, y) {
    // clearInterval(timer);
    console.log(lose);
    bArea.children[y].children[x].classList.add("bomb0");
    for (let i = 0; i < sLength; i++) {
        for (let j = 0; j < sLength; j++) {
            if (a1.array[i][j].ismine) {
                bArea.children[j].children[i].classList.add("bomb");
            }
        }
    }
}

function between(x, max) {
    return x >= 0 && x <= (max - 1);
}

function open(x, y) {
    if (a1.array[0] == undefined) {
        a1.setBlock(x, y);
    }
    openBlock(x, y);
    step++;
    document.getElementById("step").innerHTML = step;
}

function openBlock(x, y) {
    if (!a1.array[x][y].ismine) {
        if (!a1.array[x][y].flagged) {
            a1.array[x][y].opened = true;
            bArea.children[y].children[x].setAttribute("class", "opened");
            openedBlock++;
            notMine = sLength * sLength - mineNum;
            if (openedBlock == notMine) {
                win();
            }
            x = parseInt(x);
            y = parseInt(y);
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
                if (between(item[0], sLength) && between(item[1], sLength)) {
                    if (((a1.array[item[0]] || {})[item[1]] || {}).ismine) {
                        count++;
                    }
                }
            });
            if (count == 0) {
                count = ""; //不显示0
                around.forEach(function(item) {
                    if (between(item[0], sLength) && between(item[1], sLength)) {
                        if (!(a1.array[item[0]][item[1]].opened)) {
                            return openBlock(item[0], item[1]);
                        }
                    }
                });
            } else {
                bArea.children[y].children[x].innerHTML = count;
            }
        }
    } else {
        lose(x, y);
    }
}

function flag(x, y) {
    if (!a1.array[x][y].opened) {
        if (!a1.array[x][y].flagged) {
            a1.array[x][y].flagged = true;
            bArea.children[y].children[x].classList.add("flagged");
        } else {
            a1.array[x][y].flagged = false;
            bArea.children[y].children[x].classList.remove("flagged");
        }
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