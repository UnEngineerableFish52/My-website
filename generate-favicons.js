const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
    const svgBuffer = fs.readFileSync('favicon.svg');
    
    try {
        // Generate 180x180 for Apple Touch Icon
        await sharp(svgBuffer)
            .resize(180, 180)
            .png()
            .toFile('apple-touch-icon.png');
        console.log('✓ Generated apple-touch-icon.png (180x180)');
        
        // Generate 32x32 favicon
        await sharp(svgBuffer)
            .resize(32, 32)
            .png()
            .toFile('favicon-32x32.png');
        console.log('✓ Generated favicon-32x32.png (32x32)');
        
        // Generate 16x16 favicon
        await sharp(svgBuffer)
            .resize(16, 16)
            .png()
            .toFile('favicon-16x16.png');
        console.log('✓ Generated favicon-16x16.png (16x16)');
        
        console.log('\n🎉 All favicon files generated successfully!');
    } catch (error) {
        console.error('Error generating favicons:', error);
        process.exit(1);
    }
}

generateFavicons();
