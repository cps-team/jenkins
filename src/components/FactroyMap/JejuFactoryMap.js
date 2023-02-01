import Unity, { UnityContext } from "react-unity-webgl";
import React from 'react';
import "../../css/Map.css";


const unityContext = new UnityContext({
    loaderUrl: "/Build/JejuFactoryMapBuild/JejuFactoryMapBuild.loader.js",
    dataUrl: "/Build/JejuFactoryMapBuild/JejuFactoryMapBuild.data",
    frameworkUrl: "/Build/JejuFactoryMapBuild/JejuFactoryMapBuild.framework.js",
    codeUrl: "/Build/JejuFactoryMapBuild/JejuFactoryMapBuild.wasm"
})

function JejuFactoryMap() {
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

export default JejuFactoryMap;