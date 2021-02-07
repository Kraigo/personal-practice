'use strict';

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

    document.getElementById('log')
        .addEventListener('click', () => {
            const data = battlefield.pull();
            console.log(JSON.stringify(data));
        })
    document.getElementById('debug')
        .addEventListener('click', () => {
            document.body.classList.toggle('debug')
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

    document.getElementById('load0').click();


})

class Cell {
    _variants = []

    constructor(input) {
        this.input = input;
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
        for (var r = 0; r < this.size; r++) {
            this.area[r] = [];
            for (var c = 0; c < this.size; c++) {
                const input = document.createElement('input')
                this.area[r][c] = new Cell(input);
            }
        }
    }

    build(selector) {
        const container = document.querySelector(selector);

        const table = document.createElement("table");


        for (var r = 0; r < this.area.length; r++) {

            const tr = document.createElement("tr");
            for (var c = 0; c < this.area[r].length; c++) {
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
    }

    pull() {
        const result = [];
        for (var r = 0; r < this.area.length; r++) {
            for (var c = 0; c < this.area[r].length; c++) {
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
        for (var r = 0; r < this.area.length; r++) {
            for (var c = 0; c < this.area[r].length; c++) {
                const input = this.area[r][c];
                input.value = '';
            }
        }
    }

    isAvailable(number, row, col) {
        var colStart = Math.floor(col / this.squareSize) * this.squareSize;
        var rowStart = Math.floor(row / this.squareSize) * this.squareSize;

        for (var r = rowStart; r < rowStart + this.squareSize; r++) {
            for (var c = colStart; c < colStart + this.squareSize; c++) {
                if (this.area[r][c].value === number) {
                    return false;
                }
            }
        }

        for (var c = 0; c < this.area.length; c++) {
            if (this.area[row][c].value === number) {
                return false;
            }
        }

        for (var r = 0; r < this.area[row].length; r++) {
            if (this.area[r][col].value === number) {
                return false;
            }
        }

        return true;
    }

    checkSquare(number, row, col) {
        var colStart = Math.floor(col / this.squareSize) * this.squareSize;
        var rowStart = Math.floor(row / this.squareSize) * this.squareSize;
        var result = null

        for (var r = rowStart; r < rowStart + this.squareSize; r++) {
            for (var c = colStart; c < colStart + this.squareSize; c++) {
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
        var result = null

        
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

        for (var r = rowStart; r < rowStart + this.squareSize; r++) {
            for (var c = colStart; c < colStart + this.squareSize; c++) {
                allVariants.push(this.area[r][c].value);
            }
        }
        allVariants = allVariants
            .filter(v => v)
            .filter((v, i, arr) => arr.indexOf(v) === i);

        return this.shouldBe
            .filter(s => !allVariants.includes(s))
    }

    updateVariantas() {
        for (var r = 0; r < this.area.length; r++) {
            for (var c = 0; c < this.area[r].length; c++) {
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
        for (var r = 0; r < this.area.length; r = r + this.squareSize) {
            for (var c = 0; c < this.area[r].length; c = c + this.squareSize) {
                for (var n of this.shouldBe) {
                    var result = this.checkSquare(n, r, c);
                    if (result) {
                        this.add(n, result.row, result.col);
                        found = true;
                    }
                }
            }
        }
        for (var r = 0; r < this.area.length; r = r + this.squareSize) {
            for (var c = 0; c < this.area[r].length; c = c + this.squareSize) {
                for (var n of this.shouldBe) {
                    var result = this.checkLine(n, r, c);
                    if (result) {
                        this.add(n, result.row, result.col);
                        found = true;
                    }
                }
            }
        }


        this.updateVariantas();

        for (var r = 0; r < this.area.length; r++) {
            for (var c = 0; c < this.area[r].length; c++) {
                const cell = this.area[r][c];
                if (!cell.isEmpty) continue;

                if (cell.variants.length === 1) {
                    this.add(cell.variants[0], r, c);
                    found = true;
                }
            }
        }

        this.updateVariantas();

        return found;
    }

    solve() {
        let round = 0;
        while (this.walk()) {console.log(`Walk ${++round}`)}
        console.log("Finished");
    }
}