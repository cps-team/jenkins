import Unity, { UnityContext } from "react-unity-webgl";
import React from "react";
import "../../css/Map.css";

const unityContext = new UnityContext({
  loaderUrl: "/Build/Test_jeju_block1_district1/Test_jeju_block1_district1.loader.js",
  dataUrl: "/Build/Test_jeju_block1_district1/Test_jeju_block1_district1.data",
  frameworkUrl: "/Build/Test_jeju_block1_district1/Test_jeju_block1_district1.framework.js",
  codeUrl: "/Build/Test_jeju_block1_district1/Test_jeju_block1_district1.wasm",
});


function test_jeju_block1_district1() {
  console.log('unityContext : ', unityContext);
  return (
    <div className="unity_container">
      <Unity className="unity_screen"
        unityContext={unityContext}
      />
    </div>
  );
}

export default React.memo(test_jeju_block1_district1);
