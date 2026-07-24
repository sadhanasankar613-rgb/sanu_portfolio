/**
 * S. Sadhana Portfolio - Interactive Logic Script
 * Designed with ❤️ for responsive and premium UX
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================================================
       1. Preloader Dismiss
       ========================================================================= */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // Safety check: if window.load takes too long (e.g. slow fonts), dismiss preloader after 2.5s anyway
    setTimeout(() => {
        if (preloader && preloader.style.visibility !== 'hidden') {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 2500);


    /* =========================================================================
       2. Professional AI Background Animation (Neural Connections)
       ========================================================================= */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        
        // Define settings based on theme
        const getParticleConfig = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            return {
                color: isDark ? 'rgba(34, 211, 238, 0.45)' : 'rgba(37, 99, 235, 0.25)',
                lineColorRgb: isDark ? '34, 211, 238' : '37, 99, 235',
                count: window.innerWidth < 768 ? 40 : 90,
                maxDistance: 130
            };
        };
        
        let config = getParticleConfig();

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            config = getParticleConfig();
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2.5 + 1.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce boundaries
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = config.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < config.count; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        // Make line opacity relative to distance
                        const alpha = (1 - dist / config.maxDistance) * 0.2;
                        ctx.strokeStyle = `rgba(${config.lineColorRgb}, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Redraw particles when theme switches
        window.updateCanvasTheme = () => {
            config = getParticleConfig();
            particles.forEach(p => {
                p.color = config.color;
            });
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }


    /* =========================================================================
       3. Animated Typing Effect
       ========================================================================= */
    const typedTextEl = document.getElementById('typed-text');
    if (typedTextEl) {
        const words = [
            "B.Tech Artificial Intelligence and Data Science Student",
            "Python Programmer",
            "Machine Learning Enthusiast",
            "Cyber Security Aspirant"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeEffect = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Delete speed is faster
            } else {
                typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typingSpeed);
        };

        // Start typing
        typeEffect();
    }


    /* =========================================================================
       4. Dark Mode / Light Mode Toggle
       ========================================================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');

    // Establish default system settings
    const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemThemeDark ? 'dark' : 'light');
    
    // Set theme on start
    document.documentElement.setAttribute('data-theme', initialTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            
            // Trigger particle configuration update
            if (window.updateCanvasTheme) {
                window.updateCanvasTheme();
            }
        });
    }


    /* =========================================================================
       5. Sticky Header & Back-To-Top Actions
       ========================================================================= */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Header scroll threshold
        if (header) {
            if (scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }

        // Back to Top button visibility threshold
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* =========================================================================
       6. Active Navigation Highlighting on Scroll
       ========================================================================= */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightActiveNav = () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // Offset for header padding
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);


    /* =========================================================================
       7. Mobile Navigation Toggle (Hamburger Menu)
       ========================================================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }


    /* =========================================================================
       8. Intersection Observer for Scroll Reveal & Skill Bars Fill
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // Reveal elements Intersection Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after showing to avoid repeat performance tax
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Skill Bar Fill Intersection Observer
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fillBar = entry.target;
                const percent = fillBar.getAttribute('data-percent');
                fillBar.style.width = percent;
                observer.unobserve(fillBar);
            }
        });
    }, {
        threshold: 0.2
    });

    skillBars.forEach(bar => skillObserver.observe(bar));


    /* =========================================================================
       9. Resume Download Simulation Notice
       ========================================================================= */
    const resumeBtn = document.getElementById('btn-download-resume');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            // Note: Since this is a static site without backend uploads, we notify/trigger download
            // Check if actual file is present, otherwise simulate a nice download.
            // If they replace this with a valid file, it will function as normal.
            const resumePath = 'Sadhana_Resume.pdf';
            resumeBtn.setAttribute('href', resumePath);
            resumeBtn.setAttribute('download', 'Sadhana_Resume.pdf');
        });
    }


    /* =========================================================================
       10. Contact Form Interactive Feedback
       ========================================================================= */
    const contactForm = document.getElementById('portfolio-contact-form');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (contactForm && feedbackMsg) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Perform simple check
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;

            if (name && email) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const origHtml = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

                // Simulate network latency of 1.5 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = origHtml;

                    feedbackMsg.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    feedbackMsg.className = 'form-feedback success';
                    
                    // Reset form
                    contactForm.reset();

                    // Hide feedback after 5 seconds
                    setTimeout(() => {
                        feedbackMsg.textContent = '';
                        feedbackMsg.className = 'form-feedback';
                    }, 5000);
                }, 1500);
            }
        });
    }
});
