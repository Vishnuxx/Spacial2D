export function Infinite2D(container) {
  const scope = this;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d" , {
    desynchronized: true,
    
  });

  const data = [];

  const offset = {x : 0, y: 0}

  this.maxScale = 10;
  this.minScale = -10;
  this.dom = () => container;

  //INIT
  {
    canvas.style.touchAction = "none";
    canvas.oncontextmenu = () => false;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
  }

  this.getScale = () => {
    return context.getTransform().a;
  };

  this.getContext = () => {
    return context;
  };

  this.zoom = (delta, screenX, screenY) => {
    // context.translate(currentTransformedCursor.x, currentTransformedCursor.y);
    const tp = this.getTransformedPoint(screenX, screenY);
    context.translate( tp.x , tp.y);

    context.scale(delta, delta);

    context.translate( -tp.x, - tp.y);
    //context.translate(-currentTransformedCursor.x, -currentTransformedCursor.y);
    scope.render();
  };

  this.translate = (x, y) => {
    context.translate(x, y);
  };

  this.onResize = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  };

  //drawing
  function drawLine(x0, y0, x1, y1, linewidth) {
    context.beginPath();
    context.moveTo(x0, y0);
    //context.drawImage(brush, x1, y1);
    context.lineTo(x1, y1);

    context.strokeStyle = "red";
    context.lineWidth = linewidth === undefined ? 2 : linewidth;
    context.lineCap = "round";
    context.stroke();
  }

  this.render = () => {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      drawLine(point.x0, point.y0, point.x1, point.y1, point.stroke);
    }
    console.log("r")
  };



  this.setOffset = (x , y) => { 
    offset.x = x;
    offset.y = y
    this.translate(x , y)
  }

  /*


  


  _________Dom Operations____________




  */

  this.draw = (startpos, endpos) => {
    drawLine(startpos.x, startpos.y, endpos.x, endpos.y , 5);

    data.push({
      stroke: 9 / context.getTransform().a,
      x0: startpos.x,
      y0: startpos.y,
      x1: endpos.x,
      y1: endpos.y,
    });
  };

  //VECTOR FUNCTIONS
  this.getTransformedPoint = (x, y) => {
    const transform = context.getTransform();
    const inverseZoom = 1 / transform.a;
    const transformedX = inverseZoom * x - inverseZoom * transform.e;
    const transformedY = inverseZoom * y - inverseZoom * transform.f;
    return { x: transformedX, y: transformedY };
  };
}
