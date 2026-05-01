document.addEventListener('DOMContentLoaded', () => {
    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .project-item, .project-filler');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // --- STICKY NAVIGATION ---
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));

    // --- STATS COUNT-UP ---
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'));
                if (isNaN(countTo)) return;

                let current = 0;
                const duration = 800;
                const stepTime = Math.max(10, Math.abs(Math.floor(duration / countTo)));
                
                const counter = setInterval(() => {
                    current += 1;
                    target.innerText = current;
                    if (current >= countTo) {
                        target.innerText = countTo;
                        clearInterval(counter);
                    }
                }, stepTime);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => statsObserver.observe(num));

    // --- IMAGE PARALLAX ---
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        const parallaxImages = document.querySelectorAll('.hero-bg img, .project-item img');
        parallaxImages.forEach(img => {
            img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
    });

    // --- MOBILE MENU ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileMenuBtn.classList.toggle('active');
    });

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you! Your message has been sent. We will get back to you soon.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // --- PAGE LOAD STAGGER ---
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) {
        const text = heroH1.innerText;
        heroH1.innerHTML = '';
        text.split('\n').forEach((line, i) => {
            const span = document.createElement('span');
            span.style.display = 'block';
            span.style.overflow = 'hidden';
            const inner = document.createElement('span');
            inner.innerText = line;
            inner.style.display = 'block';
            inner.style.transform = 'translateY(100%)';
            inner.style.transition = `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s`;
            span.appendChild(inner);
            heroH1.appendChild(span);
            
            setTimeout(() => {
                inner.style.transform = 'translateY(0)';
            }, 100);
        });
    }
});
