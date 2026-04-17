// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Mobile Menu Toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Scroll Reveal Animations ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { 
    threshold: .06, 
    rootMargin: '0px 0px -30px 0px' 
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// --- Staggered Project Cards Animation ---
document.querySelectorAll('.project-card').forEach((card, index) => {
    // Set initial state
    card.style.cssText = 'opacity:0; transform:translateY(18px); transition:opacity .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1)';
    
    // Create observer for staggered reveal
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = (index * 70) + 'ms';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: .04 
    }).observe(card);
});

// --- Active Nav Link Highlighting ---
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => {
                // Highlight the link matching the current section's ID
                if (a.getAttribute('href') === '#' + entry.target.id) {
                    a.style.color = '#0b1a2b'; // Active state color
                } else {
                    a.style.color = ''; // Reset others
                }
            });
        }
    });
}, { 
    threshold: .2 
});

sections.forEach(section => {
    sectionObserver.observe(section);
});