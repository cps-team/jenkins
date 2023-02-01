import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/ChangwonMapBuild/ChangwonMapBuild.loader.js",
  dataUrl: "/Build/ChangwonMapBuild/ChangwonMapBuild.data",
  frameworkUrl: "/Build/ChangwonMapBuild/ChangwonMapBuild.framework.js",
  codeUrl: "/Build/ChangwonMapBuild/ChangwonMapBuild.wasm"
})

function ChangwonMap() {
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

export default ChangwonMap;