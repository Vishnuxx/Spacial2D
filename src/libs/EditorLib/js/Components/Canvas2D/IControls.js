function IControls(infinite2D) {
  const editor = infinite2D;
  const dom = infinite2D.dom();

  let dragStartPosition = { x: 0, y: 0 };
  let currentTransformedCursor = { x: 0, y: 0 };
  const Mode = {
    RIGHT_CLICK: false,
    LEFT_CLICK: false,
  };

  {
    dom.style.touchAction = "none";
   // editor.setOffset(dom.clientWidth / 2, dom.clientHeight / 2);
    editor.draw({ x: -10, y: -10 }, { x: 10, y: -10 });
    editor.draw({ x: 10, y: -10 }, { x: 10, y: 10 });
    editor.draw({ x: 10, y: 10 }, { x: -10, y: 10 });
    editor.draw({ x: -10, y: 10 }, { x: -10, y: -10 });
  }

  function draw(transformedCursor) {
    window.requestAnimationFrame(()=>{
         editor.draw(dragStartPosition, transformedCursor);
         // editor.render()
         dragStartPosition = transformedCursor;
    })
   
  }

  function pan(transformedCursor) {
    editor.translate(
      transformedCursor.x - dragStartPosition.x,
      transformedCursor.y - dragStartPosition.y
    );
    editor.render();
  }

  function triggerLeftClick() {
    Mode.LEFT_CLICK = true;
    Mode.RIGHT_CLICK = false;
  }

  function triggerRightClick() {
    Mode.LEFT_CLICK = false;
    Mode.RIGHT_CLICK = true;
  }

  function unclickAll() {
    Mode.LEFT_CLICK = false;
    Mode.RIGHT_CLICK = false;
  }

  //

  function pointerWheel(e) {
    let delta = -e.deltaY;
    let fact;
    if (delta < 0) {
      if (editor.getScale() > editor.minScale) {
        fact = 0.95;
        editor.zoom(fact, dom.clientWidth / 2, dom.clientHeight / 2);
      }
    } else {
      if (editor.getScale() < editor.maxScale) {
        fact = 1.05;
        editor.zoom(fact);
      }
    }
    e.preventDefault();
  }


  function mouseDown(e) {
    dragStartPosition = editor.getTransformedPoint(e.offsetX, e.offsetY);
    if (e.button === 0) {
      triggerLeftClick();
    } else {
      triggerRightClick();
    }
  }


  function mouseMove(e) {
    currentTransformedCursor = editor.getTransformedPoint(e.offsetX, e.offsetY);

    if (Mode.LEFT_CLICK) {
      draw(currentTransformedCursor);
    }

    if (Mode.RIGHT_CLICK) {
      pan(currentTransformedCursor);
    }
  }


  function mouseUp(e) {
    unclickAll();
  }


  dom.addEventListener("pointerdown", mouseDown);
  dom.addEventListener("pointermove", mouseMove);
  dom.addEventListener("pointerup", mouseUp);
  dom.addEventListener("wheel", pointerWheel);
}

export default IControls;
