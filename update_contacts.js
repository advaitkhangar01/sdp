const fs = require('fs');
const path = require('path');

const directoryPath = 'd:/Office/Softwares-Office-Clients/SDP';
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let updatedContent = content
        .replace(/info@sdpassociates\.com/g, 'Sdpassociates0215@gmail.com')
        .replace(/\+91 \[To be updated\]/g, '+91 8855836688');

    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Updated contacts in ${file}`);
    }
});
