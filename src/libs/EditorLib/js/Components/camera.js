import { PerspectiveCamera } from "../../vendor/three.module.js";

function createCamera() {
  const camera = new PerspectiveCamera(
    20, // fov = Field Of View
    window.innerWidth/window.innerHeight, // aspect ratio (dummy value)
    0.1, // near clipping plane
    1000 // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  
  return camera;
}

export { createCamera };
