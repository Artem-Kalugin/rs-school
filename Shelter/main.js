
function toggleMenu() {
	document.querySelector(".burger__menu").classList.toggle("burger__menu__active"); 
	document.querySelector(".blocker").classList.toggle("blocker__active"); 
	document.querySelectorAll(".burger").forEach(element =>{
		element.classList.toggle("burger__active");
	})
  }