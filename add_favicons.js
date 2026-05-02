const fs = require('fs');
const path = require('path');

const directoryPath = 'd:/Office/Softwares-Office-Clients/SDP';
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.html'));

const faviconTags = `
    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="assets/img/favicon-16x16.png">
</head>`;

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if favicons are already added to prevent duplicates
    if (!content.includes('apple-touch-icon.png')) {
        let updatedContent = content.replace(/<\/head>/i, faviconTags);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`Added favicons to ${file}`);
    } else {
        console.log(`Favicons already present in ${file}`);
    }
});
