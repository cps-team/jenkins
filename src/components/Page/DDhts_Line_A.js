import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/DDhts_Line_A/DDhts_Line_A.loader.js",
  dataUrl: "/Build/DDhts_Line_A/DDhts_Line_A.data",
  frameworkUrl: "/Build/DDhts_Line_A/DDhts_Line_A.framework.js",
  codeUrl: "/Build/DDhts_Line_A/DDhts_Line_A.wasm"
})

function Main() {
  return (
    <div className="unity_container">
      <Unity className="unity_screen"
        unityContext={unityContext}
      />
    </div>
  );
}

export default Main;