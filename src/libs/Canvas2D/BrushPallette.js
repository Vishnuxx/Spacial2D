export class BrushPallette {

    constructor(context) {
        this.context = context;
        this.brushes = {
            "pen" : {
                strokeWidth: 3,
                color: "#000000",
                lineCap: "round",
                lineJoin: "round"
            }
        }
    
        this.currentBrush = this.brushes["pen"];
    }

    setBrush(brushID) {
        if(this.brushes[brushID] === undefined) {
            this.currentBrush = this.brushes["pen"];
            return;
        }
        this.currentBrush = this.brushes[brushID];
    }

    draw(x1 , y1 , x2 , y2) {

    }

    redraw() {

    }

}