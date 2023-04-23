export class ScreenControls {
  constructor(orbitcontrols, domElement) {
    this.dom = domElement;
    this.orbitControls = orbitcontrols;
  }

  enable() {
    this.orbitControls.enabled = false;
    this.dom.style.pointerEvents = "auto";
  }

  disable() {
    this.orbitControls.enabled = true;
    this.dom.style.pointerEvents = "none";
  }
}
