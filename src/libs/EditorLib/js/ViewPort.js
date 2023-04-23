import { Resizer } from "./Systems/Resizer.js";
import createCameraControls from "./Systems/cameraControls.js";
import { createScene } from "./Components/scene.js";
import { createCamera } from "./Components/camera.js";
import createLight from "./Components/light.js";
import createRenderer from "./Systems/Renderer.js";
import { Box3, Group, Sphere, Vector3 } from "../vendor/three.module.js";
import { ScreenControls } from "./Systems/ScreenControls.js";

export function ViewPort(container, controlContainer) {
  var scope = this;

  const scene = createScene();
  const box = new Box3();
  const sphere = new Sphere();

  const group = new Group();

  this.camera = createCamera();
  this.light = createLight();
  this.renderer = createRenderer();

  //systems
  this.cameraControls = createCameraControls(
    this.camera,
    controlContainer
  );

  console.log(controlContainer , this.renderer.domElement)

  //controls gestures through a layer
  this.gestureController = new ScreenControls(
    this.cameraControls,
    controlContainer
  );

  this.render = () => {
    this.renderer.render(scene, this.camera);
  };

  {
    scope.light.position.set(0, 1, 1).normalize();
    scene.add(scope.light);
    scene.add(group)
    container.appendChild(scope.renderer.domElement);
    scope.renderer.setClearColor("white", 1);
    //
    scope.cameraControls.addEventListener("change", () => {
      window.requestAnimationFrame(()=> {
         scope.render();
      })
     
    });

    const resizer = new Resizer(container, scope.camera, scope.renderer);

    resizer.onResize = () => {
      scope.render();
    };

    scope.render();
  }

  this.addToSpace = (mesh) => {
    group.add(mesh);
    console.log(scene)
  };

  this.focus = (target) => {
    var distance;
    const delta = new Vector3();
    const center = new Vector3();

    box.setFromObject(target);

    if (box.isEmpty() === false) {
      box.getCenter(center);
      distance = box.getBoundingSphere(sphere).radius;
    } else {
      // Focusing on an Group, AmbientLight, etc

      center.setFromMatrixPosition(target.matrixWorld);
      distance = 0.1;
    }

    delta.set(0, 0, 1);
    delta.applyQuaternion(target.quaternion);
    delta.multiplyScalar(distance * 4);

    this.cameraControls.object.position.copy(center).add(delta);
    this.cameraControls.update();
  };
}
