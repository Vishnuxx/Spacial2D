import * as THREE from "../vendor/three.module.js";
import { Canvas3D } from "./Components/Canvas3D.js";

//let scene , camera , light , renderer ;

export function Editor(viewport) {
  var currentCanvas = null;

  const layers = {}; // list of canvases

  

  this.focus = (canvas) => {};

  this.getLayers = () => layers;

  this.addNewCanvas = () => {
    const canv = new Canvas3D(10, 10);
    viewport.addToSpace(canv.toObject3D());
    const len = Object.keys(layers).length;
    
    //console.log(canv.uuid());
    layers[canv.uuid()] = { name: "canvas" + len, canvas: canv };
    
    this.selectCanvas(canv.uuid());
    this.render();
  };

  this.setIsDrawingMode = (bool) => {
    viewport.cameraControls.enableRotate = !bool
  }

  this.isDrawingMode = () => {
    return !viewport.cameraControls.enableRotate;
  }

  this.selectCanvas = (uuid) => {
    currentCanvas = layers[uuid].canvas;
  };

  this.getSelectedCanvas = () => {
    return currentCanvas;
  };

  this.getSelectedCanvasName = () => {
    return currentCanvas.name;
  }

  this.renameCanvas = (canvas , name) => {
    canvas.name = name;
  }

  this.focusToCanvas = (canvas) => {
    
    viewport.focus(canvas.toObject3D())
   
  }

  this.render = () => {
    viewport.render();
  };
}
