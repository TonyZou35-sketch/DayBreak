const fs = require('fs');
const files = ['index.html', 'vision.html', 'careers.html', 'resource.html', 'about.html', 'product.html', 'ai-labor-model.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    const demoStr = '<a href="#" class="mobile-nav-link" style="margin-top: auto; border-top: 1px solid #eaeaea; padding-top: 24px; text-align: center; color: #39B15B;">Request Demo</a>';
    if (content.includes(demoStr)) {
        content = content.replace(demoStr, '');
        fs.writeFileSync(f, content);
        console.log('Removed from ' + f);
    }
});
