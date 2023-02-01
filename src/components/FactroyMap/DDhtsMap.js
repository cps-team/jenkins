import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";


const unityContext = new UnityContext({
  loaderUrl: "/Build/DDhtsMapBuild/DDhtsMapBuild.loader.js",
  dataUrl: "/Build/DDhtsMapBuild/DDhtsMapBuild.data",
  frameworkUrl: "/Build/DDhtsMapBuild/DDhtsMapBuild.framework.js",
  codeUrl: "/Build/DDhtsMapBuild/DDhtsMapBuild.wasm"
})

function DDhtsMap() {
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

export default DDhtsMap;