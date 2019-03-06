let bar = new Vue({
    el: '#bar',
    data: {
        step: 0,
        time: 0,
        timer: undefined,
        mineNum: 40,
        level: [false, true, false],
    },
    methods: {
        selectLevel: function (x) {
            this.level = this.level.map(() => false);
            this.level[x] = true;
        },
        setGame: function () {
            ;
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
            this.mineNum = num;
        },
        resetStep: function () {
            this.step = 0;
        },
        resetTime: function () {
            clearInterval(this.timer);
        }
    }
})

let Block = new Vue({
    data: {
        isMine: [],
        isOpened: [],
        isflagged: [],
    },
    methods: {
        generateMine: function (x, y) {
            ;
        },
        initMark: function (x, y) {
            ;
        },
        setOpened: function (x, y) {
            this.isOpened[x][y] = true;
        },
        setFlagged: function (x, y) {
            this.isflagged[x][y] = true;
        },
        removeFlagged: function (x, y) {
            this.isflagged[x][y] = false;
        },
        isBomb: function (x, y) {
            return this.isMine[x][y];
        }
    }
})























// //initData
// let blockData = {
//     xLen : 16,
//     yLen : 16,
//     mineNum : 40,
//     width : 480,
//     height : 480
// }
// let timer;

// //DOM
// let bArea = document.getElementById("block-area");
// let easyLevel = document.getElementById("easy");
// let normalLevel = document.getElementById("normal");
// let hardLevel = document.getElementById("hard");

// setBar();

// //Class
// class Attr {
//     constructor() {
//         this.opened = false;
//         this.flagged = false;
//         this.isMine = false;
//     }
// }

// class Block {
//     constructor() {
//         this.array = [];
//         this.notMine;
//     }
//     setMine(x, y) {
//         for (let i = 0; i < blockData["xLen"]; i++) {
//             this.array[i] = [];
//             for (let j = 0; j < blockData["yLen"]; j++) {
//                 this.array[i][j] = new Attr();
//             }
//         }
//         for (let k = 0; k < blockData["mineNum"]; k++) {
//             const R1 = ~~(Math.random() * blockData["xLen"]);
//             const R2 = ~~(Math.random() * blockData["yLen"]);
//             if (R1 == x && R2 == y) {      //第一次点击不会踩雷
//                 k--;
//             } else if (this.array[R1][R2].isMine) {
//                 k--;
//             } else {
//                 this.array[R1][R2].isMine = true;
//             }
//         }
//     }
//     detectSetMine(x, y) {
//         if (this.array[0] == undefined) {
//             this.setMine(x, y);
//             Timer();
//         }
//     }
//     removeMinefield() {
//         while (bArea.firstChild) {
//             bArea.removeChild(bArea.firstChild);
//         }
//     }
//     setMinefield(x, y) {
//         this.notMine = blockData["xLen"] * blockData["yLen"] - blockData["mineNum"];
//         for (let i = 0; i < y; i++) {
//             let newDivy = document.createElement("div");
//             newDivy.className = "row";
//             for (let j = 0; j < x; j++) {
//                 let newDivx = document.createElement("div");
//                 newDivx.className = "unopened";
//                 newDivx.setAttribute("x", j);
//                 newDivx.setAttribute("y", i);
//                 //添加点击事件
//                 newDivx.addEventListener(
//                     "click", (event) => this.perOpen(
//                         event.srcElement.attributes.x.value, event.srcElement.attributes.y.value
//                     )
//                 );
//                 newDivx.addEventListener(
//                     "contextmenu", (event) => this.setFlag(
//                         event.srcElement.attributes.x.value, event.srcElement.attributes.y.value
//                     )
//                 );
//                 newDivy.appendChild(newDivx);
//             }
//             bArea.setAttribute("style", "width: " + blockData["width"] +"px; height: "+ blockData["height"] +"px;")
//             bArea.appendChild(newDivy);
//             bArea.addEventListener("contextmenu", (event) => event.preventDefault());  //点到缝隙会出菜单，改至上层div禁用
//         }
//     }
//     setFlag(x, y) {
//         this.detectSetMine(x, y);
//         if (!this.array[x][y].opened) {
//             if (!this.array[x][y].flagged) {
//                 this.array[x][y].flagged = true;
//                 bArea.children[y].children[x].classList.add("flagged");
//                 if (flaggedMine < blockData["mineNum"]) flaggedMine++;
//             } else {
//                 this.array[x][y].flagged = false;
//                 bArea.children[y].children[x].classList.remove("flagged");
//                 if (flaggedMine > 0) flaggedMine--;
//             }
//         }
//         setStep();
//         setMineNum();
//     }
//     perOpen(x, y) {
//         this.detectSetMine(x, y);
//         if (!isOver && !this.array[x][y].opened) {
//             if (!this.array[x][y].flagged) {
//                 this.openBlock(x, y);
//                 setStep();
//             }
//         }
//     }
//     openBlock(x, y) {
//         if (!this.array[x][y].isMine) {
//             if (!this.array[x][y].flagged) {
//                 this.array[x][y].opened = true;
//                 bArea.children[y].children[x].className = "opened";
//                 openedBlock++;
//                 if (openedBlock == this.notMine) result(true);
//                 x = +x;
//                 y = +y;
//                 const AROUND = [
//                     [x - 1, y - 1],
//                     [x, y - 1],
//                     [x + 1, y - 1],
//                     [x - 1, y],
//                     [x + 1, y],
//                     [x - 1, y + 1],
//                     [x, y + 1],
//                     [x + 1, y + 1],
//                 ];
//                 let count = 0;
//                 AROUND.forEach((item) => {
//                     if (between(item[0], blockData["xLen"]) && between(item[1], blockData["yLen"])) {
//                         if (((this.array[item[0]] || {})[item[1]] || {}).isMine) count++;
//                     }
//                 });
//                 if (count == 0) {
//                     AROUND.forEach((item) => {
//                         if (between(item[0], blockData["xLen"]) && between(item[1], blockData["yLen"])) {
//                             if (!(this.array[item[0]][item[1]].opened)) {
//                                 return this.openBlock(item[0], item[1]);
//                             }
//                         }
//                     });
//                 } else {
//                     bArea.children[y].children[x].classList.add("mark" + count);
//                     bArea.children[y].children[x].innerHTML = count;
//                 }
//             }
//         } else {
//             result(false, x, y);
//         }
//     }
//     gameOver(result, x, y) {
//         if (result) {
//             for (let i = 0; i < blockData["xLen"]; i++) {
//                 for (let j = 0; j < blockData["yLen"]; j++) {
//                     if (!this.array[i][j].opened) {
//                         bArea.children[j].children[i].classList.add("flagged");
//                     }
//                 }
//             }
//         } else {
//             bArea.children[y].children[x].classList.add("bomb0");
//             for (let i = 0; i < blockData["xLen"]; i++) {
//                 for (let j = 0; j < blockData["yLen"]; j++) {
//                     if (this.array[i][j].isMine) {
//                         bArea.children[j].children[i].classList.add("bomb");
//                     }
//                     if (this.array[i][j].flagged && !this.array[i][j].isMine) {
//                         bArea.children[j].children[i].classList.add("wrongflag");
//                     }
//                 }
//             }
//         }
//     }
// }

// let game = new Block();

// function result(end, x, y) {
//     stopTimer();
//     isOver = true;
//     game.gameOver(end, x, y);
//     window.setTimeout(() => confirmNext(end), 500);
// }

// function confirmNext(result) {
//     let percent = (openedBlock / game.notMine * 100).toFixed(2);
//     let message = {
//         1 : "胜利！用时" + (time / 100).toFixed(2) + "秒！要进行下盘游戏吗？",
//         2 : "糟糕踩到雷啦！完成度"+percent+"%！要不要重开一盘？"
//     };
//     if (result ? confirm(message[1]) : confirm(message[2])) {
//         initGame();
//         game.setMinefield(blockData["xLen"], blockData["yLen"]);
//     }
// }

// function newGame() {
//     if ((!bArea.firstChild || time == 0) ? true : confirm("是否要重置游戏？")) {
//         initGame();
//         game.setMinefield(blockData["xLen"], blockData["yLen"]);
//     }
// }

// function initGame() {
//     stopTimer();
//     time = 0;
//     step = 0;
//     flaggedMine = 0;
//     openedBlock = 0;
//     isOver = false;
//     setInnerById("mine", blockData["mineNum"]);
//     setInnerById("step", step);
//     setInnerById("timer", time);
//     game.removeMinefield();
//     game.array = [];
// }

// function selectLevel(level) {
//     const DIFF = {
//         easy :   { xLen : 9, yLen : 9, mineNum : 10, width : 270, height : 270 },
//         normal : { xLen : 16, yLen : 16, mineNum : 40, width : 480, height : 480 },
//         hard :   { xLen : 30, yLen : 16, mineNum : 99, width : 900, height : 480 }
//     }
//     switch (level) {
//         case "easy":
//             blockData = DIFF["easy"];
//             easyLevel.className = "selected";
//             normalLevel.className = "unselected";
//             hardLevel.className = "unselected";
//             break;
//         case "normal":
//             blockData = DIFF["normal"];
//             easyLevel.className = "unselected";
//             normalLevel.className = "selected";
//             hardLevel.className = "unselected";
//             break;
//         case "hard":
//             blockData = DIFF["hard"];
//             easyLevel.className = "unselected";
//             normalLevel.className = "unselected";
//             hardLevel.className = "selected";
//             break;
//     }
//     newGame();
// }

// //Tools
// function setBar() {
//     easyLevel.addEventListener("click", () => selectLevel("easy"));
//     normalLevel.addEventListener("click", () => selectLevel("normal"));
//     hardLevel.addEventListener("click", () => selectLevel("hard"));
//     document.getElementById("newBtn").addEventListener("click", () => newGame());
// }

// function setStep() {
//     step++;
//     document.getElementById("step").innerHTML = step;
// }

// function setMineNum() {
//     document.getElementById("mine").innerHTML = blockData["mineNum"] - flaggedMine;
// }

// function Timer() {
//     timer = setInterval(() => {
//         time++;
//         document.getElementById("timer").innerHTML = (time / 100).toFixed(0);
//     }, 10);
// }

// function stopTimer() {
//     clearInterval(timer);
// }

// function setInnerById(id, content) {
//     document.getElementById(id).innerHTML = content;
// }

// function between(x, max) {
//     return x >= 0 && x <= (max - 1);
// }

// window.onload = newGame();


// //------------------------------------------------------------------
// //
// // function doubleClick(x, y) {
// //     if (game.array[x][y].opened) {

// //         const around = [
// //             [x - 1, y - 1],
// //             [x, y - 1],
// //             [x + 1, y - 1],
// //             [x - 1, y],
// //             [x + 1, y],
// //             [x - 1, y + 1],
// //             [x, y + 1],
// //             [x + 1, y + 1],
// //         ];
// //         let mCount, fCount;
// //         around.forEach(function(item) {
// //             if ((game.array[item[0]] || {})([item[1]] || {}).isMine) {
// //                 mCount++;
// //             }
// //             if ((game.array[item[0]] || {})([item[1]] || {}).flagged) {
// //                 fCount++;
// //             }
// //         });
// //         if (mCount == fCount) {
// //             around.forEach(function(item) {
// //                 if ((game.array[item[0]] || {})([item[1]] || {}).isMine) {
// //                     if (!((game.array[item[0]] || {})([item[1]] || {}).flagged)) {
// //                         lose();
// //                     }
// //                 } else {
// //                     openBlock((game.array[item[0]] || {}), (game.array[item[1]] || {}));
// //                 }
// //             });
// //         }
// //     }
// // }