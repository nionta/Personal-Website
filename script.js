/**
 * Academic Portfolio — Interactive Behavior
 * Navigation, scroll reveal, active link tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initActiveNavLink();
});


/* ── Navbar scroll effect ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/* ── Mobile menu toggle ── */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}


/* ── Scroll reveal animations ── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.06,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* ── Active navigation link tracking ── */
function initActiveNavLink() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = Array.from(document.querySelectorAll('.nav__links a'));
  if (!sections.length || !navAnchors.length) return;

  // Offset: nav height + a comfortable buffer so the "current" section
  // becomes active once its top crosses this line
  const OFFSET = 120;

  const update = () => {
    const scrollY = window.scrollY;

    // Find the last section whose top has passed the offset line
    let currentId = sections[0].id;
    for (const section of sections) {
      if (section.offsetTop - OFFSET <= scrollY) {
        currentId = section.id;
      } else {
        break;
      }
    }

    // Near-bottom edge case: force last section active
    if (window.innerHeight + scrollY >= document.body.offsetHeight - 40) {
      currentId = sections[sections.length - 1].id;
    }

    navAnchors.forEach(anchor => {
      anchor.classList.toggle(
        'active',
        anchor.getAttribute('href') === '#' + currentId
      );
    });
  };

  // Throttle via rAF for smooth performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial call + clear active state when clicking nav links
  // (so the scroll handler can set it correctly after scroll completes)
  update();
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      // Let scroll happen, then re-evaluate after scroll finishes
      setTimeout(update, 700);
    });
  });
}
