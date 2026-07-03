/* ═══════════════════════════════════════════════════
   PORTFOLIO – Philipp Reischer
   main.js
═══════════════════════════════════════════════════ */

// ── Contact Form (Web3Forms) ───────────────────────
const contactForm = document.getElementById('contact-form');
const sendBtn      = document.getElementById('send-btn');
const formSuccess  = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Sende-Zustand anzeigen, Button-Inhalt zwischenspeichern
    const originalBtnHTML = sendBtn.innerHTML;
    sendBtn.disabled  = true;
    sendBtn.innerHTML = 'Senden…';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        // Erfolg: Felder leeren, Danke-Meldung zeigen, Button ausblenden
        contactForm.reset();
        formSuccess.classList.remove('hidden');
        sendBtn.classList.add('hidden');
      } else {
        throw new Error(data.message || 'Senden fehlgeschlagen');
      }
    } catch (err) {
      // Fehler: Button schütteln + zurücksetzen
      sendBtn.classList.add('shake');
      setTimeout(() => sendBtn.classList.remove('shake'), 500);
      sendBtn.disabled  = false;
      sendBtn.innerHTML = originalBtnHTML;
    }
  });
}

// ── Typing Effect ──────────────────────────────────
const roles = [
  'Full-Stack Entwickler',
  'Frontend Entwickler',
  'Backend Entwickler',
  //'Problemlöser',
];
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

function type() {
  const typedEl = document.getElementById('typed-text');
  if (!typedEl) return;
  const current = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000; // Pause am Ende
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

// Start nach kurzem Delay
setTimeout(type, 1200);

// ── Navbar: scrolled-Klasse steuert Blur via CSS ───
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger Menu ─────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const iconBurger = document.getElementById('icon-burger');
const iconClose  = document.getElementById('icon-close');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  iconBurger.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    iconBurger.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

// ── Light/Dark Toggle ──────────────────────────────
const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const iconSun     = document.getElementById('icon-sun');
const iconMoon    = document.getElementById('icon-moon');

function applyTheme(isDark) {
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  // Desktop icons
  iconSun.classList.toggle('hidden', isDark);
  iconMoon.classList.toggle('hidden', !isDark);
  // Mobile icons
  const iconSunMobile  = document.getElementById('icon-sun-mobile');
  const iconMoonMobile = document.getElementById('icon-moon-mobile');
  if (iconSunMobile)  iconSunMobile.classList.toggle('hidden', isDark);
  if (iconMoonMobile) iconMoonMobile.classList.toggle('hidden', !isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Gespeicherte Präferenz laden
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const startDark = savedTheme ? savedTheme === 'dark' : prefersDark;
applyTheme(startDark);

themeToggle.addEventListener('click', () => {
  const isDark = html.classList.contains('dark');
  applyTheme(!isDark);
});

// Mobile Theme Toggle
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    applyTheme(!isDark);
  });
}

// ── Scroll Reveal ──────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));