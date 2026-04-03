/* ========================================
   AADESH PANDEY PORTFOLIO — SCRIPTS
   ======================================== */

// --- LOADER ---
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1400);
});

// --- CURSOR GLOW ---
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = scrollY;
});

// --- MOBILE MENU ---
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- SCROLL ANIMATIONS ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// --- COUNTER ANIMATION ---
function animateCounters() {
  document.querySelectorAll('.stat-num[data-count]').forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// --- SMOOTH SCROLL FOR NAV LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- ACTIVE NAV LINK ---
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    const formData = {
      name: contactForm.querySelector('#name').value,
      email: contactForm.querySelector('#email').value,
      message: contactForm.querySelector('#message').value,
    };

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    try {
      // Try backend API first
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        btn.innerHTML = '<span>Message Sent! ✓</span>';
        contactForm.reset();
      } else {
        throw new Error('Backend not available');
      }
    } catch {
      // Fallback: mailto
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:2002.aman.p@gmail.com?subject=${subject}&body=${body}`;
      btn.innerHTML = '<span>Opening Email Client...</span>';
      contactForm.reset();
    }

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}

// --- TILT EFFECT ON PROJECT CARDS ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c Aadesh Pandey Portfolio ', 'background: #6c5ce7; color: #fff; font-size: 14px; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
