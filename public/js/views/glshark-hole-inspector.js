'use strict'

const HoleInspector = function() {
    const blueColor = d3.rgb(0, 174, 239);
    const whiteColor = d3.rgb(220, 220, 220);

    let msg = new SpeechSynthesisUtterance();

    const init = () => {
        console.log("INIT HOLE INSPECTOR");

     
    }

    const update = () => {
        const selectedHole = glShark.selection.getSelectedHole();
        console.log("inspector-selectedHole: ", selectedHole)

        

        if (!selectedHole) {
            // clean up display
            return
        }

        if (selectedHole && glShark.model.playQuip) {
            
            msg.text = selectedHole.quip;
            window.speechSynthesis.speak(msg);
        }

        let blues = (glShark.model.getTees() === glShark.model.BLUE_TEES);

        d3.select("#hi-diagram-img")
            .attr("src", "images/hole-" + selectedHole.number + ".jpg");

        const holeMain = d3.select("#hole-inspector")

        holeMain.select("#hi-hole-number-big")
            .text(selectedHole.number)

        holeMain.select("#hi-data-par")
            .text(selectedHole.par)

        holeMain.select("#hi-data-yard")
            .style("color", (blues) ? blueColor : whiteColor)
            .text((blues) ? selectedHole.blueYards : selectedHole.whiteYards)

        holeMain.select("#hi-data-handicap")
            .text(selectedHole.handicap)

        holeMain.select("#hi-data-ave")
            .text(Number(selectedHole.average).toFixed(2))
            
        holeMain.select("#hi-data-play")
            .text((blues) ? selectedHole.blueSuggestion : selectedHole.whiteSuggestion)

        
        holeMain.select("#hi-quip")
            .text('"' + selectedHole.quip + '"')
            .on("click", function() {
                msg.text = selectedHole.quip;
                window.speechSynthesis.speak(msg);
            })

        

        // holeMain.on("touchstart", () => {
        //     let event = d3.event

        //     console.log("touchstart: ", event)
        // })
        // .on("touchend", () => {
        //     let event = d3.event

        //     console.log("touchend: ", event)
        // }) 
        
    }

    return {
        init,
        update
    }
}