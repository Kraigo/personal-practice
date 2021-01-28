'use strict';

document.addEventListener("DOMContentLoaded", function() {
    const testData = [[5,0,2],[7,0,6],[2,1,5],[3,1,7],[4,1,8],[4,2,5],[8,2,6],[5,3,1],[9,3,7],[2,3,8],[9,4,3],[6,4,6],[8,4,8],[8,5,1],[4,5,2],[2,5,4],[5,5,6],[2,6,1],[5,6,4],[1,6,5],[7,7,4],[8,7,5],[2,7,6],[9,7,8],[6,8,2],[7,8,7]];


    const battlefield = new Battlefield();
    battlefield.build('#battlefield')

    for (let [number, row, column] of testData) {
        battlefield.add(number, row, column);
    }

    document.getElementById('walk')
        .addEventListener('click', () => {
            battlefield.walk();
        })

    document.getElementById('clear')
        .addEventListener('click', () => {
            battlefield.clear();
        })
    

})

class Battlefield {

    size = 3 * 3;
    squareSize = 3;
    area = null;
    shouldBe = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    inputValidation(event) {
        const value = event.target.value
            .replace(/[^1-9]/g, '')
            .substr(-1);
        event.target.value = value;
    }

    constructor() {
        this.area = [];
        for (var r = 0; r < this.size; r++) {
            this.area[r] = [];
            for (var c = 0; c < this.size; c++) {
                this.area[r][c] = document.createElement('input')
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
                const input = this.area[r][c];
                input.addEventListener('input', this.inputValidation)

                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.appendChild(table);
    }

    add(number, row, col) {
        const input = this.area[row][col];
        input.value = String(number);
    }

    isEmpty(row, col) {
        const input = this.area[row][col];
        return input.value !== '';
    }

    clear() {
        for (var r = 0; r < this.area.length; r++) {
            for (var c = 0; c < this.area[r].length; c++) {
                const input = this.area[r][c];
                input.value = '';
            }
        }
    }

    can(number, row, col) {
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

        for (var r = 0; r < this.area[0].length; r++) {
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
                if (this.isEmpty(r, c)) continue;
                if (this.can(number, r, c)) {
                    if (result) {
                        return false;
                    }
                    result = {row: r, col: c};
                }
            }
        }

        return result;
    }

    checkVariants(row, col) {
      let allVariants = [];
      
      for (let c = 0; c < this.area.length; c++) {
        allVariants.push(this.area[row][c].value);
      }
      
      for (let r = 0; r < this.area[0].length; r++) {      
        allVariants.push(this.area[r][col].value);      
      }
      
      const colStart = Math.floor(col / this.squareSize) * this.squareSize;
      const rowStart = Math.floor(row / this.squareSize) * this.squareSize;
      
      for (var r = rowStart; r < rowStart + this.squareSize; r++ ) {
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

    walk() {
        for (var r = 0; r < this.area.length; r = r + this.squareSize) {
            for (var c = 0; c < this.area[r].length; c = c + this.squareSize) {
                for (var n of this.shouldBe) {
                    var result = this.checkSquare(n, r, c);
                    if (result) {
                        this.add(n, result.row, result.col);
                    }
                }
            }
        }

        for (var r = 0; r < this.area.length; r ++) {
            for (var c = 0; c < this.area[r].length; c ++) {
                if (this.isEmpty(r, c)) continue;

                var allVariants = this.checkVariants(r, c);        
                if (allVariants.length === 1) {
                    this.add(allVariants[0], r, c)
                }
            }
        }
    }
}