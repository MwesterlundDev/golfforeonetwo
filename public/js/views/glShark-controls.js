'use strict'
const Controls = function() {

    let msg = new SpeechSynthesisUtterance();


    const init = () => {
        
        d3.select("#back").on("click", () => {
            glShark.selection.select(null, glShark.selection.HOLE);
        })

        d3.select("#footer").on("click", () => {

            msg.text = "Don't be a Grimmie-ass bitch. Shut up or nut up. Stripe one down the fairway........Chicken Fucker";
            window.speechSynthesis.speak(msg);
        })
     
    }

    const update = () => {
    
    }

    return {
        init,
        update
    }
}