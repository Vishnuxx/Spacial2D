import { WebGLRenderer } from "../../vendor/three.module.js";

export function createRenderer() {
    const renderer = new WebGLRenderer({
      antialis: true,
    });

    renderer.physicallyCorrectLights = true;
    return renderer;
}

export default createRenderer ;