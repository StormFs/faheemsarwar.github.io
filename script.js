(function cursorGlow() {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    
    document.addEventListener("mousemove", (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
})();

// Updated mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            // Toggle the active class instead of display property
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