import { Render } from '/src/render.js';
import { Cell } from '/src/cell.js';
import { Field } from '/src/field.js';
import { UI_STATE } from '/src/uistate.js';

const initState = {
    '28x18': new Cell(28, 18, true),
    '29x18': new Cell(29, 18, true),
    '30x18': new Cell(30, 18, true),
    '28x19': new Cell(28, 19, true),
    '29x20': new Cell(29, 20, true),

    '52x18': new Cell(52, 18, true),
    '53x18': new Cell(53, 18, true),
    '54x18': new Cell(54, 18, true),
    '54x19': new Cell(54, 19, true),
    '53x20': new Cell(53, 20, true),

    '28x28': new Cell(28, 28, true),
    '29x28': new Cell(29, 28, true),
    '30x28': new Cell(30, 28, true),
    '28x27': new Cell(28, 27, true),
    '29x26': new Cell(29, 26, true),

    '52x28': new Cell(52, 28, true),
    '53x28': new Cell(53, 28, true),
    '54x28': new Cell(54, 28, true),
    '54x27': new Cell(54, 27, true),
    '53x26': new Cell(53, 26, true),
};

let field = new Field();
field.addToState(initState);

const render = new Render(document.getElementById("canvas"));

function loop(force) {
    if (UI_STATE.isPlay === true || force) {
        for (const [, cell] of Object.entries(field.state)) {
            field.addToState(field.getNearestEmptyCells(cell));
        }
        const cellsList = [];
        for (const [, cell] of Object.entries(field.state)) {
            const c = Object.assign({}, cell);
            Object.setPrototypeOf(c, Cell.prototype);
            cellsList.push(c);
        }
        const newState = {};

        for (const cell of cellsList) {
            const aliveCount = field.aliveCount(cell);
            if (cell.isAlive) {
                if (aliveCount < 2 || aliveCount > 3) {
                    cell.toggleIsAlive();
                }
            } else {
                if (aliveCount === 3) {
                    cell.toggleIsAlive();
                }
            }

            if (cell.isAlive) {
                newState[cell.key] = cell;
            }
        }

        field.stateRenew(newState);

        render.draw(field, false);
    }
}

render.draw(field, false);

window.onclick = function (e) {
    if (UI_STATE.isPlay === false && e.target.id === 'canvas') {
        const coordX = e.clientX - UI_STATE.AbsoulteDx;
        const coordY = e.clientY - UI_STATE.AbsoulteDy;
        const x = (coordX - 10 - Math.abs(coordX % 10)) / 10;
        const y = (coordY - 10 - Math.abs(coordY % 10)) / 10;
        const cell = new Cell(x, y, true);
        if (field.state[cell.key]) {
            field.removeCell(cell);
        } else {
            field.addToState({
                [cell.key]: cell,
            });
        }
        render.draw(field, false);
    }
}

window.onmousedown = function (e) {
    if (e.target.id === 'canvas') {
        UI_STATE.startX = e.clientX;
        UI_STATE.startY = e.clientY;
        UI_STATE.isMouseHolded = true;
    }
}
window.onmousemove = function (e) {
    let isMustBeReDraw = false;
    if (UI_STATE.isMouseHolded) {
        isMustBeReDraw = true;
        UI_STATE.dx = e.clientX - UI_STATE.startX;
        UI_STATE.dy = e.clientY - UI_STATE.startY;
        UI_STATE.AbsoulteDx += UI_STATE.dx;
        UI_STATE.AbsoulteDy += UI_STATE.dy;

        UI_STATE.startX = e.clientX;
        UI_STATE.startY = e.clientY;

    }
    if (e.target.id === 'canvas') {
        UI_STATE.isRenderCursor = true;
        isMustBeReDraw = true;
        const coordX = e.clientX;
        const coordY = e.clientY;
        const x = (coordX - 10 - Math.abs(coordX % 10));
        const y = (coordY - 10 - Math.abs(coordY % 10));
        UI_STATE.cursorX = x;
        UI_STATE.cursorY = y;
    }

    if (isMustBeReDraw) {
        render.draw(field, true);
        UI_STATE.isRenderCursor = false;
        UI_STATE.dx = 0;
        UI_STATE.dy = 0;
    }
    console.log(isMustBeReDraw);
}

window.onmouseup = function (e) {
    UI_STATE.isMouseHolded = false;
}

document.getElementById("step-btn").onclick = function (e) {
    loop(true);
}

document.getElementById("game-btn").onclick = function (e) {
    UI_STATE.isPlay = !UI_STATE.isPlay;
    e.target.textContent = UI_STATE.isPlay ? "Pause" : "Play";
}


setInterval(loop, 500);