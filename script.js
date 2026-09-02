const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30));

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.classList.toggle('open', !open);
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.classList.remove('open');
  nav.classList.remove('open');
}));

document.addEventListener('pointermove', event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll('.project-detail-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!isOpen));
    button.nextElementSibling.classList.toggle('open', !isOpen);
  });
});

const heroArt = document.querySelector('.hero-art');
const floatingCards = document.querySelectorAll('.floating-card');
heroArt.addEventListener('pointermove', event => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const rect = heroArt.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  floatingCards[0].style.transform = `rotate(-4deg) translate(${x * 12}px, ${y * 12}px)`;
  floatingCards[1].style.transform = `rotate(7deg) translate(${x * -16}px, ${y * -16}px)`;
});
heroArt.addEventListener('pointerleave', () => {
  floatingCards[0].style.transform = 'rotate(-4deg)';
  floatingCards[1].style.transform = 'rotate(7deg)';
});
