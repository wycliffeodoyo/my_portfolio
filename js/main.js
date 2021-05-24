//navigation menu

(() => {
    const hambBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNav = navMenu.querySelector(".close-nav-menu");
    hambBtn.addEventListener('click', showNav);
    closeNav.addEventListener('click', close);

    function showNav() {
        navMenu.classList.toggle("open");
        bodyScrolToggle();
    }

    function close() {
        navMenu.classList.remove("open");
        FadeOutEffect();
        bodyScrolToggle();
    }

    function FadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {

            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    /*------------------------------------
    attach an event handler to the document
    --------------------------------------*/
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains("link-item")) {
            //make sure event.target has a value before overridding default value
            if (event.target.hash !== "") {
                //prevent default anchor clicck behavior
                event.preventDefault();
                const hash = event.target.hash;
                //deactivate existing active section
                document.querySelector("section.active").classList.add("hide");
                document.querySelector("section.active").classList.remove("active");
                //activating new section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                //deactive existing active nav link
                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");

                //if clicked link is contained in the navigation menu
                if (navMenu.classList.contains("open")) {
                    //activate new nav link item
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    //hide navigation menu
                    close();
                } else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash == item.hash) {
                            //activate new nav link item
                            item.classList.add("active", "inner-shadow");

                        }
                    })
                    FadeOutEffect();
                }
                //add hash to url
                window.location.hash = hash;

                AOS.init();


            }
        }
    })
})();


/*----about section tabs---*/

(() => {
    const aboutSection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {

        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            //deactivate existing active tab-item
            tabsContainer.querySelector(".active", ".outer-shadow")
                .classList.remove("outer-shadow", "active");
            //activate new tab item
            event.target.classList.add("outer-shadow", "active");
            //deactivate existing active tab content
            const list = aboutSection.querySelector(".tab-content.active")
                .classList.remove("active");
            //activate new tab content
            aboutSection.querySelector(target).classList.add("active");

            AOS.init();
        }

    })
})();


function bodyScrolToggle() {
    document.body.classList.toggle("stop-scrolling")

}



/*---------------portfolio filter and popup------------*/
(() => {

    const filterContainer = document.querySelector(".portfolio-filter"),
        portfolioItemsContainer = document.querySelector(".portfolio-items"),
        portfolioItems = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = document.querySelector(".pp-prev"),
        nextBtn = document.querySelector(".pp-next"),
        closeBtn = document.querySelector("pp-close"),
        projectDetailsContainer = popup.querySelector(".pp-details"),
        projectDetailBtn = popup.querySelector("pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;




    //filter portfolio items
    filterContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {

            //deactivating current active filter item
            let item = filterContainer.querySelector(".active");
            item.classList.remove("active", "outer-shadow")
                //activate new filter-item
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");


            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })

        }
    });

    portfolioItemsContainer.addEventListener('click', (event) => {
        if (event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //get portfolioitem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img ").getAttribute("data-screenshots");
            //convert screenshots into array
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";

            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();



        }
    });



    //closebtn
    let main = document.querySelector(".pp-main-inner");
    let cloz = main.querySelector(".pp-close");
    cloz.addEventListener('click', () => {
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    })



    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrolToggle();

    }

    function popupSlideshow() {
        const imgsrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        //activate loader
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgsrc;
        popupImg.onload = () => {
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        let ppmain = document.querySelector(".pp-main-inner"),
            counter = ppmain.querySelector(".pp-counter");
        counter.innerHTML = (slideIndex + 1) + "of" + screenshots.length;
    }

    //nextslide
    nextBtn.addEventListener('click', () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();

    })

    //prevslide
    prevBtn.addEventListener('click', () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    })


    function popupDetails() {

        if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            detailBtn.style.display = "none";
            return;
        }
        detailBtn.style.display = "block";
        //get the project details category and title
        portfolioItems[itemIndex].querySelector(".portfolio-item-details")
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-tittle").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");




    }





    let detailBtn = document.querySelector(".pp-project-details-btn")
    detailBtn.addEventListener('click', () => {
        popupDetailsToggle();
    })


    function popupDetailsToggle() {

        if (projectDetailsContainer.classList.contains("active")) {
            detailBtn.querySelector("i").classList.remove("fa-minu")
            detailBtn.querySelector("i").classList.add("fa-plus")
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            detailBtn.querySelector("i").classList.remove("fa-plus")
            detailBtn.querySelector("i").classList.add("fa-minus")
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }



})();




/*--------------
testimonials section
----------------*/
(() => {
    const sliderContainer = document.querySelector(".testi-slider-container");
    const slides = sliderContainer.querySelectorAll(".testi-item");
    const slideWidth = sliderContainer.offsetWidth;
    const prevBtn = document.querySelector(".testi-slider-nav .prev");
    const nextBtn = document.querySelector(".testi-slider-nav .next");
    let slideIndex = 0;

    slides.forEach((slide) => {
        //set width of all slides
        slide.style.width = slideWidth + "px";
    });

    sliderContainer.style.width = slideWidth * slides.length + "px";





})();

//hide all sections except active
(() => {

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();


window.addEventListener('load', () => {
    document.querySelector(".preLoader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preLoader").style.display = "none";
    }, 600);
    AOS.init();
})