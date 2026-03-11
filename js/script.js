document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Floating Bar Close
    const floatingBar = document.querySelector('.floating-bar');
    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn && floatingBar) {
        closeBtn.addEventListener('click', () => {
            floatingBar.style.display = 'none';
        });
    }
});
