import { BrushUtils } from "./BrushUtils.js";

/* 



scale : {
  penId: "",
  path: [] , 
  head: "image.png",
  texture: "image.png",
  stroke-path: {
    size: { width : , height: },
    opacity: 0-100,
    smooth: 0-100,
    adhesion: 0-100,
    size-range: 0-100,
    wet-edges: 0-100,
    glaze-strokes: 0-100,
    blending-Mode: ""
  },
  filter: {

  }
  dynamics: {
    rotation: {
        enabled: true,
        value: 90 -> rotates 90deg on every
    },
    velocity: 1,
    pressure: 1,
    tilt: 0,
  }
 }
 
 */

export class PenBrush {
  constructor(context) {
    this.context = context;

    this.points = [];

    this.img = new Image(20, 20);
    //this.img.src = "../brush2.png";
    this.img.src =
      "https://yvonnechakachaka.co.za/poaf/wp-content/uploads/2021/11/radial-fade-YVONNE-black-new.png";

    this.timeDifference = 0;

    this.stroke = {
      spacing: 20,
      jitterY: 0,
      jitterX: 10,
      color: "green"
    };

    this.head = {
      width: 50,
      height: 50,
      angle: 90,
      offsetX: 10,
      offsetY: 30,
      autoRotate: true,
    };

    this.brushHead = this._createBrushHead(
      "https://i.pinimg.com/originals/78/13/13/7813132bf81ad73310f26ff09122acc3.png",
      this.head.width,
      this.head.height
    );
  }

  start(event) {}

  draw(cursor, points, color) {
    const time = performance.now();
    this.points.push({
      x0: points.prevX,
      y0: points.prevY,
      x1: points.currX,
      y1: points.currY,
    });

    var lastPoint = { x: cursor.prevX, y: cursor.prevY };

    var currentPoint = { x: cursor.currX, y: cursor.currY };
    var dist = BrushUtils.distanceBetween(lastPoint, currentPoint);
    var angle = BrushUtils.angleBetween(lastPoint, currentPoint);

    this.context.beginPath();
    for (
      var i = 0;
      i < dist;
      i += this.stroke.spacing < 1 ? 1 : this.stroke.spacing
    ) {
      var x = lastPoint.x + Math.sin(angle) * i;
      var y = lastPoint.y + Math.cos(angle) * i;

      // this.context.save()

      this.context.globalAlpha = 0.3
      this.context.globalCompositeOperation = "source-over";
      this.context.fillStyle = "green";

      this.context.save();
      if (this.head.autoRotate === true) {
        this.context.translate(
          x -
            this.head.offsetX +
            BrushUtils.getRandomInt(0, this.stroke.jitterX),
          y -
            this.head.offsetY +
            BrushUtils.getRandomInt(0, this.stroke.jitterY)
        );
        this.context.rotate(-angle);
        this.context.drawImage(
          this.brushHead.headCanvas,
          0,
          0,
          this.head.width,
          this.head.height
        );
        this.context.rotate(angle);
        this.context.translate(
          -(
            x -
            this.head.offsetX +
            BrushUtils.getRandomInt(0, this.stroke.jitterX)
          ),
          -(
            y -
            this.head.offsetY +
            BrushUtils.getRandomInt(0, this.stroke.jitterY)
          )
        );
      } else {
        this.context.drawImage(
           // this.img,
            
           
         this.brushHead.headCanvas,
          x -
            this.head.offsetX +
            BrushUtils.getRandomInt(0, this.stroke.jitterX),
          y -
            this.head.offsetY +
            BrushUtils.getRandomInt(0, this.stroke.jitterY),
          this.head.width,
          this.head.height
        );
      }

      this.context.restore();

      //this.context.restore();
    }

    this.context.closePath();
    lastPoint = currentPoint;
    this.timeDifference = time;
  }

  end(event) {
    const arr = [...this.points];
    this.points.length = 0;
    return arr;
  }

  redraw(path) {
    this.draw(path.prevX, path.prevY, path.currX, path.currY);
  }

  serialise() {
    return {
      penId: this.penId,
      color: this.color,
      penWidth: 1,
      path: [...this.points],
    };
  }

  _createBrushHead(sourcepath, width, height) {
    var offScreenCanvas = document.createElement("canvas");
    offScreenCanvas.width = width;
    offScreenCanvas.height = height;
    const img = new Image(width, height);
    img.src = sourcepath;
   

    const offcontext = offScreenCanvas.getContext("2d");
    offcontext.globalAlpha = 1
    offcontext.translate(width/2 , height/2)
    offcontext.rotate(this.head.angle * Math.PI / 180);

    offcontext.drawImage(img, -width / 2, -height/2, width, height);
    return {
      headCanvas: offScreenCanvas,
      headContext: offcontext,
    }; //return canvas element
  }
}
