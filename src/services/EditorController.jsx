import { createSignal } from "solid-js";

function EditorController() {
  let editor = {};
  let viewport = {};

  const [canavsList , setCanvasList] = createSignal();
  const [isDrawingMode , setIsDrawingMode] = createSignal(false)

  this.initEditorAndViewport = (editr, vieprt) => {
    editor = editr;
    viewport = vieprt;
  };

  this.addNewCanvas = () => {
    editor.addNewCanvas();
    setCanvasList({...editor.getLayers()})
  };

  this.getLayers = () => canavsList();

  this.isDrawingMode = () => isDrawingMode();

  this.setIsDrawingMode = (mode) => {
    editor.setIsDrawingMode(mode)
    if(editor.isDrawingMode()) {
        editor.focusToCanvas(editor.getSelectedCanvas());
    }
    
    setIsDrawingMode(editor.isDrawingMode())
  }
}

export default EditorController;
