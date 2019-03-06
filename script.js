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
        initBlock: function (x, y) {
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
        },
    }
})

let Grid = new Vue({
    el: '#grid',
    data: {
        //大概需要组件化
    },
    methods: {
        setGrid: function (x, y) {
            ;
        },
        setFlag: function (x, y) {
            ;
        },
        removeFlag: function (x, y) {
            ;
        }
    }
})

let Game = new Vue({
    data: {
        diff: {
        easy :   { xLen : 9, yLen : 9, mineNum : 10, width : 270, height : 270 },
        normal : { xLen : 16, yLen : 16, mineNum : 40, width : 480, height : 480 },
        hard :   { xLen : 30, yLen : 16, mineNum : 99, width : 900, height : 480 },
        }
    }
})
