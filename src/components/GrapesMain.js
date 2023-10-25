import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsForms from 'grapesjs-plugin-forms';
import thePlugin from 'grapesjs-plugin-export';
import plugin from 'grapesjs-blocks-basic';
import Navbare from 'grapesjs-navbar';
import newsletter from 'grapesjs-preset-newsletter';

import "../components/app.css";


function GrapesjsMain() {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#editor",
      plugins : [gjsPresetWebpage,
        gjsForms
        ,thePlugin ,plugin,Navbare,newsletter,  
    ],
      pluginsOpts:{
        gjsPresetWebpage:{},
        gjsForms:{},
        thePlugin:{},
        plugin:{},
        Navbare:{},
        newsletter:{},

      }
    });
    setEditor(editor);
  }, []);

  return (
    <div className="GrapesjsMain">
      <div id="editor"></div>
    </div>
  );
}

export default GrapesjsMain;
