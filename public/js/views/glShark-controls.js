'use strict'
const Controls = function() {


    const init = () => {
        
        d3.select("#back").on("click", () => {
            glShark.selection.select(null, glShark.selection.HOLE);
        })

     
    }

    const update = () => {
    
    }

    return {
        init,
        update
    }
}