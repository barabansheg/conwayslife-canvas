import { Cell } from '/src/cell.js';
class Field {
    _state = {};
    constructor() {
    }

    getNearestEmptyCells(cell) {
        const x = parseInt(cell.x);
        const y = parseInt(cell.y);

        const tmpCells = [];
        if (!this.state[`${x - 1}x${y + 1}`]) {
            tmpCells.push(new Cell(x - 1, y + 1, false));
        }

        if (!this.state[`${x}x${y + 1}`]) {
            tmpCells.push(new Cell(x, y + 1, false));
        }

        if (!this.state[`${x + 1}x${y + 1}`]) {
            tmpCells.push(new Cell(x + 1, y + 1, false));
        }

        if (!this.state[`${x + 1}x${y}`]) {
            tmpCells.push(new Cell(x + 1, y, false));
        }

        if (!this.state[`${x - 1}x${y}`]) {
            tmpCells.push(new Cell(x - 1, y, false));
        }

        if (!this.state[`${x - 1}x${y - 1}`]) {
            tmpCells.push(new Cell(x - 1, y - 1, false));
        }

        if (!this.state[`${x}x${y - 1}`]) {
            tmpCells.push(new Cell(x, y - 1, false));
        }

        if (!this.state[`${x + 1}x${y - 1}`]) {
            tmpCells.push(new Cell(x + 1, y - 1, false));
        }
        const resultCells = {};
        for (const cell of tmpCells) {
            resultCells[`${cell.x}x${cell.y}`] = cell;
        }
        return resultCells;
    }

    isAliveCellByKey(key) {
        if (this.state[key]) {
            return this.state[key].isAlive;
        }
        return false;
    }

    aliveCount(cell) {
        const x = parseInt(cell.x);
        const y = parseInt(cell.y);

        let counter = 0;
        if (this.isAliveCellByKey(`${x - 1}x${y + 1}`)) {
            counter++
        }

        if (this.isAliveCellByKey(`${x}x${y + 1}`)) {
            counter++
        }

        if (this.isAliveCellByKey(`${x + 1}x${y + 1}`)) {
            counter++
        }

        if (this.isAliveCellByKey(`${x + 1}x${y}`)) {
            counter++

        }
        if (this.isAliveCellByKey(`${x - 1}x${y}`)) {
            counter++
        }

        if (this.isAliveCellByKey(`${x - 1}x${y - 1}`)) {
            counter++
        }

        if (this.isAliveCellByKey(`${x}x${y - 1}`)) {
            counter++
        }
        if (this.isAliveCellByKey(`${x + 1}x${y - 1}`)) {
            counter++
        }

        return counter;
    }
    get state() {
        return this._state;
    }

    addToState(additionalState) {
        this._state = Object.assign(this.state, additionalState);
    }

    removeCell(cell) {
        delete this._state[cell.key];
    }

    stateRenew(state) {
        this._state = state;
    }

    getItemsForRender() {
        const cellsToRender = [];

        for (const [, val] of Object.entries(this.state)) {
            cellsToRender.push(val);
        }

        return cellsToRender;
    }
}

export { Field };