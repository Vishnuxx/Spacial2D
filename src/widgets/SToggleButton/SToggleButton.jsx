import { createSignal } from 'solid-js';
import style from './stogglebutton.module.css'

export function SToggleButton(props) {
    const state = (props.state == undefined)? false : props.state
   

    return <button class={(state)?style.selected:style.button} onClick={(e)=>props.onClick(e)}>
        {props.children}
    </button>
}