document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtns = document.querySelectorAll('.mobile-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');

    if (mobileMenuBtns.length > 0 && mobileNavOverlay) {
        mobileMenuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mobileNavOverlay.classList.add('is-active');
                document.body.style.overflow = 'hidden'; 
            });
        });
    }

    if (mobileNavClose && mobileNavOverlay) {
        mobileNavClose.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('is-active');
            document.body.style.overflow = '';
        });
    }

    const toggles = document.querySelectorAll('.mobile-nav-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dropdown = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');
            if (dropdown.classList.contains('is-open')) {
                dropdown.classList.remove('is-open');
                icon.textContent = '+';
            } else {
                dropdown.classList.add('is-open');
                icon.textContent = '-';
            }
        });
    });
});