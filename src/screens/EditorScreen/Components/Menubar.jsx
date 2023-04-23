import style from "../../../styles/menubar.module.css";


import { createEffect, createSignal, mergeProps, onMount } from "solid-js";

import { SButton } from "../../../widgets/SButton/SButton";
import { SToggleButton } from "../../../widgets/widget";


export function Menubar(props) {
 

  const click = () => {
    props.controller.addNewCanvas()
    
  }

  return (
    <div className={style.menubar}>
      <SButton onClick={() => click()}>Add</SButton>
      <DrawingAndPreviewButtons controller={props.controller}></DrawingAndPreviewButtons>

    </div>
  );
}

function DrawingAndPreviewButtons(props) {
  const controller = props.controller
  const mode = controller.isDrawingMode;
  
  
  return (
    <>
      <SToggleButton
        state={mode()}
        onClick={() => controller.setIsDrawingMode(true)}
      >
        draw
      </SToggleButton>
      <SToggleButton
        state={mode()}
        onClick={() => controller.setIsDrawingMode(false)}
      >
        view
      </SToggleButton>
      {/* <SButton
        // className={controller.isDrawingMode() ? style.mode : ""}
        onClick={() => controller.setIsDrawingMode(true)}
      >
        {console.log(controller.isDrawingMode())}
        Draw
      </SButton>
      <SButton
        //className={!controller.isDrawingMode() ? style.mode : ""}
        onClick={() => controller.setIsDrawingMode(false)}
      >
        View
      </SButton> */}
    </>
  );
}
