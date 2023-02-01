import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/WebT_03_Package/WebT_03.loader.js",
  dataUrl: "/Build/WebT_03_Package/WebT_03.data",
  frameworkUrl: "/Build/WebT_03_Package/WebT_03.framework.js",
  codeUrl: "/Build/WebT_03_Package/WebT_03.wasm"
})


function WebT_03() {
  return (
    <div className="unity_container">
      <Unity className="unity_screen"
        unityContext={unityContext}
      />
    </div>
  );
}

export default WebT_03;