(function cursorGlow() {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    
    document.addEventListener("mousemove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
})();

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle button appearance for X
            const topLine = menuButton.querySelector('.top-line');
            const middleLine = menuButton.querySelector('.middle-line');
            const bottomLine = menuButton.querySelector('.bottom-line');
            
            topLine.classList.toggle('open');
            middleLine.classList.toggle('open');
            bottomLine.classList.toggle('open');
        });
        
        // Close mobile menu when clicking a link
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                
                // Reset button appearance
                const topLine = menuButton.querySelector('.top-line');
                const middleLine = menuButton.querySelector('.middle-line');
                const bottomLine = menuButton.querySelector('.bottom-line');
                
                topLine.classList.remove('open');
                middleLine.classList.remove('open');
                bottomLine.classList.remove('open');
            });
        });
    }
    
    // Project navigation buttons
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (prevButton && nextButton && projectsGrid) {
        let currentPosition = 0;
        const projectCards = document.querySelectorAll('.project-card');
        const totalProjects = projectCards.length;
        
        // Function to update visibility based on screen size
        const updateProjectsVisibility = () => {
            const isMobile = window.innerWidth <= 768;
            const visibleProjects = isMobile ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            
            projectCards.forEach((card, index) => {
                if (index >= currentPosition && index < currentPosition + visibleProjects) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update button state
            prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentPosition + visibleProjects >= totalProjects ? '0.5' : '1';
        };
        
        // Initial update
        updateProjectsVisibility();
        
        // Add event listeners to buttons
        prevButton.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 768;
            const visibleProjects = isMobile ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            
            if (currentPosition > 0) {
                currentPosition--;
                updateProjectsVisibility();
            }
        });
        
        nextButton.addEventListener('click', () => {
            const isMobile = window.innerWidth <= 768;
            const visibleProjects = isMobile ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            
            if (currentPosition + visibleProjects < totalProjects) {
                currentPosition++;
                updateProjectsVisibility();
            }
        });
        
        // Update on resize
        window.addEventListener('resize', updateProjectsVisibility);
    }
});

// Add this to your script.js file

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');
            
            // Send form data via fetch API
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    formSuccess.style.display = 'block';
                    formError.style.display = 'none';
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                } else {
                    // Show error message
                    formSuccess.style.display = 'none';
                    formError.style.display = 'block';
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        formError.style.display = 'none';
                    }, 5000);
                }
            })
            .catch(error => {
                // Show error message
                formSuccess.style.display = 'none';
                formError.style.display = 'block';
                
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
            });
        });
    }
});