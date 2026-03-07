const fs = require('fs');
const path = require('path');

const files = ['index.html', 'vision.html', 'careers.html', 'resource.html', 'about.html', 'product.html', 'ai-labor-model.html'];

const btnHtml = `
        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" aria-label="Open mobile menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>`;

const overlayHtml = `
    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay">
        <div class="mobile-nav-header">
            <span class="logo-text" style="color: #257A3F; font-size: 20px; font-weight: 500; letter-spacing: -0.3px;">daybreak</span>
            <button class="mobile-nav-close">&times;</button>
        </div>
        <div class="mobile-nav-body">
            <a href="product.html" class="mobile-nav-link">Product</a>
            <div class="mobile-nav-group">
                <button class="mobile-nav-toggle">About Us <span class="toggle-icon">+</span></button>
                <div class="mobile-nav-dropdown">
                    <a href="vision.html" class="mobile-nav-sublink">Vision & Mission</a>
                    <a href="about.html" class="mobile-nav-sublink">Our Team</a>
                </div>
            </div>
            <div class="mobile-nav-group">
                <button class="mobile-nav-toggle">Resource <span class="toggle-icon">+</span></button>
                <div class="mobile-nav-dropdown">
                    <a href="resource.html" class="mobile-nav-sublink">Blog</a>
                    <a href="ai-labor-model.html" class="mobile-nav-sublink">AI Labor Model</a>
                </div>
            </div>
            <a href="careers.html" class="mobile-nav-link">Careers</a>
            <a href="#" class="mobile-nav-link" style="margin-top: auto; border-top: 1px solid #eaeaea; padding-top: 24px; text-align: center; color: #39B15B;">Request Demo</a>
        </div>
    </div>
    <script src="mobile-nav.js"></script>
</body>`;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('mobile-menu-btn')) {
        content = content.replace(/<nav class="navbar(.*?)">\s+<div class="navbar-left">/, `<nav class="navbar$1">\n${btnHtml}\n        <div class="navbar-left">`);
        content = content.replace(/<\/body>/, overlayHtml);
        fs.writeFileSync(f, content);
        console.log('Updated HTML: ' + f);
    }
});

const jsContent = `document.addEventListener('DOMContentLoaded', () => {
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
});`;
fs.writeFileSync('mobile-nav.js', jsContent);
console.log('Created mobile-nav.js');

const cssContent = `
/* Mobile Navigation Hamburger */
.mobile-menu-btn {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
}

.hamburger-line {
    width: 20px;
    height: 2px;
    background-color: var(--color-dark, #222);
    border-radius: 2px;
    transition: all 0.3s ease;
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #FAFAFA;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
}

.mobile-nav-overlay.is-active {
    transform: translateX(0);
}

.mobile-nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.mobile-nav-close {
    background: transparent;
    border: none;
    font-size: 32px;
    color: #222;
    cursor: pointer;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.mobile-nav-body {
    padding: 24px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
}

.mobile-nav-link {
    font-family: 'Manrope', sans-serif;
    font-size: 24px;
    font-weight: 500;
    color: #2D3136;
    text-decoration: none;
    padding: 16px 0;
    display: block;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.mobile-nav-group {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.mobile-nav-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Manrope', sans-serif;
    font-size: 24px;
    font-weight: 500;
    color: #2D3136;
    background: transparent;
    border: none;
    padding: 16px 0;
    width: 100%;
    text-align: left;
    cursor: pointer;
}

.toggle-icon {
    font-size: 28px;
    font-weight: 400;
    color: #39B15B;
}

.mobile-nav-dropdown {
    display: none;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    margin-bottom: 16px;
    border-left: 2px solid #39B15B;
}

.mobile-nav-dropdown.is-open {
    display: flex;
}

.mobile-nav-sublink {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    color: #666;
    text-decoration: none;
    padding: 12px 0;
}

@media (max-width: 900px) {
    .mobile-menu-btn {
        display: flex;
    }
}
`;

let cssFileStr = fs.readFileSync('index.css', 'utf8');
if (!cssFileStr.includes('.mobile-menu-btn')) {
    fs.appendFileSync('index.css', cssFileStr.endsWith('\\n') ? cssContent : '\\n' + cssContent);
    console.log('Appended to index.css');
}
