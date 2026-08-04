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
    dot.addEventListener('click', () => { autoAdvance = false; goTo(i); });
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
    syncVideoAudio();
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

  const soundBtn = document.getElementById('skills-sound-btn');
  const iconOff = soundBtn.querySelector('.skills-sound-icon--off');
  const iconOn = soundBtn.querySelector('.skills-sound-icon--on');
  const allVideos = document.querySelectorAll('.skills-img-card:not(.skills-img-clone) video');
  let soundEnabled = false;
  let autoAdvance = true;

  allVideos.forEach((v, i) => {
    v.addEventListener('ended', () => {
      if (autoAdvance && i === current) goTo(current + 1);
    });
  });

  let carouselVisible = false;

  const carouselObserver = new IntersectionObserver((entries) => {
    carouselVisible = entries[0].isIntersecting;
    syncVideoAudio();
  }, { threshold: 0.1 });
  carouselObserver.observe(document.querySelector('.skills-carousel-images'));

  function syncVideoAudio() {
    allVideos.forEach((v, i) => {
      v.muted = !(soundEnabled && i === current && carouselVisible);
      if (i === current && carouselVisible) { v.play().catch(() => {}); } else { v.pause(); }
    });
  }

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    syncVideoAudio();
    iconOff.style.display = soundEnabled ? 'none' : '';
    iconOn.style.display = soundEnabled ? '' : 'none';
    soundBtn.setAttribute('aria-label', soundEnabled ? 'Wycisz' : 'Włącz dźwięk');
  });

  document.querySelectorAll('.skills-img-card video').forEach(v => {
    v.addEventListener('loadedmetadata', () => { v.currentTime = 0.001; });
  });

  imgCards[0].classList.add('active');
  snapTo(0);
  prevBtn.addEventListener('click', () => { autoAdvance = false; goTo(current - 1); });
  nextBtn.addEventListener('click', () => { autoAdvance = false; goTo(current + 1); });

  let touchStartX = 0;
  let touchStartY = 0;
  let dragBaseOffset = 0;
  let gestureDir = null;
  let isDragging = false;
  const carouselInner = document.querySelector('.skills-carousel-inner');

  carouselInner.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
    dragBaseOffset = -(current * imgCards[0].offsetWidth);
    gestureDir = null;
    isDragging = false;
  }, { passive: true });

  carouselInner.addEventListener('touchmove', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (!gestureDir && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
      gestureDir = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
    }
    if (gestureDir !== 'h') return;
    e.preventDefault();
    isDragging = true;
    strip.style.transition = 'none';
    strip.style.transform = 'translateX(' + (dragBaseOffset + dx) + 'px)';
  }, { passive: false });

  carouselInner.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    strip.style.transition = '';
    if (Math.abs(diff) < 40) { animateTo(current); return; }
    autoAdvance = false;
    goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  syncVideoAudio();
})();

// Log message for debugging
console.log('Real Dog Training - Site loaded. If you\'re reading this, I hope you find what you\'re looking for. 💚');
