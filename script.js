// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});


// Add scroll reveal animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation CSS
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .story-block {
        opacity: 0;
    }
`;
document.head.appendChild(animationStyle);


// Observe all story blocks
document.querySelectorAll('.story-block').forEach(block => {
    observer.observe(block);
});


// Skills carousel
(function () {
  const textPanels = document.querySelectorAll('.skills-text-panel');
  const imgCards = document.querySelectorAll('.skills-img-card:not(.skills-img-clone)');
  const strip = document.getElementById('skills-strip');
  const dotsContainer = document.getElementById('skills-dots');
  const prevBtn = document.getElementById('skills-prev');
  const nextBtn = document.getElementById('skills-next');
  if (!textPanels.length || !strip) return;

  const count = textPanels.length;
  let current = 0;

  const dots = Array.from(textPanels).map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'skills-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slajd ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function snapTo(index) {
    const cardWidth = imgCards[0].offsetWidth;
    strip.style.transition = 'none';
    strip.style.transform = 'translateX(-' + (index * cardWidth) + 'px)';
    strip.getBoundingClientRect();
    strip.style.transition = '';
  }

  function animateTo(index) {
    const cardWidth = imgCards[0].offsetWidth;
    strip.style.transform = 'translateX(-' + (index * cardWidth) + 'px)';
  }

  function updateUI(next) {
    textPanels[current].classList.remove('active');
    imgCards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = next;
    textPanels[current].classList.add('active');
    imgCards[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function goTo(index) {

    const next = (index + count) % count;
    const forwardWrap = index >= count;
    const backwardWrap = index < 0;

    updateUI(next);

    if (forwardWrap) {
      // animate rightward: strip sweeps back to 0, card 0 enters from left
      animateTo(0);
    } else if (backwardWrap) {
      // snap to last, no clean way to animate without a second clone
      snapTo(count - 1);
    } else {
      animateTo(next);
    }
  }

  imgCards[0].classList.add('active');
  snapTo(0);
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
})();

// Log message for debugging
console.log('Real Dog Training - Site loaded. If you\'re reading this, I hope you find what you\'re looking for. 💚');
