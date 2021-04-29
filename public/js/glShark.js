'use strict'


window.onload = (event) => {
	console.log("LOAD GL SHARK!");

	if (window.innerWidth < 1199) {
		glShark.model.setMobile(true);
	}

	glShark.views = {};

	glShark.views.holeTable = new HoleTable();
	glShark.views.holeInspector = new HoleInspector();
	glShark.views.controls = new Controls();

	glShark.controller.init();

	glShark.model.init();
}