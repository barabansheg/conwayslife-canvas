import { UI_STATE } from '/src/uistate.js';

const INIT_FIELD_WIDTH = 100;
const INIT_FIELD_HEIGHT = 100;
const ALIVE_COLOR = "#5ffff0";
const BACKGROUND_COLOR = "#c0c0c0";


class Render {
    constructor(canvas) {
        this.width = UI_STATE.VIEWPORT_WIDTH;
        this.height = UI_STATE.VIEWPORT_HEIGHT;
        canvas.width = this.width;
        canvas.height = this.height;
        this.bounds = canvas.getBoundingClientRect();
        
        this.ctx = canvas.getContext("2d");
    }
    draw(field, applyDelta) {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.width, this.height);
        const cells = field.getItemsForRender();
        for (const cell of cells) {
            this.ctx.fillStyle = ALIVE_COLOR;
            if (applyDelta) {
                cell.computeShift(UI_STATE.dx, UI_STATE.dy);
            }
            if (cell.isMustBeDraw()) {
                this.ctx.fillRect(cell.renderX, cell.renderY, cell.width, cell.height);
            }
        }
    }
}

export { Render };