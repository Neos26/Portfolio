// Hide/show the main navigation bar based on scroll direction
let lastScrollY = window.scrollY;
const navbar = document.querySelector(".main-navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down – hide navbar
    navbar.classList.add("hide-navbar");
  } else {
    // Scrolling up – show navbar
    navbar.classList.remove("hide-navbar");
  }
  lastScrollY = window.scrollY;
});

// Initialize auto-scrolling skills carousel
function setupCarousel(id, reverse = false) {
  const el = document.getElementById(id);
  if (!el) return;

  // Duplicate carousel content for seamless scroll
  el.innerHTML += el.innerHTML;
  const items = el.querySelectorAll(".skills-carousel-item");
  const itemWidth = items[0].offsetWidth + 48;
  let pos = reverse ? itemWidth * (items.length / 2) : 0;

  function animate() {
    pos += reverse ? -1 : 1;

    if (
      (!reverse && pos >= itemWidth * (items.length / 2)) ||
      (reverse && pos <= 0)
    ) {
      // Reset scroll position for infinite loop
      el.style.transition = "none";
      pos = reverse ? itemWidth * (items.length / 2) : 0;
      el.style.transform = `translateX(-${pos}px)`;
      void el.offsetWidth; // Force reflow
      el.style.transition = "transform 0.2s linear";
    } else {
      el.style.transform = `translateX(-${pos}px)`;
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener("DOMContentLoaded", () => {
    el.style.transition = "transform 0.2s linear";
    el.style.transform = `translateX(-${pos}px)`;
    animate();
  });
}

setupCarousel("skills-carousel");
setupCarousel("skills-carousel-rev", true);

// Add parallax effect on project image based on mouse movement
const projectFeature = document.querySelector(".project-feature");
const projectImgMove = document.getElementById("projectImgMove");

if (projectFeature && projectImgMove) {
  projectFeature.addEventListener("mousemove", (e) => {
    const rect = projectFeature.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const maxMove = 80;
    const moveX = x * maxMove * 2;
    projectImgMove.style.transform = `translateX(${moveX}px)`;
  });

  projectFeature.addEventListener("mouseleave", () => {
    projectImgMove.style.transform = `translateX(0px)`;
  });
}

// Project image carousel with manual left/right buttons
const images = [
  "portfolio_images/activity1.png",
  "portfolio_images/activity2.png",
  "portfolio_images/activity3.png",
  "portfolio_images/activity4.png",
  "portfolio_images/activity5.png",
  "portfolio_images/activity6.png",
  "portfolio_images/activity7.png",
  "portfolio_images/activity8.png",
  "portfolio_images/activity9.png",
  "portfolio_images/activity10.png",
];

let currentIndex = 0;
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");

// Show selected image in the carousel
function showImage(index) {
  carouselImage.classList.remove("carousel-show");
  carouselImage.classList.add("carousel-fade");

  setTimeout(() => {
    carouselImage.src = images[index];
    carouselImage.classList.replace("carousel-fade", "carousel-show");
  }, 400);
}

// Handle navigation button clicks
[prevBtn, nextBtn].forEach((btn, dir) =>
  btn.addEventListener("click", () => {
    currentIndex =
      (currentIndex + (dir ? 1 : -1) + images.length) % images.length;
    showImage(currentIndex);
  })
);

// Initialize first image
carouselImage.src = images[currentIndex];
carouselImage.classList.add("carousel-show");

// Enable smooth scroll for buttons with data-scroll-to attribute
document.querySelectorAll("button[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetId = btn.getAttribute("data-scroll-to");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Animate elements on scroll using IntersectionObserver
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      obs.unobserve(entry.target);
    }
  });
});

// Observe all elements with 'animate-on-scroll' class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});
