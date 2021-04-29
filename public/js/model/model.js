'use strict'


glShark.model = (function() {
    const BLUE_TEES = "blueTees";
    const WHITE_TEES = "whiteTees";


    let isMobile = false;
    let playQuip = false;
    let tees = BLUE_TEES;

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

    const getHole = (number) => {
        for (let i = 0; i < holes.length; i++) {
            if(holes[i].number === number) {
                return holes[i]
            }
        }
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

    const getTees = () => {
        return tees;
    }

    return {
        init,
        getHoles,
        getMobile,
        getHole,
        setMobile,
        playQuip,
        getTees,

        BLUE_TEES,
        WHITE_TEES
    }

})();