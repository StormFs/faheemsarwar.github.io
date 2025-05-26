(function cursorGlow() {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    
    document.addEventListener("mousemove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }
            } else {
                // Remove visible class when element leaves viewport
                entry.target.classList.remove('visible');
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                }
            }
        });
    }, observerOptions);

    // Observe main sections and project cards
    const sections = document.querySelectorAll('.hero-section, .about-section, .skills-section, .projects-section, .contact-section, .current-work-section');
    const projectCards = document.querySelectorAll('.project-card');
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Mobile menu functionality
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        // Initialize menu state
        mobileMenu.style.display = 'flex';
        
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling to document
            mobileMenu.classList.toggle('active');
            menuButton.classList.toggle('open');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // Projects navigation
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (prevButton && nextButton && projectsGrid) {
        let currentPosition = 0;
        const projectCards = document.querySelectorAll('.project-card');
        const totalProjects = projectCards.length;
        const updateProjectsVisibility = (direction = null) => {
            const isMobile = window.innerWidth <= 768;
            const visibleProjects = isMobile ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            projectCards.forEach(card => {
                card.classList.remove('sliding-left', 'sliding-right', 'sliding-out-left', 'sliding-out-right', 'sliding-with-left', 'sliding-with-right');
            });
            if (direction === 'prev') {
                for (let i = currentPosition; i < currentPosition + visibleProjects; i++) {
                    if (i >= 0 && i < totalProjects) {
                        if (i === currentPosition) {
                            projectCards[i].classList.add('sliding-right');
                        } else {
                            projectCards[i].classList.add('sliding-with-right');
                        }
                    }
                }
                const toBeHiddenIndex = currentPosition + visibleProjects;
                if (toBeHiddenIndex < totalProjects) {
                    projectCards[toBeHiddenIndex].classList.add('sliding-out-right');
                }
            } else if (direction === 'next') {
                for (let i = currentPosition; i < currentPosition + visibleProjects; i++) {
                    if (i >= 0 && i < totalProjects) {
                        if (i === currentPosition + visibleProjects - 1) {
                            projectCards[i].classList.add('sliding-left');
                        } else {
                            projectCards[i].classList.add('sliding-with-left');
                        }
                    }
                }

                const toBeHiddenIndex = currentPosition - 1;
                if (toBeHiddenIndex >= 0) {
                    projectCards[toBeHiddenIndex].classList.add('sliding-out-left');
                }
            }

            projectCards.forEach((card, index) => {
                if (index >= currentPosition && index < currentPosition + visibleProjects) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentPosition + visibleProjects >= totalProjects ? '0.5' : '1';
        };

        updateProjectsVisibility();

        prevButton.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 768;
            const visibleProjects = isMobile ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            
            if (currentPosition > 0) {
                currentPosition--;
                updateProjectsVisibility('prev');
            }
        });
        
        nextButton.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 768;
            const visibleProjects = isMobile ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            
            if (currentPosition + visibleProjects < totalProjects) {
                currentPosition++;
                updateProjectsVisibility('next');
            }
        });
        
        window.addEventListener('resize', () => updateProjectsVisibility());

        let touchStartX = 0;
        let touchEndX = 0;
        
        projectsGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        projectsGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        const handleSwipe = () => {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                if (currentPosition + (window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3) < totalProjects) {
                    currentPosition++;
                    updateProjectsVisibility('next');
                }
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                if (currentPosition > 0) {
                    currentPosition--;
                    updateProjectsVisibility('prev');
                }
            }
        };
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');
            
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formSuccess.style.display = 'block';
                    formError.style.display = 'none';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                } else {
                    formSuccess.style.display = 'none';
                    formError.style.display = 'block';
                    
                    setTimeout(() => {
                        formError.style.display = 'none';
                    }, 5000);
                }
            })
            .catch(error => {
                formSuccess.style.display = 'none';
                formError.style.display = 'block';
                
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
            });
        });
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});