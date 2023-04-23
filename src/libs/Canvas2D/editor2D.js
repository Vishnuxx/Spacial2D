/* 

stroke object 

scale : {
  penId: "",
  path: []
}
*/

import { PenBrush } from "./brush.js";

export function Editor2D(canvasDiv, width, height) {
  const scope = this;

  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");
  //brush
  this.brush = new PenBrush(this.context);
  this.width = width;
  this.height = height;

  // distance from origin
  this.offset = { x: 0, y: 0 };
  this.scale = 1;

  this.strokes = []; //all strokes drawn are added here
  //cursor position
  this.CURSOR = {
    currentX: 0,
    currentY: 0,
    prevX: 0,
    prevY: 0,
  };

  this._leftMouseDown = false;
  this._rightMouseDown = false;



  //INIT
  {
    canvasDiv.appendChild(scope.canvas);
    scope.canvas.touchAction = "none";
    scope.canvas.width = width;
    scope.canvas.height = height;
  };

  //_______public API________

  this.translate = (deltaX, deltaY) => {
    // move the screen
    this.offset.x += (deltaX - this.CURSOR.prevX) / this.scale;
    this.offset.y += (deltaY - this.CURSOR.prevY) / this.scale;
    this.render();
  };


  this.zoom = (event) => {
    event.preventDefault();
    const deltaY = event.deltaY;
    const scaleAmount = -deltaY / 500;

    this.scale = this.scale * (1 + scaleAmount);
    // zoom the page based on where the cursor is
    var distX = event.pageX / this.canvas.width;
    var distY = event.pageY / this.canvas.height;
    // calculate how much we need to zoom
    const unitsZoomedX = this._trueWidth() * scaleAmount;
    const unitsZoomedY = this._trueHeight() * scaleAmount;

    const unitsAddLeft = unitsZoomedX * distX;
    const unitsAddTop = unitsZoomedY * distY;

    this.offset.x -= unitsAddLeft;
    this.offset.y -= unitsAddTop;

    this.render();
   
  };

  
  this.render = () => {
    window.requestAnimationFrame(() => {
      // set the canvas to the size of the window
      this.canvas.width = this.width; //this.canvas.style.width; // document.body.clientWidth;
      this.canvas.height = this.height; //this.canvas.style.height; // document.body.clientHeight;

      //get the aspect ratio of the canvas
      let ratio = Math.min(
        this.canvas.clientWidth / this.canvas.width,
        this.canvas.clientHeight / this.canvas.height
      );

      this.context.scale(ratio, ratio);

      const len = this.strokes.length;
      for (var path = 0; path < len; path++) {
        const line = this.strokes[path];
        for (var i = 0; i < this.strokes[path].length; i++) {
          this.context.beginPath();
          this.context.moveTo(
            this._toScreenX(line[i].x0),
            this._toScreenY(line[i].y0)
          );
          this.context.lineTo(
            this._toScreenX(line[i].x1),
            this._toScreenY(line[i].y1)
          );
          this.context.strokeStyle = "#000";
          this.context.lineJoin = "round";
          this.context.lineCap = "round";
          this.context.lineWidth = line.stroke * this.scale;
          this.context.stroke();
          this.context.closePath();
        }
      }
    });

    // for drawing all the strokes from strokes[]
    // for (let i = 0; i < this.strokes.length; i++) {
    //   const line = this.strokes[i];
    //   this.context.beginPath();
    //   this.context.moveTo(this._toScreenX(line.x0), this._toScreenY(line.y0));
    //   this.context.lineTo(this._toScreenX(line.x1), this._toScreenY(line.y1));
    //   this.context.strokeStyle = "#000";
    //   this.context.lineJoin = "round";
    //   this.context.lineCap = "round";
    //   this.context.lineWidth = line.stroke * this.scale;
    //   this.context.stroke();
    // }
  };

  this._draw = (x0, y0, x1, y1, linewidth) => {
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = "#000";
    this.context.lineWidth = linewidth;
    this.context.stroke();
    //this.brush.redraw({prevX : x0 , prevY: y0 , currX : x1 , currY: y1});
  };

  // mouse functions

  this._onMouseDown = (event) => {
    // detect left clicks
    if (event.button == 0) {
      this._leftMouseDown = true;
      this._rightMouseDown = false;

      this.brush.start(event);
    }
    // detect right clicks
    if (event.button == 2) {
      this._rightMouseDown = true;
      this._leftMouseDown = false;
    }

    // update the cursor coordinates
    this.CURSOR.currentX = event.pageX;
    this.CURSOR.currentY = event.pageY;
    this.CURSOR.prevX = event.pageX;
    this.CURSOR.prevY = event.pageY;
  };

  this._onMouseMove = (event) => {
    //window.requestAnimationFrame(()=> {
    // get mouse position
    this.CURSOR.currentX = event.clientX;
    this.CURSOR.currentY = event.clientY;

    if (this._leftMouseDown) {
      const scaledX = scope._toLocalX(this.CURSOR.currentX);
      const scaledY = scope._toLocalY(this.CURSOR.currentY);
      const prevScaledX = scope._toLocalX(this.CURSOR.prevX);
      const prevScaledY = scope._toLocalY(this.CURSOR.prevY);

      // // add the line to our drawing history
      // this.strokes.push({
      //   y0: prevScaledY,
      //   x0: prevScaledX,
      //   x1: scaledX,
      //   y1: scaledY,
      //   stroke:  2 / this.scale,
      // });
      // // draw a line
      this._draw(
        this.CURSOR.prevX,
        this.CURSOR.prevY,
        this.CURSOR.currentX,
        this.CURSOR.currentY
      );

      //this.brush.draw(this.CURSOR.prevX , this.CURSOR.prevY , this.CURSOR.currentX ,this.CURSOR.currentY)
      this.brush.draw(
        //coordinates to store
        {
          prevX: this.CURSOR.prevX,
          prevY: this.CURSOR.prevY,
          currX: this.CURSOR.currentX,
          currY: this.CURSOR.currentY,
        },
        //coordinates to draw into canvas
        {
          prevX: prevScaledX,
          prevY: prevScaledY,
          currX: scaledX,
          currY: scaledY,
        }
      );
    }

    //translate
    if (this._rightMouseDown) {
      this.translate(this.CURSOR.currentX, this.CURSOR.currentY);
    }

    this.CURSOR.prevX = this.CURSOR.currentX;
    this.CURSOR.prevY = this.CURSOR.currentY;
    //})
  };

  this._onMouseUp = () => {
    this._leftMouseDown = false;
    this._rightMouseDown = false;
    this.strokes.push(this.brush.end());
  };

  // // touch functions
  const prevTouches = [null, null]; // up to 2 touches
  let singleTouch = false;
  let doubleTouch = false;
  function onTouchStart(event) {
    if (event.touches.length == 1) {
      singleTouch = true;
      doubleTouch = false;
    }
    if (event.touches.length >= 2) {
      singleTouch = false;
      doubleTouch = true;
    }

    // store the last touches
    prevTouches[0] = event.touches[0];
    prevTouches[1] = event.touches[1];
  }

  function onTouchMove(event) {
    // get first touch coordinates
    const touch0X = event.touches[0].pageX;
    const touch0Y = event.touches[0].pageY;
    const prevTouch0X = prevTouches[0].pageX;
    const prevTouch0Y = prevTouches[0].pageY;

    const scaledX = scope._toLocalX(touch0X);
    const scaledY = scope._toLocalY(touch0Y);
    const prevScaledX = scope._toLocalX(prevTouch0X);
    const prevScaledY = scope._toLocalY(prevTouch0Y);

    if (singleTouch) {
      // add to history
      scope.strokes.push({
        x0: prevScaledX,
        y0: prevScaledY,
        x1: scaledX,
        y1: scaledY,
      });
      //scope.drawLine(prevTouch0X, prevTouch0Y, touch0X, touch0Y);

      scope.brush.draw(
        //coordinates to store
        {
          prevX: prevTouch0X,
          prevY: prevTouch0Y,
          currX: touch0X,
          currY: touch0Y,
        },
        //coordinates to draw into canvas
        {
          prevX: prevScaledX,
          prevY: prevScaledY,
          currX: scaledX,
          currY: scaledY,
        }
      );
    }

    if (doubleTouch) {
      // get second touch coordinates
      const touch1X = event.touches[1].pageX;
      const touch1Y = event.touches[1].pageY;
      const prevTouch1X = prevTouches[1].pageX;
      const prevTouch1Y = prevTouches[1].pageY;

      // get midpoints
      const midX = (touch0X + touch1X) / 2;
      const midY = (touch0Y + touch1Y) / 2;
      const prevMidX = (prevTouch0X + prevTouch1X) / 2;
      const prevMidY = (prevTouch0Y + prevTouch1Y) / 2;

      // calculate the distances between the touches
      const hypot = Math.sqrt(
        Math.pow(touch0X - touch1X, 2) + Math.pow(touch0Y - touch1Y, 2)
      );
      const prevHypot = Math.sqrt(
        Math.pow(prevTouch0X - prevTouch1X, 2) +
          Math.pow(prevTouch0Y - prevTouch1Y, 2)
      );

      // calculate the screen scale change
      var zoomAmount = hypot / prevHypot;
      scale = scale * zoomAmount;
      const scaleAmount = 1 - zoomAmount;

      // calculate how many pixels the midpoints have moved in the x and y direction
      const panX = midX - prevMidX;
      const panY = midY - prevMidY;
      // scale this movement based on the zoom level
      offsetX += panX / scale;
      offsetY += panY / scale;

      // Get the relative position of the middle of the zoom.
      // 0, 0 would be top left.
      // 0, 1 would be top right etc.
      var zoomRatioX = midX / canvas.clientWidth;
      var zoomRatioY = midY / canvas.clientHeight;

      // calculate the amounts zoomed from each edge of the screen
      const unitsZoomedX = trueWidth() * scaleAmount;
      const unitsZoomedY = trueHeight() * scaleAmount;

      const unitsAddLeft = unitsZoomedX * zoomRatioX;
      const unitsAddTop = unitsZoomedY * zoomRatioY;

      offsetX += unitsAddLeft;
      offsetY += unitsAddTop;

      redrawCanvas();
    }
    prevTouches[0] = event.touches[0];
    prevTouches[1] = event.touches[1];
  }
  function onTouchEnd(event) {
    singleTouch = false;
    doubleTouch = false;
  }

  //______LISTENERS_________
  scope.canvas.addEventListener(
    "mousedown",
    (e) => this._onMouseDown(e),
    false
  );
  scope.canvas.addEventListener(
    "mousemove",
    (e) => this._onMouseMove(e),
    false
  );
  scope.canvas.addEventListener("pointerup", (e) => this._onMouseUp(e), false);
  scope.canvas.addEventListener(
    "pointerleave",
    (e) => this._onMouseUp(e),
    false
  );
  scope.canvas.addEventListener("wheel", (e) => this.zoom(e), false);
  // canvasDiv.addEventListener("pointerup");

  // if the window changes size, redraw the canvas
  window.addEventListener("resize", (event) => {
    redrawCanvas();
  });

  // disable right clicking
  document.oncontextmenu = function () {
    return false;
  };

  // Touch Event Handlers
  this.canvas.addEventListener("touchstart", onTouchStart);
  this.canvas.addEventListener("touchend", onTouchEnd);
  this.canvas.addEventListener("touchcancel", onTouchEnd);
  this.canvas.addEventListener("touchmove", onTouchMove);

  //legacy methods

  this._toLocalX = (screenX) => {
    //localX is the position of the point inside canvas (screenx+offsset)
    return screenX / this.scale - this.offset.x;
  };

  this._toLocalY = (screenY) => {
    return screenY / this.scale - this.offset.y;
  };

  this._toScreenX = (localX) => {
    return (localX + this.offset.x) * this.scale;
  };

  this._toScreenY = (localY) => {
    return (localY + this.offset.y) * this.scale;
  };

  this._trueHeight = () => {
    return this.canvas.clientHeight / this.scale;
  };
  this._trueWidth = () => {
    return this.canvas.clientWidth / this.scale;
  };
}
