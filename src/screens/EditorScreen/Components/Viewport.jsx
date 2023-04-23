import { createEffect, onMount } from 'solid-js';
//import { Editor } from '../../../libs/EditorLib/js/editor';

//import  { viewportDiv , drawingLayer} from "../../../services/EditorApi.jsx";
import style from '../../../styles/viewport.module.css'


export function Viewport({ref}) {
    onMount(()=>{
       
        
    })
    return <div class={style.viewport} ref={ref}></div>
}