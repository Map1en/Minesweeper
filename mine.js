//Data
let mineNum = 10;
let flaggedMine = 0;
let xLength = 9;
let yLength = 9;
let step = 0;
let openedBlock = 0;
let time = 0;
let timer;
let isOver = false;

let bArea = document.getElementById("block-area");

//DOM
document.oncontextmenu = function (event) {
    event.preventDefault();
};
document.getElementById("easy").addEventListener("click", () => selectLevel("easy"));
document.getElementById("normal").addEventListener("click", () => selectLevel("normal"));
document.getElementById("hard").addEventListener("click", () => selectLevel("hard"));
document.getElementById("newBtn").addEventListener("click", () => newGame(xLength, yLength, mineNum));
document.getElementById("mine").innerHTML = mineNum;
document.getElementById("step").innerHTML = step;
document.getElementById("timer").innerHTML = time;

//Class
class Attr {
    constructor() {
        this.opened = false;
        this.flagged = false;
        this.isMine = false;
    }
}

class Block {
    constructor() {
        this.array = [];
        this.notMine;
    }
    setMine(x, y) {
        for (let i = 0; i < xLength; i++) {
            this.array[i] = [];
            for (let j = 0; j < yLength; j++) {
                this.array[i][j] = new Attr();
            }
        }
        for (let k = 0; k < mineNum; k++) {
            const R1 = ~~(Math.random() * xLength);
            const R2 = ~~(Math.random() * yLength);
            if (R1 == x && R2 == y) {      //第一次点击不会踩雷
                k--;
            } else if (this.array[R1][R2].isMine) {
                k--;
            } else {
                this.array[R1][R2].isMine = true;
            }
        }
    }
    removeMinefield() {
        while (bArea.firstChild) {
            bArea.removeChild(bArea.firstChild);
        }
    }
    setMinefield(x, y) {
        this.notMine = xLength * yLength - mineNum;
        for (let i = 0; i < y; i++) {
            let newDivy = document.createElement("div");
            newDivy.className = "row";
            for (let j = 0; j < x; j++) {
                let newDivx = document.createElement("div");
                newDivx.className = "unopened";
                newDivx.setAttribute("x", j);
                newDivx.setAttribute("y", i);
                newDivx.addEventListener(
                    "click", (event) => this.perOpen(
                        event.srcElement.attributes.x.value, event.srcElement.attributes.y.value
                    )
                );
                newDivx.addEventListener(
                    "auxclick", (event) => this.setFlag(
                        event.srcElement.attributes.x.value, event.srcElement.attributes.y.value
                    )
                );
                newDivy.appendChild(newDivx);
            }
            bArea.appendChild(newDivy);
        }
    }
    setFlag(x, y) {
        if (this.array[0] == undefined) {
            this.setMine(x, y);
            Timer();
        }
        if (!this.array[x][y].opened) {
            if (!this.array[x][y].flagged) {
                this.array[x][y].flagged = true;
                bArea.children[y].children[x].classList.add("flagged");
                if (flaggedMine < mineNum) {
                    flaggedMine++;
                }
                document.getElementById("mine").innerHTML = mineNum - flaggedMine;
            } else {
                this.array[x][y].flagged = false;
                bArea.children[y].children[x].classList.remove("flagged");
            }
        }
    }
    perOpen(x, y) {
        if (this.array[0] == undefined) {
            this.setMine(x, y);
            Timer();
        }
        if (!isOver && !this.array[x][y].opened) {
            step++;
            document.getElementById("step").innerHTML = step;
            this.openBlock(x, y);
        }
    }
    openBlock(x, y) {
        if (!this.array[x][y].isMine) {
            if (!this.array[x][y].flagged) {
                this.array[x][y].opened = true;
                bArea.children[y].children[x].setAttribute("class", "opened");
                openedBlock++;
                if (openedBlock == this.notMine) {
                    for (let i = 0; i < xLength; i++) {
                        for (let j = 0; j < yLength; j++) {
                            if (!this.array[i][j].opened) {
                                bArea.children[j].children[i].classList.add("bomb");
                            }
                        }
                    }
                    win();
                }
                x = parseInt(x);
                y = parseInt(y);
                const AROUND = [
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
                AROUND.forEach((item) => {
                    if (between(item[0], xLength) && between(item[1], yLength)) {
                        if (((this.array[item[0]] || {})[item[1]] || {}).isMine) {
                            count++;
                        }
                    }
                });
                if (count == 0) {
                    count = ""; //不显示0
                    AROUND.forEach((item) => {
                        if (between(item[0], xLength) && between(item[1], yLength)) {
                            if (!(this.array[item[0]][item[1]].opened)) {
                                return this.openBlock(item[0], item[1]);
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
}

let game = new Block();

//Result
function win() {
    clearInterval(timer);
    isOver = true;
    window.setTimeout(() => confirmNext("win"), 500);
}

function lose(x, y) {
    clearInterval(timer);
    isOver = true;
    bArea.children[y].children[x].classList.add("bomb0");
    for (let i = 0; i < xLength; i++) {
        for (let j = 0; j < yLength; j++) {
            if (game.array[i][j].isMine) {
                bArea.children[j].children[i].classList.add("bomb");
            }
        }
    }
    window.setTimeout(() => confirmNext("lose"), 500);
}

function confirmNext(result) {
    switch (result) {
        case "win":
            if (confirm("胜利！要进行下盘游戏吗？")) {
                Reset();
                game.setMinefield(xLength, yLength);
            }
            break;
        case "lose":
            if (confirm("糟糕踩到雷啦！要不要重开一盘？")) {
                Reset();
                game.setMinefield(xLength, yLength);
            }
            break;
    }
}

//NewGame
function newGame() {
    if (!bArea.firstChild) {
        game.setMinefield(xLength, yLength);
    } else if (confirm("是否要重置游戏？")) {
        Reset();
        game.setMinefield(xLength, yLength);
    }
}

function Reset() {
    clearInterval(timer);
    isOver = false;
    step = 0;
    openedBlock = 0;
    time = 0;
    flaggedMine = 0;
    document.getElementById("timer").innerHTML = time;
    document.getElementById("mine").innerHTML = mineNum;
    document.getElementById("step").innerHTML = step;
    game.removeMinefield();
    game.array = [];
}

//Level
function selectLevel(level) {
    switch (level) {
        case "easy":
            mineNum = 10;
            xLength = 9;
            yLength = 9;
            break;
        case "normal":
            mineNum = 40;
            xLength = 16;
            yLength = 16;
            break;
        case "hard":
            mineNum = 99;
            xLength = 30;
            yLength = 16;
            break;
    }
    newGame();
    document.getElementById("mine").innerHTML = mineNum;
}

//Tools
function Timer() {
    timer = setInterval(() => {           //issue：多次点击好像会创建很多timer，加速计时
        time++;
        document.getElementById("timer").innerHTML = time;
    }, 1000);
}

function between(x, max) {
    return x >= 0 && x <= (max - 1);
}



//------------------------------------------------------------------
//
// function doubleClick(x, y) {
//     if (game.array[x][y].opened) {

//         const around = [
//             [x - 1, y - 1],
//             [x, y - 1],
//             [x + 1, y - 1],
//             [x - 1, y],
//             [x + 1, y],
//             [x - 1, y + 1],
//             [x, y + 1],
//             [x + 1, y + 1],
//         ];
//         let mCount, fCount;
//         around.forEach(function(item) {
//             if ((game.array[item[0]] || {})([item[1]] || {}).isMine) {
//                 mCount++;
//             }
//             if ((game.array[item[0]] || {})([item[1]] || {}).flagged) {
//                 fCount++;
//             }
//         });
//         if (mCount == fCount) {
//             around.forEach(function(item) {
//                 if ((game.array[item[0]] || {})([item[1]] || {}).isMine) {
//                     if (!((game.array[item[0]] || {})([item[1]] || {}).flagged)) {
//                         lose();
//                     }
//                 } else {
//                     openBlock((game.array[item[0]] || {}), (game.array[item[1]] || {}));
//                 }
//             });
//         }
//     }
// }