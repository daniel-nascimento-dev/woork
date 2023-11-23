// MenuMobile
const menuBtn = document.querySelector('.menu')
const menuContainer = document.querySelector('.menuMobile')
const closeBtn = document.querySelector('.menuMobile svg')

menuBtn.addEventListener('click', showMenu)
closeBtn.addEventListener('click', () => {
	showMenu()
})

function showMenu() {
	menuContainer.classList.toggle('hide')
}



// About tabs
const tabsContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");

tabsContainer.addEventListener('click', (e)=>{
	if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
		tabsContainer.querySelector(".active").classList.remove("active");
		e.target.classList.add("active");
		const target = e.target.getAttribute("data-target");
		aboutSection.querySelector(".tab-content.active").classList.remove("active");
		aboutSection.querySelector(target).classList.add("active");
	}
});


function bodyScrollingToggle() {
	document.body.classList.toggle("hidden-scrolling");
}

// portfolio filter and popup
(() =>{

	const filterContainer = document.querySelector(".portfolio-filter"),
	portfolioItemsContainer = document.querySelector(".portfolio-items"),
	portfolioItems = document.querySelectorAll(".portfolio-item"),
	popup = document.querySelector(".portfolio-popup"),
	prevBtn = document.querySelector(".pp-prev"),
	nextBtn = document.querySelector(".pp-next"),
	closeBtn = document.querySelector(".pp-close"),
	projectDetailsContainer = popup.querySelector(".pp-details"),
	projectDetailsBtn = document.querySelector(".pp-project-details-btn");

	let itemIndex, slideIndex, screenshots;


	// filter portfolio items
	filterContainer.addEventListener("click", (e)=>{
		if(e.target.classList.contains("filter-item") && !e.target.classList.contains("active")) {
			// deactivate existing active 'filter-item'
			filterContainer.querySelector(".active").classList.remove('active');
			// activete new filter-item
			e.target.classList.add("active");

			const target = e.target.getAttribute("data-target");
			portfolioItems.forEach((item)=>{
				if(target === item.getAttribute("data-category") || target === "all") {
					item.classList.remove("hide");
					item.classList.add("show");
				} 
				else{
					item.classList.remove("show");
					item.classList.add("hide");
				}
			});

		}
	});

	portfolioItemsContainer.addEventListener("click", (event) =>{

		if(event.target.closest(".portfolio-item-inner")){
			const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
			// get the portfolioItem index
			itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
			screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
			// convert screenshots into array
			screenshots = screenshots.split(",");
			if(screenshots.length === 1){
				prevBtn.style.display="none"; 
				nextBtn.style.display="none";
			}
			else{
				prevBtn.style.display="block"; 
				nextBtn.style.display="block";
			}
			slideIndex = 0;
			popupToggle();
			popupSlideshow();
			popupDetails();
		}

	});

	closeBtn.addEventListener("click", () =>{
		popupToggle();
		if(projectDetailsContainer.classList.contains("active")) {
			popupDetailsToggle();
		}
	});

	function popupToggle() {
		popup.classList.toggle("open");
		bodyScrollingToggle();
	}

	function popupSlideshow(){
		const imgSrc = screenshots[slideIndex];
		const popupImg = popup.querySelector(".pp-img");
		// activate loader until the popupImg loaded
		popup.querySelector(".pp-loader").classList.add("active");
		popupImg.src=imgSrc;
		popupImg.onload = () =>{
			// deactivate loader after the popupImg loaded
			popup.querySelector(".pp-loader").classList.remove("active");
		}
		popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " de " + screenshots.length;
	}

	// next slide
	nextBtn.addEventListener("click", () =>{
		if(slideIndex === screenshots.length-1) {
			slideIndex = 0;
		} 
		else{
			slideIndex++;
		}
		popupSlideshow();
	});

	// prev slide
	prevBtn.addEventListener("click", () =>{
		if(slideIndex === 0) {
			slideIndex = screenshots.length-1;
		}
		else{
			slideIndex--;
		}
		popupSlideshow();
	})

	function popupDetails(){
		// if portfolio-item-details not exists
		if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
			projectDetailsBtn.style.display="none";
			return; /*end function execution*/
		}
		projectDetailsBtn.style.display="block";
		// get the project details
		const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
		// set the project details
		popup.querySelector(".pp-project-details").innerHTML = details;
		// get the project title
		const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
		// set the project title
		popup.querySelector(".pp-title h2").innerHTML = title;
		// get the project category
		const category = portfolioItems[itemIndex].getAttribute("data-category");
		// set the project category
		popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
	}

	projectDetailsBtn.addEventListener("click", ()=>{
		popupDetailsToggle();
	});	

	function popupDetailsToggle() {
		if(projectDetailsContainer.classList.contains("active")) {
			projectDetailsBtn.querySelector("i").classList.remove("lni-minus");
			projectDetailsBtn.querySelector("i").classList.add("lni-plus");
			projectDetailsContainer.classList.remove("active");
			projectDetailsContainer.style.maxHeight = 0 + "px";
		}
		else{
			projectDetailsBtn.querySelector("i").classList.add("lni-minus");
			projectDetailsBtn.querySelector("i").classList.remove("lni-plus");
			projectDetailsContainer.classList.add("active");
			projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
			popup.scrollTo(0, projectDetailsContainer.offsetTop);
		}
	}

})();