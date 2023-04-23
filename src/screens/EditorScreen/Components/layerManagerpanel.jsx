import { createEffect } from "solid-js";
// import EditorApi from "../../../services/EditorApi";
import style from "../../../styles/layermanager.module.css";




export function LayerManagerPanel(props) {
  let layers = props.controller.getLayers;

  const loadLayers = () => {
    if(layers() === undefined) return 
    const obj = layers()
    return Object.keys(layers()).map((key) => <ListItem>{obj[key].name}</ListItem>);
      
  }

  return (
    <div class={style.panel}>
      <div class={style.layermanager}>
        {/* <button className={style.addLayerButton}>+</button> */}
        {loadLayers()}
      </div>
      <div class={style.togglebar}></div>
    </div>
  );
}

function ListItem(props) {
  return (
    <div class={style.listItem}>
      
      <div class={style.canvaslayer}></div>
      <p style={{textDecoration: "ellipsis" , maxLines: "1"}}>{props.children}</p>
    </div>
  );
}
