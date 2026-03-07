const fs = require('fs');
const files = ['index.html', 'vision.html', 'careers.html', 'resource.html', 'about.html', 'product.html', 'ai-labor-model.html'];

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    // Use regex to catch the <a href="#">Request Demo</a> block even if it has line breaks
    const regex = /<a href="#" class="mobile-nav-link"[^>]*>[\s\S]*?Request\s*Demo<\/a>/ig;

    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(f, content);
        console.log('Removed from ' + f);
    }
});
