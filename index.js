

document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add pulse animation on click
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        this.classList.add('pulse-animation');
        setTimeout(() => {
            this.classList.remove('pulse-animation');
        }, 700);
    });
});

// Get the theme toggle button and its icon
const themeToggleBtn = document.getElementById('themeToggle');
const themeToggleIcon = themeToggleBtn.querySelector('i');

// Function to set the theme (light or dark)
const setTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
};

// Initialize theme based on local storage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark'); // Default to dark if system preference is dark
} else {
    setTheme('light'); // Default to light
}

// Theme toggle button click listener
themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// index.js
// This file handles interactive elements and dynamic content for the portfolio.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');

    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]'); // Select sections with an ID within main
    const scrollTopBtn = document.getElementById('scrollTopBtn'); // Get the scroll to top button





    // Initialize theme based on local storage or system preference


    // --- Responsive Navigation Logic ---
    const menuToggleButton = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav'); // This is the <nav> element holding the links

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        // Only hide if the menu is currently visible AND the screen is small (less than sm breakpoint)
        // Also ensure mainNav exists before trying to access its classList
        if (mainNav && !mainNav.classList.contains('hidden') && window.innerWidth < 640) {
            mainNav.classList.add('hidden');
        }
    };

    // Toggle mobile menu visibility on button click
    if (menuToggleButton && mainNav) { // Ensure both elements exist before adding listener
        menuToggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('hidden'); // Toggles Tailwind's 'hidden' class
        });
    }


    // Close mobile menu when a nav link is clicked (for smoother UX)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Existing scroll and active class logic remains here
            const targetId = e.currentTarget.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) { // Ensure target element exists before scrolling
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            addActiveClass(targetId, true);

            closeMobileMenu(); // Close menu after clicking a link
        });
    });

    // Ensure nav visibility is correct on window resize
    window.addEventListener('resize', () => {
        if (mainNav) { // Ensure mainNav exists
            if (window.innerWidth >= 640) { // If screen size is 'sm' (640px) or larger
                mainNav.classList.remove('hidden'); // Ensure nav is visible on desktop
            } else {
                // If screen size is smaller than 'sm', make sure menu is hidden unless toggled
                // This effectively "closes" the menu if you resize from desktop to mobile
                mainNav.classList.add('hidden');
            }
        }
    });

    // Initial setup for nav visibility based on window size on page load
    if (mainNav) { // Ensure mainNav exists
        if (window.innerWidth < 640) {
            mainNav.classList.add('hidden'); // Ensure hidden on small screens initially
        } else {
            mainNav.classList.remove('hidden'); // Ensure visible on large screens initially
        }
    }
    // --- End Responsive Navigation Logic ---


    // --- Scroll-to-Top Button & Active Navigation State Logic ---
    // Function to remove active class from all nav links
    const removeActiveClass = () => {
        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            link.classList.remove('pulse-animation'); // Also remove pulse animation
        });
    };

    // Function to add active class to the current nav link and trigger pulse animation
    const addActiveClass = (id, triggerPulse = false) => {
        const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (correspondingLink) {
            removeActiveClass(); // Remove active class from all before adding to current
            correspondingLink.classList.add('active-nav-link');

            if (triggerPulse) {
                // Add pulse animation and remove it after a short delay
                correspondingLink.classList.add('pulse-animation');
                setTimeout(() => {
                    correspondingLink.classList.remove('pulse-animation');
                }, 700); // Match animation duration
            }
        }
    };

    // Scroll event listener for active navigation state and scroll-to-top button visibility
    window.addEventListener('scroll', () => {
        let currentSectionId = 'home'; // Default to home if at the very top

        sections.forEach(section => {
            // Get the position of the section relative to the viewport
            const rect = section.getBoundingClientRect();
            // Check if the section is mostly in view
            // Adjust 0.3 (30%) to change when the section becomes active
            if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= window.innerHeight * 0.3) {
                currentSectionId = section.id;
            }
        });

        // Handle the case when scrolling to the very top
        if (window.scrollY === 0) {
            currentSectionId = 'home';
        }

        // Only update active class on scroll, do not trigger pulse animation
        addActiveClass(currentSectionId, false);

        // Show/hide scroll to top button
        if (scrollTopBtn) { // Ensure button exists before checking scroll
            if (window.scrollY > 300) { // Show button after scrolling 300px down
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });

    // Initial active state set on page load
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        addActiveClass(initialHash, false); // No pulse on initial load
    } else {
        addActiveClass('home', false); // Default to home, no pulse
    }

    // Click event listener for scroll to top button
    if (scrollTopBtn) { // Ensure button exists before adding listener
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll to the top
            });
            // After scrolling to top, ensure 'home' link is active
            addActiveClass('home', true); // Trigger pulse on home link after scrolling up
        });
    }
    // --- End Scroll-to-Top Button & Active Navigation State Logic ---
});
