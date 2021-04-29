'Use Strict';

glShark.selection = (function () {
    const HOLE = "hole";

    let selectedHole = null;

    const selectHole = (number, sendEvent) => {
        if (number != null) {
            console.log("Select hole: ", number)
            if (selectedHole && number === selectedHole.number) {
                selectedHole = null;
            } else {
                const hole = glShark.model.getHole(number);

                if (hole) {
                    selectedHole = hole;
                } else {
                    selectedHole = null;
                }
            }
        } else {
            selectedHole = null;
        }

        if (sendEvent) {
            glShark.events.send(glShark.events.HOLE_SELECTED, {id: number});
        }
    }

    const getSelectedHole = () => {
        return selectedHole;
    }

 /**
     * Registers an object as selected, null if not selected
     * @param {String} id id to select
     * @param {String} type object type
     */
    const select = (id, type, sendEvent) => {
        console.log("Selected: ", id, type, sendEvent);
        switch (type) {
            case HOLE:
                selectHole(id, true);
                break;
            default:
                console.log(`${type} does not exist`);
        }
    }

    return {
        select,
        getSelectedHole,

        HOLE,
    }

})();