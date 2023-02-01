import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/WebT_02_Package/WebT_02.loader.js",
  dataUrl: "/Build/WebT_02_Package/WebT_02.data",
  frameworkUrl: "/Build/WebT_02_Package/WebT_02.framework.js",
  codeUrl: "/Build/WebT_02_Package/WebT_02.wasm"
})


function WebT_02() {
  return (
    <div className="unity_container">
      <Unity className="unity_screen"
        unityContext={unityContext}
      />
    </div>
  );
}

export default WebT_02;