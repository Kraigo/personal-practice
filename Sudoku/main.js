'use strict';

let DEBUG = false;

document.addEventListener("DOMContentLoaded", function() {
    const battlefield = new Battlefield();
    battlefield.build('#battlefield')

    document.getElementById('walk')
        .addEventListener('click', () => {
            battlefield.walk();
        })

    document.getElementById('solve')
        .addEventListener('click', () => {
            battlefield.solve();
        })

    document.getElementById('clear')
        .addEventListener('click', () => {
            battlefield.clear();
        })

    document.getElementById('random')
        .addEventListener('click', () => {
            battlefield.randomSolve();
        })

    document.getElementById('log')
        .addEventListener('click', () => {
            const data = battlefield.getData();
            console.log(JSON.stringify(data));
        })
    document.getElementById('debug')
        .addEventListener('click', () => {
            DEBUG = !DEBUG
            document.body.classList.toggle('debug', DEBUG)
        })
    document.getElementById('check')
        .addEventListener('click', () => {
            var hasError = battlefield.checkErrors();
            if (hasError) {
                hasError.input.classList.add('has-error');
            }
            console.log("Has Error", !!hasError)
        })

    document.getElementById('load0')
        .addEventListener('click', () => {
            const testData = [[5, 0, 2],[7, 0, 6],[2, 1, 5],[3, 1, 7],[4, 1, 8],[4, 2, 5],[8, 2, 6],[5, 3, 1],[9, 3, 7],[2, 3, 8],[9, 4, 3],[6, 4, 6],[8, 4, 8],[8, 5, 1],[4, 5, 2],[2, 5, 4],[5, 5, 6],[2, 6, 1],[5, 6, 4],[1, 6, 5],[7, 7, 4],[8, 7, 5],[2, 7, 6],[9, 7, 8],[6, 8, 2],[7, 8, 7]];
            battlefield.load(testData);
        })
    document.getElementById('load1')
        .addEventListener('click', () => {
            const testData = [[9, 0, 1],[2, 0, 3],[6, 0, 4],[3, 0, 5],[8, 0, 7],[8, 1, 1],[3, 1, 7],[6, 3, 2],[9, 3, 3],[5, 3, 5],[8, 3, 6],[2, 4, 0],[5, 4, 1],[6, 4, 7],[9, 4, 8],[1, 5, 2],[6, 5, 3],[4, 5, 5],[2, 5, 6],[3, 6, 4],[6, 7, 1],[9, 7, 7],[3, 8, 1],[1, 8, 3],[5, 8, 4],[6, 8, 5],[2, 8, 7]];
            battlefield.load(testData);
        })
        
    document.getElementById('load2')
        .addEventListener('click', () => {
            const testData = [[9,0,2],[5,0,6],[5,1,0],[8,1,8],[7,2,1],[4,2,3],[8,2,5],[9,2,7],[9,3,0],[7,3,8],[3,4,1],[7,4,2],[4,4,6],[8,4,7],[4,5,0],[1,5,8],[2,6,1],[6,6,3],[5,6,5],[7,6,7],[8,7,0],[5,7,8],[5,8,2],[3,8,6]];
            battlefield.load(testData);
        })

    document.getElementById('load0').click();


})

class Cell {

    constructor(input, r, c) {
        this._variants = [];
        this.input = input;
        this.row = r;
        this.col = c;
        input.addEventListener('input', this.inputValidation)
    }

    get value() {
        return Number(this.input.value);
    }

    set value(val) {
        this.input.value = val;
    }

    get variants() {
        return this._variants
    }

    set variants(val) {
        this._variants = val;
        // const view = [1, 2, 3, ' ', 4, 5, 6, ' ', 7, 8, 9]
        //     .map(i => i ==  val.includes(i) ? i : '\a0')
        //     .join('')

        // const dataVariants = view.slice(0, 2) + ' ' + view.slice(2, 5) + ' ' + view.slice(5, 8);
        this.input.parentElement.setAttribute('data-variants', val.join(""))
    }

    get isEmpty() {
        return this.input.value === '';
    }

    inputValidation(event) {
        const value = event.target.value
            .replace(/[^1-9]/g, '')
            .substr(-1);
        event.target.value = value;
    }
}

class Battlefield {

    size = 3 * 3;
    squareSize = 3;
    area = null;
    shouldBe = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() {
        this.area = [];
        for (let r = 0; r < this.size; r++) {
            this.area[r] = [];
            for (let c = 0; c < this.size; c++) {
                const input = document.createElement('input')
                this.area[r][c] = new Cell(input, r, c);
            }
        }

        const onFocus = (val) => {
            if (!val) return;
            this.eachCell(cell => {
                if (cell.value === val) {
                    cell.input.classList.add('in-focus');
                }
            })
        }
        const onBlur = () => {
            this.eachCell(cell => {
                cell.input.className = ''
            })
        }

        this.eachCell(cell => {
            cell.input.addEventListener('focus', () => onFocus(cell.value));
            cell.input.addEventListener('blur', () => onBlur());
            cell.input.addEventListener('input', () => {onBlur();onFocus(cell.value)});
        })
    }

    eachCell(cb) {
        if (!(typeof cb === 'function')) return;

        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
               cb(this.area[r][c])
            }
        }
    }

    build(selector) {
        const container = document.querySelector(selector);

        const table = document.createElement("table");


        for (let r = 0; r < this.area.length; r++) {

            const tr = document.createElement("tr");
            for (let c = 0; c < this.area[r].length; c++) {
                const td = document.createElement("td");
                const input = this.area[r][c].input;

                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.appendChild(table);
    }

    load(data) {
        this.clear();

        for (let [number, row, column] of data) {
            this.add(number, row, column);
        }

        if (DEBUG) {
            this.eachCell(cell => {
                cell.input.className = ''
            })
        }
    }

    getData() {
        const result = [];
        
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (!this.area[r][c].value) continue;
                result.push([Number(this.area[r][c].value), r, c]);
            }
        }
        return result;
    }

    add(number, row, col) {
        const cell = this.area[row][col];
        cell.value = number;
    }

    clear() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const input = this.area[r][c];
                input.value = '';
            }
        }
    }

    isAvailable(number, row, col) {
        let colStart = Math.floor(col / this.squareSize) * this.squareSize;
        let rowStart = Math.floor(row / this.squareSize) * this.squareSize;

        for (let r = rowStart; r < rowStart + this.squareSize; r++) {
            for (let c = colStart; c < colStart + this.squareSize; c++) {
                if (this.area[r][c].value === number) {
                    return false;
                }
            }
        }

        for (let c = 0; c < this.size; c++) {
            if (this.area[row][c].value === number) {
                return false;
            }
        }

        for (let r = 0; r < this.size; r++) {
            if (this.area[r][col].value === number) {
                return false;
            }
        }

        return true;
    }

    checkSquare(number, row, col) {
        const colStart = Math.floor(col / this.squareSize) * this.squareSize;
        const rowStart = Math.floor(row / this.squareSize) * this.squareSize;
        let result = null

        for (let r = rowStart; r < rowStart + this.squareSize; r++) {
            for (let c = colStart; c < colStart + this.squareSize; c++) {
                const cell = this.area[r][c];
                if (!cell.isEmpty) continue;
                if (this.isAvailable(number, r, c)) {
                    if (result) {
                        return false;
                    }
                    result = {
                        row: r,
                        col: c
                    };
                }
            }
        }

        return result;
    }

    checkLine(number, row, col) {
        let result = null

        
        for (let c = 0; c < this.area.length; c++) {
            const cell = this.area[row][c];
            if (!cell.isEmpty) continue;
            if (this.isAvailable(number, row, c)) {
                if (result) {
                    return false;
                }
                result = {
                    row: row,
                    col: c
                }
            }
        }

        for (let r = 0; r < this.area[0].length; r++) {
            const cell = this.area[r][col];
            if (!cell.isEmpty) continue;
            if (this.isAvailable(number, r, col)) {
                if (result) {
                    return false;
                }
                result = {
                    row: r,
                    col: col
                }
            }
        }
        return result;
    }

    getVariants(row, col) {
        let allVariants = [];

        for (let c = 0; c < this.area.length; c++) {
            allVariants.push(this.area[row][c].value);
        }

        for (let r = 0; r < this.area[0].length; r++) {
            allVariants.push(this.area[r][col].value);
        }

        const colStart = Math.floor(col / this.squareSize) * this.squareSize;
        const rowStart = Math.floor(row / this.squareSize) * this.squareSize;

        for (let r = rowStart; r < rowStart + this.squareSize; r++) {
            for (let c = colStart; c < colStart + this.squareSize; c++) {
                allVariants.push(this.area[r][c].value);
            }
        }
        allVariants = allVariants
            .filter(v => v)
            .filter((v, i, arr) => arr.indexOf(v) === i);

        return this.shouldBe
            .filter(s => !allVariants.includes(s))
    }

    updateVariants() {
        for (let r = 0; r < this.area.length; r++) {
            for (let c = 0; c < this.area[r].length; c++) {
                const cell = this.area[r][c];
                if (cell.isEmpty) {
                    cell.variants = this.getVariants(r, c);
                } else {
                    cell.variants = [];
                }
            }
        }
    }


    walk() {
        let found = false;
        for (let r = 0; r < this.area.length; r = r + this.squareSize) {
            for (let c = 0; c < this.area[r].length; c = c + this.squareSize) {
                for (let n of this.shouldBe) {
                    const result = this.checkSquare(n, r, c);
                    if (result) {
                        this.add(n, result.row, result.col);
                        found = true;
                    }
                }
            }
        }
        for (let r = 0; r < this.area.length; r = r + this.squareSize) {
            for (let c = 0; c < this.area[r].length; c = c + this.squareSize) {
                for (let n of this.shouldBe) {
                    const result = this.checkLine(n, r, c);
                    if (result) {
                        this.add(n, result.row, result.col);
                        found = true;
                    }
                }
            }
        }


        this.updateVariants();

        for (let r = 0; r < this.area.length; r++) {
            for (let c = 0; c < this.area[r].length; c++) {
                const cell = this.area[r][c];
                if (!cell.isEmpty) continue;

                if (cell.variants.length === 1) {
                    this.add(cell.variants[0], r, c);
                    found = true;
                }
            }
        }

        this.updateVariants();

        return found;
    }

    solve() {
        let round = 0;
        while (this.walk()) {console.log(`Walk ${++round}`)}
        console.log("Finished");
    }


    randomWalk() {
        let found = false;
        this.updateVariants();

        for (let r = 0; r < this.area.length; r++) {
            for (let c = 0; c < this.area[r].length; c++) {
                const cell = this.area[r][c];
                if (!cell.isEmpty) continue;

                if (cell.variants.length === 1) {
                    this.add(cell.variants[0], r, c);
                    found = true;
                }
            }
        }

        return found;

    }

    randomSolve() {
        while (this.walk()) {}
        const data = this.getData()

        console.log("Found all solved")
        let i = 1000;

        do {
            this.updateVariants();
            this.addRandom()

            while (this.randomWalk()) {}

            this.updateVariants();
            const hasError = this.checkErrors();
            if (hasError) {
                this.load(data);

                if (DEBUG) {
                    hasError.input.classList.add('has-error')
                }
            }

            if (this.getEmptyList().length === 0) {
                break;
            }

            // const hasVariants = empty.some(a => a.variants.length);

            // if (!hasVariants) {
            //     this.load(data);
            // }
            
        } while (--i > 0);
    }
    

    addRandom() {
        const empty = this.getEmptyList()
            .filter(a => a.variants.length);

        if (empty.length) {
            const cell = empty[Math.floor(Math.random() * empty.length)]
            const variant = cell.variants[Math.floor(Math.random() * cell.variants.length)]
            cell.value = variant;

            if (DEBUG) {
                cell.input.classList.add('random')
            }
        }
    }

    getEmptyList() {
        const empty = [];
        for (let r = 0; r < this.area.length; r++) {
            for (let c = 0; c < this.area[r].length; c++) {
                const cell = this.area[r][c];
                if (!cell.isEmpty) continue;
                empty.push(cell);
            }
        }
        return empty;
    }

    checkErrors() {
        const errors = [];

        for (let r = 0; r < this.size; r++) {
            const rowValues = []
            for (let c = 0; c < this.size; c++) {
                const cell = this.area[r][c];
                if (cell.value === 0) continue;
                if (rowValues.includes(cell.value)) {
                    return cell;
                }
                rowValues.push(cell.value)
            }
        }

        for (let c = 0; c < this.size; c++) {
            const colValues = []
            for (let r = 0; r < this.size; r++) {
                const cell = this.area[r][c];
                if (cell.value === 0) continue;
                if (colValues.includes(cell.value)) {
                    return cell;
                }
                colValues.push(cell.value)
            }
        }

        for (let r = 0; r < this.size; r = r + this.squareSize) {
            for (let c = 0; c < this.size; c = c + this.squareSize) {
                const squareValues = []

                for (let squareR = r + 2; squareR >= r; squareR--) {
                    for (let squareC = c + 2; squareC >= c; squareC--) {
                        const cell = this.area[squareC][squareR];
                        if (cell.value === 0) continue;
                        if (squareValues.includes(cell.value)) {
                            return cell;
                        }
                        squareValues.push(cell.value)
                    }
                }
            }
        }

        return null;
        
    }
}