'use strict'


window.onload = (event) => {
	console.log("LOAD GL SHARK!");

	if (window.innerWidth < 1199) {
		glShark.model.setMobile(true);
	}

	glShark.views = {};

	glShark.views.holeTable = new HoleTable();

	glShark.controller.init();

	glShark.model.init();
}