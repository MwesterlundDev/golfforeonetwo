'use strict';

glShark.controller = (function () {

    const appLoaded = (eventData) => {
        console.log("controller APP LOADED: ", glShark.model.getHoles());
        console.log("isMobile: ", glShark.model.getMobile())
       
        glShark.views.holeTable.init();
        glShark.views.controls.init();
        
    }

    const holeSelected = function() {
        if (glShark.model.getMobile()) {
            toggleMainView();
        }   
        glShark.views.holeTable.update();
        glShark.views.holeInspector.update();
    }

    const toggleMainView = () => {
        if (glShark.selection.getSelectedHole()) {
            d3.select("#hole-table").style('display', "none");
        } else {
            d3.select("#hole-table").style('display', "block");
        }
    }

    // register for events
    const registerEvents = () => {
        glShark.events.register(glShark.events.APP_LOADED, appLoaded);
        glShark.events.register(glShark.events.HOLE_SELECTED, holeSelected);

    };

    const init = () => {
        registerEvents();
    };

    return {
        init
    }

})();