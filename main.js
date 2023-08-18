//  Project section slider
new Glide(".glide", {
  type: "carousel",
  perView: 3,
  focusAt: 1,
  breakpoints: {
    600: {
      perView: 1,
    },
    900: {
      perView: 2,
    },
    1024: {
      perView: 3,
    },
  },
}).mount();

// Mobile Testimonial Slider
new Glide(".glide1", {
  type: "carousel",
  perView: 1,
  focusAt: 0,
}).mount();

let navbarHeight = document.querySelector(".navbar").offsetHeight + "px";
document.documentElement.style.setProperty("--scroll-padding", navbarHeight);

// Lazy loading of images and videos
const targets = document.querySelectorAll(".lazy-img");
const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.tagName === "IMG") {
          const img = entry.target;
          const src = img.getAttribute("data-lazy");
          img.setAttribute("src", src);
        } else if (entry.target.tagName === "SECTION") {
          const bgUrl = entry.target.getAttribute("data-bg");
          entry.target.style.backgroundImage = `url('${bgUrl}')`;
          entry.target.classList.add("loaded");
        } else {
          const bgUrl = entry.target.getAttribute("data-bg");
          entry.target.src = bgUrl;
        }
        observer.disconnect();
      }
    });
  });

  io.observe(target);
};
targets.forEach(lazyLoad);



// Mobile Hamburger Menu Handler
function handleHamburgerClick() {
  document.querySelector(".mob-sticky").style.display = "none";
  document.querySelector(".responsive-sidebar").classList.remove("d-none");
}

// Mobile Sidebar Close Btn Handler
function handleCloseBtnClick() {
  document.querySelector(".responsive-sidebar").classList.add("d-none");
  document.querySelector(".mob-sticky").style.display = "flex";
}

function closeMenu() {
  document.querySelector(".responsive-sidebar").classList.add("d-none");
  document.querySelector(".mob-sticky").style.display = "flex";
}

// Closing the mobile sidebar on body click
document.addEventListener("click", function (event) {
  var sidebar = document.querySelector(".responsive-sidebar");
  let hamburger = document.getElementById("hamburger");
  if (
    !sidebar.contains(event.target) &&
    !hamburger.contains(event.target) &&
    !sidebar.classList.contains("d-none")
  ) {
    handleCloseBtnClick();
  }
});

// Modal Container Close
function closeModal() {
  document.querySelector(".modal-container").close();
  document.body.style.filter = "";
}

// Modal Container Show
function showModal() {
  document.querySelector(".modal-container").showModal();
  document.querySelector(".modal-container").focus();
  document.querySelector(".modal-container").blur();


  document.body.style.filter = "blur(5px)";
}

// Navbar Active Line Handler
function handleActive(e) {

  let activeArr = Array.from(document.getElementsByClassName("active-line"));
  for (let i = 0; i < activeArr.length; i++) {
    activeArr[i].classList.add("d-none");
  }
  e.querySelector(".active-line").classList.remove("d-none");
}

const sectionData = ["home", "projects", "testimonials", "about", "contact"];

const handleScroll = () => {
  for (const section of sectionData) {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      const sectionTop = sectionElement.offsetTop - 115;
      const sectionBottom = sectionTop + sectionElement.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY <= sectionBottom) {
        let  a = document.getElementById(`${section}-a`)
        handleActive(a)
      }
    }
  }
};
window.addEventListener('scroll', handleScroll)
