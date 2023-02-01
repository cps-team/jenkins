import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/MapBuild/MapBuild.loader.js",
  dataUrl: "/Build/MapBuild/MapBuild.data",
  frameworkUrl: "/Build/MapBuild/MapBuild.framework.js",
  codeUrl: "/Build/MapBuild/MapBuild.wasm"
})

function GangneungMap() {
  let factoryLocationCode;

  if (window.location.pathname.includes('/')) {
    factoryLocationCode = window.location.pathname.replace('/', '');
  }
  sessionStorage.setItem('factoryLocationCode', factoryLocationCode);

  return (
    <div className="unity_container">
      <Unity className="unity_screen"
        unityContext={unityContext}
      />
    </div>
  );
}

export default GangneungMap;