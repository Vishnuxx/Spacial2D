import { createSignal, onMount } from "solid-js";

import style from "../../styles/Screens/editorscreen.module.css";

import {
  DrawingLayer,
  LayerManagerPanel,
  Menubar,
  ViewportScreen,
} from "./Components/Components.js";

import { Editor } from "../../libs/EditorLib/js/editor.js";
import { ViewPort } from "../../libs/EditorLib/js/ViewPort.js";

import { createStore } from "solid-js/store";
import EditorController from "../../services/EditorController";
import { Infinite2D } from "../../libs/EditorLib/js/Components/Canvas2D/Infinite2D";
import IControls from "../../libs/EditorLib/js/Components/Canvas2D/IControls";





const editorController = new EditorController()

export function EditorScreen() {
 let container , controllers ;
 const [viewport, setViewport] = createStore();

 onMount(()=>{

  //controllers.style.touchAction = "none"

  const viewport = new ViewPort(container , controllers);
  const editor = new Editor(viewport)
  editorController.initEditorAndViewport(editor , viewport);
  const canvas = new Infinite2D(controllers);
  const controls = new IControls(canvas)

  
 })

  return (
    <div className={style.editorscreen}>
      <Menubar controller={editorController}></Menubar>
      <LayerManagerPanel controller={editorController}></LayerManagerPanel>

      <div ref={container} class={style.viewport}></div>
      <div ref={controllers} class={style.controllerPanel}></div>
    </div>
  );
}
