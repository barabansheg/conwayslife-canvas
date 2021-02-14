import { UI_STATE } from '/src/uistate.js';
const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;
class Cell {
    _x = 0;
    _y = 0;
    _width = CELL_WIDTH;
    _height = CELL_HEIGHT;
    _isAlive = false;
    _DX = 0;
    _DY = 0;
    constructor(x, y, isAlive) {
        if (isAlive) {
            this._isAlive = true
        }
        this._x = x;
        this._y = y;
        this._DX = UI_STATE.AbsoulteDx;
        this._DY = UI_STATE.AbsoulteDy;
    }

    computeShift(dx, dy) {
        this._DX = this._DX + dx;
        this._DY = this._DY + dy;
    }
    isMustBeDraw() {
        return this.renderX > -1  && this.renderX < UI_STATE.VIEWPORT_WIDTH && this.renderY > -1 && this.renderY < UI_STATE.VIEWPORT_HEIGHT;    
    }

    get renderX() {
        return this.x*this.width+this._DX;

    }
    get renderY() {
        return this.y*this.height+this._DY;;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get isAlive() {
        return this._isAlive;
    }

    get key() {
        return `${this._x}x${this._y}`;
    }

    toggleIsAlive() {
        this._isAlive = !this._isAlive;
    }

}
export { Cell };