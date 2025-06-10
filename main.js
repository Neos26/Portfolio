// Hide/show the main navigation bar based on scroll direction
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.main-navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // User is scrolling down: hide navbar
    navbar.classList.add('hide-navbar');
  } else {
    // User is scrolling up: show navbar
    navbar.classList.remove('hide-navbar');
  }
  lastScrollY = window.scrollY;
});


// Forward-moving skills carousel (auto-scrolls left)
const skillsCarousel = document.getElementById('skills-carousel');
const skillsItems = skillsCarousel.querySelectorAll('.skills-carousel-item');
let position = 0;
const itemWidth = skillsItems[0].offsetWidth + 48; // 48px gap between items

// Duplicate items for seamless infinite loop
skillsCarousel.innerHTML += skillsCarousel.innerHTML;
const totalItems = skillsCarousel.querySelectorAll('.skills-carousel-item').length;

function animateCarousel() {
  position += 1;
  if (position >= itemWidth * (totalItems / 2)) {
    // Reset carousel to start for seamless looping
    skillsCarousel.style.transition = 'none';
    skillsCarousel.style.transform = `translateX(0px)`;
    position = 0;
    void skillsCarousel.offsetWidth; // Force reflow
    skillsCarousel.style.transition = 'transform 0.2s linear';
  } else {
    skillsCarousel.style.transform = `translateX(-${position}px)`;
  }
  requestAnimationFrame(animateCarousel);
}

window.addEventListener('DOMContentLoaded', () => {
  skillsCarousel.style.transition = 'transform 2s linear';
  animateCarousel();
});


// Reverse-moving skills carousel (auto-scrolls right)
const skillsCarouselReverse = document.getElementById('skills-carousel-rev');
const skillsItemsReverse = skillsCarouselReverse.querySelectorAll('.skills-carousel-item');
const itemWidthReverse = skillsItemsReverse[0].offsetWidth + 48;

// Duplicate items for seamless infinite loop
skillsCarouselReverse.innerHTML += skillsCarouselReverse.innerHTML;
const totalItemsReverse = skillsCarouselReverse.querySelectorAll('.skills-carousel-item').length;
let positionReverse = itemWidthReverse * (totalItemsReverse / 2);

function animateCarouselReverse() {
  positionReverse -= 1;
  if (positionReverse <= 0) {
    // Reset carousel to end for seamless looping
    skillsCarouselReverse.style.transition = 'none';
    positionReverse = itemWidthReverse * (totalItemsReverse / 2);
    skillsCarouselReverse.style.transform = `translateX(-${positionReverse}px)`;
    void skillsCarouselReverse.offsetWidth;
    skillsCarouselReverse.style.transition = 'transform 0.2s linear';
  } else {
    skillsCarouselReverse.style.transform = `translateX(-${positionReverse}px)`;
  }
  requestAnimationFrame(animateCarouselReverse);
}

window.addEventListener('DOMContentLoaded', () => {
  skillsCarouselReverse.style.transition = 'transform 0.2s linear';
  skillsCarouselReverse.style.transform = `translateX(-${positionReverse}px)`;
  animateCarouselReverse();
});


// Animate award cards when they enter the viewport
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll('.award-card.animate-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
});


// Move project image left/right based on mouse position (parallax effect)
const projectFeature = document.querySelector('.project-feature');
const projectImgMove = document.getElementById('projectImgMove');
if (projectFeature && projectImgMove) {
  projectFeature.addEventListener('mousemove', (e) => {
    const rect = projectFeature.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const maxMove = 80;
    const moveX = x * maxMove * 2;
    projectImgMove.style.transform = `translateX(${moveX}px)`;
  });
  projectFeature.addEventListener('mouseleave', () => {
    projectImgMove.style.transform = `translateX(0px)`;
  });
}


// Animate education timeline events when they enter the viewport
document.addEventListener("DOMContentLoaded", function () {
  const eduEvents = document.querySelectorAll('.education-event');
  function checkInView() {
    eduEvents.forEach(event => {
      const rect = event.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        event.classList.add('in-view');
      }
    });
  }
  window.addEventListener('scroll', checkInView);
  checkInView();
});


// Project showcase image carousel (manual left/right navigation)
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
  "portfolio_images/activity10.png"
];
let currentIndex = 0;
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");

function showImage(index) {
  // Fade out, change image, fade in
  carouselImage.classList.remove("carousel-show");
  carouselImage.classList.add("carousel-fade");
  setTimeout(() => {
    carouselImage.src = images[index];
    carouselImage.classList.remove("carousel-fade");
    carouselImage.classList.add("carousel-show");
  }, 400);
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// Set initial carousel image
carouselImage.src = images[currentIndex];
carouselImage.classList.add("carousel-show");

// Animate carousel section when it enters the viewport
document.addEventListener("DOMContentLoaded", function () {
  const carouselSection = document.querySelector('.simple-carousel');
  if (!carouselSection) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        carouselSection.classList.add('in-view');
        observer.unobserve(carouselSection);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(carouselSection);
});


// Animate contact section when it enters the viewport
document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector('.animate-contact');
  if (!contactSection) return;

  function onScroll() {
    const rect = contactSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      contactSection.classList.add('contact-in-view');
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});


// Animate contact and footer when they enter the viewport
document.addEventListener("DOMContentLoaded", function () {
  // Contact animation (already present)
  const contactSection = document.querySelector('.animate-contact');
  if (contactSection) {
    function onScrollContact() {
      const rect = contactSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        contactSection.classList.add('contact-in-view');
        window.removeEventListener('scroll', onScrollContact);
      }
    }
    window.addEventListener('scroll', onScrollContact);
    onScrollContact();
  }

  // Footer animation
  const footer = document.querySelector('.site-footer');
  if (footer) {
    function onScrollFooter() {
      const rect = footer.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        footer.classList.add('footer-in-view');
        window.removeEventListener('scroll', onScrollFooter);
      }
    }
    window.addEventListener('scroll', onScrollFooter);
    onScrollFooter();
  }
});


// Smooth scroll for buttons with data-scroll-to attribute
document.querySelectorAll('button[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', function () {
    const targetId = btn.getAttribute('data-scroll-to');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});