window.onload = (event) => {
	console.log("LOAD CITY BOY!");

    let msg = new SpeechSynthesisUtterance();

	d3.select("#city-boi")
    .on("click", function() {
        msg.text = "city boy!"
        window.speechSynthesis.speak(msg);
    })
}

