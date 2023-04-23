import { createEffect, createSignal } from 'solid-js'
import style from './sButton.module.css'



export function SButton(props) {
  
  let [clas, setClas] = createSignal(style.button);

  const click = (e) => {
    props.onClick(e)
    mode("select");
  }
  
  const mode = (mode) => {
    switch(mode) {
      case "hover":
        setClas(style.hover )
        break;

      case "select":
        setClas(style.select )
        break;

      default:
        setClas(style.button )
        break;
    }
  }

  
  
  
  return (
    <button
      className={clas()}
      onpointerdown={click}
      onpointerup={()=>mode("")}
    >
      {props.children}
    </button>
  );
}



