import logo from "./logo.svg";
import styles from "./App.module.css";

import { createEffect } from "solid-js";

import { EditorScreen } from "./screens/EditorScreen/EditorScreen";

function App() {
  return (
   
      <div class={styles.App}>
        <EditorScreen></EditorScreen>
      </div>
   
  );
}

export default App;
