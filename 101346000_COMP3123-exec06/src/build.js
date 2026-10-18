/**
 * build.js - Simple build script
 * 
 * WHY DO WE NEED THIS?
 * ====================
 * In real-world projects (like React apps), "building" means:
 * - Combining all your code files into fewer files
 * - Shrinking (minifying) the code so it loads faster
 * - Converting modern JavaScript into older JavaScript that all browsers understand
 * 
 * For our simple static site, this script copies files from /public to /build.
 * This mimics the same pattern that React's "npm run build" command does.
 * 
 * The key concept: SOURCE files (what you edit) live in /public
 *                  BUILT files (what gets deployed) live in /build
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'public');
const destDir = path.join(__dirname, '..', 'build');

// Create the /build folder if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// Copy each file from /public to /build
const files = fs.readdirSync(srcDir);
files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    // Only copy files (not directories)
    if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ Copied: ${file}`);
    }
});

console.log(`\n✅ Build complete! ${files.length} files copied to /build`);

