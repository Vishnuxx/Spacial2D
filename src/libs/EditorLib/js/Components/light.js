import { DirectionalLight } from "../../vendor/three.module.js";

function createLight() {
  const light = new DirectionalLight("white", 8);

  light.position.set(1, 1, 1);

  

  return light;
}

export default createLight;
