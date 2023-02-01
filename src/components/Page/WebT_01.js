import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/WebT_01_Package/WebT_01_Package.loader.js",
  dataUrl: "/Build/WebT_01_Package/WebT_01_Package.data",
  frameworkUrl: "/Build/WebT_01_Package/WebT_01_Package.framework.js",
  codeUrl: "/Build/WebT_01_Package/WebT_01_Package.wasm"
})


function WebT_01() {

  return (
    <div className="unity_container">
      <Unity className="unity_screen"
        unityContext={unityContext}
      />
    </div>
  );
}

export default WebT_01;