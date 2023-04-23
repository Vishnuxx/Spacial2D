import {
  PlaneBufferGeometry,
  CanvasTexture,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  Math,
} from "../../vendor/three.module.js";

export function Canvas3D(width, height) {
  var ctx;
  var plane;

  ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  // ctx.scale(ctx.width / ctx.height, ctx.width / ctx.height);
  ctx.fillStyle = "#fc34f5";

  const geometry = new PlaneBufferGeometry(10, 7);
  const texture = new CanvasTexture(ctx.canvas);
  const material = new MeshBasicMaterial({
    color: "#f53f50",
    side: DoubleSide,
    map: texture,
    
    //opacity:0.8,
    //transparent: true,
  });
  plane = new Mesh(geometry, material , 1);



  // API
  this.rotate = ( degX, degY, degZ ) => {
    plane.rotateX(Math.degToRad(degX));
    plane.rotateY(Math.degToRad(degY));
    plane.rotateZ(Math.degToRad(degZ));
  };

  this.hinge = (degX, degY, degZ ) => {
    geometry.rotateX(Math.degToRad(degX));
    geometry.rotateY(Math.degToRad(degY));
    geometry.rotateZ(Math.degToRad(degZ));
  };


  this.getCanvasContext = () => ctx;

  this.uuid = () => plane.uuid;

  this.toObject3D = () => {
    return plane;
  };
}
