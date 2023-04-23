import { Scene } from '../../vendor/three.module.js'

function createScene() {
  const scene = new Scene();

  scene.background = "green";
  return scene;
}

export { createScene };
