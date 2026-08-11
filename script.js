// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
});

// ===== BACK TO TOP =====
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// ===== SKILL BARS =====
document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = bar.getAttribute('data-width') + '%';
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        contactForm.reset();
        formSuccess.classList.add('show');

        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 4000);
    }, 1500);
});

// ===== NAV LINKS SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPos = target.offsetTop - offset;
            window.scrollTo({ top: targetPos });
        }
    });
});

// ===== SG SCHEDULER SCREENSHOT GALLERY =====
const galleryImages = Array.from({ length: 17 }, (_, i) =>
    `images/sg-scheduler/sg-scheduler-${String(i + 1).padStart(2, '0')}.png`
);

const galleryModal = document.getElementById('gallery-modal');
const galleryImage = document.getElementById('gallery-image');
const galleryCounter = document.getElementById('gallery-counter');
const galleryTrigger = document.getElementById('sg-scheduler-gallery-trigger');
const galleryClose = document.getElementById('gallery-close');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
let galleryIndex = 0;

function showGalleryImage(index) {
    galleryIndex = (index + galleryImages.length) % galleryImages.length;
    galleryImage.src = galleryImages[galleryIndex];
    galleryCounter.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
}

function openGallery(index) {
    showGalleryImage(index);
    galleryModal.classList.add('open');
}

function closeGallery() {
    galleryModal.classList.remove('open');
}

if (galleryTrigger) {
    galleryTrigger.addEventListener('click', () => openGallery(0));
    galleryClose.addEventListener('click', closeGallery);
    galleryPrev.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
    galleryNext.addEventListener('click', () => showGalleryImage(galleryIndex + 1));

    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeGallery();
    });

    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('open')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
        if (e.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});
