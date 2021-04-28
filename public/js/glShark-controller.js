'use strict';

glShark.controller = (function () {

    const appLoaded = (eventData) => {
        console.log("controller APP LOADED: ", glShark.model.getHoles());
        console.log("isMobile: ", glShark.model.getMobile())
       
        glShark.views.holeTable.init();
        
    }

    // register for events
    const registerEvents = () => {
        glShark.events.register(glShark.events.APP_LOADED, appLoaded);

    };

    const init = () => {
        registerEvents();
    };

    return {
        init
    }

})();