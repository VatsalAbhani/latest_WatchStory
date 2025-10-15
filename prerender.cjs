// prerender.cjs
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// This must match your client build output directory
const outputDir = path.resolve(__dirname, 'dist/spa'); 
    
// The routes you want to pre-render
const routes = [
    { path: '/', title: 'Buy & Sell Luxury Watches in Dubai | WatchStory' }, 
    { path: '/buy', title: 'Buy Authentic Luxury Watches in Dubai | Rolex, AP, Patek' }, 
    { path: '/sell', title: 'Sell Your Luxury Watch in Dubai | Fast Offers & Insured Shipping' }
]; 

async function preRender() {
    console.log('Starting pre-render process...');
    
    if (!fs.existsSync(outputDir)) {
        console.error(`Output directory not found: ${outputDir}. Run 'npm run build:client' first.`);
        return;
    }

    let browser;
    try {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        const port = 8080; // Your server port

        for (const route of routes) {
            // Determine the output path: index.html for '/', otherwise routeName.html
            const fileName = route.path === '/' ? 'index.html' : `${route.path.substring(1)}.html`;
            const filePath = path.join(outputDir, fileName);
            const url = `http://localhost:${port}${route.path}`; 

            console.log(`Navigating to: ${url}`);
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
            
            // Wait for the main React content to load
            await page.waitForSelector('#root > *', { timeout: 5000 }); 

            let html = await page.content();
            
            // Inject the dynamic SEO title (replacing the old title)
            // It searches for the existing <title> tag and replaces its content
            html = html.replace(
                /<title>.*?<\/title>/i, 
                `<title>${route.title}</title>`
            );

            // Write the generated HTML to the appropriate file path
            fs.writeFileSync(filePath, html);
            console.log(`Pre-rendered and Saved: ${route.path} -> ${filePath}`);
        }

    } catch (error) {
        console.error('Pre-render failed. Ensure your Node.js server starts correctly on port 8080.');
        console.error(error);
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
        console.log('Pre-rendering complete.');
    }
}

// We rely on the pre-render:wait script to call this correctly.
module.exports = preRender;