const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
	panel.addEventListener("click", () => {
		removeActiveClasses(panels);
		panel.classList.add("active");
	});
});

function removeActiveClasses(panels) {
	panels.forEach((panel) => {
		panel.classList.remove("active");
	});
}
