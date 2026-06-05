/* =========================================================
   TechNova 2026 — Main Script
   ========================================================= */

// --------- Theme Toggle ---------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('technova_theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('technova_theme', current);
  updateThemeIcon(current);
});

function updateThemeIcon(theme) {
  const icon = themeToggle?.querySelector('i');
  if (!icon) return;
  icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// --------- Mobile Menu ---------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// --------- Navbar shadow on scroll ---------
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
  backToTop?.classList.toggle('visible', window.scrollY > 400);
});

// --------- Back to top ---------
backToTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// --------- Reveal on scroll ---------
const revealEls = document.querySelectorAll('.feature-card, .speaker-card, .stat, .section-head, .form-card');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// --------- Animated counters ---------
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterIO.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

// --------- Registration Form ---------
const form = document.getElementById('registrationForm');

const validators = {
  fullName: v => v.trim().length >= 2 || 'Please enter your full name (min 2 characters).',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
  phone: v => /^\d{10}$/.test(v.trim()) || 'Phone number must be exactly 10 digits.',
  college: v => v.trim().length >= 2 || 'Please enter your college name.',
};

function validateField(name, value) {
  const result = validators[name](value);
  const errEl = document.getElementById('err-' + name);
  const input = document.getElementById(name);
  if (result === true) {
    errEl.textContent = '';
    input.classList.remove('invalid');
    return true;
  }
  errEl.textContent = result;
  input.classList.add('invalid');
  return false;
}

// Live validation
Object.keys(validators).forEach(name => {
  const input = document.getElementById(name);
  input?.addEventListener('input', () => {
    if (name === 'phone') input.value = input.value.replace(/\D/g, '').slice(0, 10);
    if (input.classList.contains('invalid')) validateField(name, input.value);
  });
  input?.addEventListener('blur', () => validateField(name, input.value));
});

form?.addEventListener('submit', e => {
  e.preventDefault();
  const data = {};
  let ok = true;
  Object.keys(validators).forEach(name => {
    const value = document.getElementById(name).value;
    data[name] = value.trim();
    if (!validateField(name, value)) ok = false;
  });
  if (!ok) {
    document.querySelector('.invalid')?.focus();
    return;
  }
  data.registeredAt = new Date().toISOString();
  localStorage.setItem('technova_registration', JSON.stringify(data));
  window.location.href = '/success.html';
});
