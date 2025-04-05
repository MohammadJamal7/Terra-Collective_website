  
document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Class Toggle on Scroll ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleNavbarScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleNavbarScroll);
        handleNavbarScroll(); // Initial check in case page loads scrolled
    }
    
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ignore empty or non-ID hashes, and Bootstrap collapse/tab triggers
            if (href === '#' || href === '' || href.startsWith('#collapse') || href.startsWith('#nav-')) {
                return;
            }
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = document.querySelector('.navbar')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // --- Intersection Observer for Scroll Animations ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation if you don't want it to repeat
                // observer.unobserve(entry.target);
            }
            // Optional: Else block to remove 'is-visible' if you want animations to reset when scrolling out
            // else { entry.target.classList.remove('is-visible'); }
        });
    }, {
        rootMargin: '0px', // No margin
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Observe elements with the class 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(elem => {
        animationObserver.observe(elem);
    });
    
    // Observe elements that need staggered children animations
    document.querySelectorAll('.stagger-children').forEach(container => {
        animationObserver.observe(container); // Observe the container
    });
    
    
    // --- Trigger Hero Section Animation on Load ---
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p, .hero-section .btn');
    if (heroElements.length > 0) {
        // Slight delay to ensure CSS is ready
        setTimeout(() => {
            heroElements.forEach(el => el.classList.add('visible'));
        }, 100); // 100ms delay
    }
    
    
    // --- Back to Top Button Functionality ---
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        const toggleBackToTop = () => {
            if (window.scrollY > 300) { // Show after scrolling 300px
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        };
        window.addEventListener('load', toggleBackToTop);
        window.addEventListener('scroll', toggleBackToTop);
    
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    
    // --- Bootstrap Form Validation Trigger ---
    const forms = document.querySelectorAll('.needs-validation');
     Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    }); // End DOMContentLoaded'
    