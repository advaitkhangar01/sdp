const fs = require('fs');
const path = require('path');

const directoryPath = 'd:/Office/Softwares-Office-Clients/SDP';

const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

const standardNav = `    <nav class="navbar">
        <div class="container nav-content">
            <div class="logo">
                <a href="index.html"><img src="assets/img/logo.png" alt="SDP Associates Logo"></a>
            </div>
            <ul class="nav-links">
                <li><a href="index.html#home">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="projects.html">Projects</a></li>
                <li><a href="index.html#contact">Contact</a></li>
            </ul>
            <a href="index.html#contact" class="btn btn-primary cta-btn">Get a Quote</a>
            <div class="mobile-menu-btn">
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>`;

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract the original nav block to find if there is an active class
    const navRegex = /<nav\b[^>]*>([\s\S]*?)<\/nav>/i;
    const match = content.match(navRegex);

    if (match) {
        let activeHref = null;
        const activeMatch = match[0].match(/<a[^>]+href=["']([^"']+)["'][^>]*class=["'][^"']*active[^"']*["'][^>]*>/i);
        if (activeMatch) {
            activeHref = activeMatch[1];
        }

        // Prepare the new nav customized for this file
        let newNav = standardNav;
        if (activeHref) {
            // we need to inject class="active" into the standardNav for the matching href
            const hrefRegex = new RegExp(`href=["']${activeHref.replace(/\//g, '\\/').replace(/\./g, '\\.')}["']`, 'i');
            newNav = newNav.replace(hrefRegex, `href="${activeHref}" class="active"`);
        }

        content = content.replace(navRegex, newNav);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file} (Active: ${activeHref || 'None'})`);
    } else {
        console.log(`No nav found in ${file}`);
    }
});
