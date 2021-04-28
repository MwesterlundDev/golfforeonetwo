'use strict'


glShark.model = (function() {

    let isMobile = false;

    let holes = [];

    const init = () => {
        d3.json('rest/v1/hole-data', (results) => {
            holes = results.holes.map((hole) => {
                hole.id = hole.hole;

                return hole;
            });

            glShark.events.send(glShark.events.APP_LOADED, {})
        })


    }

    const getHoles = () => {
        return holes;
    }

    const setMobile = (mobile) => {
        isMobile = mobile;
    }

    const getMobile = () => {
        return isMobile;
    }

    return {
        init,
        getHoles,
        getMobile,
        setMobile
    }

})();