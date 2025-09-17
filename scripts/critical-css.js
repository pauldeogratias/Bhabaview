// 7. Critical CSS Inlining Utility
// scripts/critical-css.js
const fs = require('fs')
const path = require('path')
const critical = require('critical')

async function generateCriticalCSS() {
  try {
    const { css } = await critical.generate({
      base: 'out/',
      src: 'index.html',
      target: {
        css: 'critical.css',
        html: 'index.html'
      },
      width: 1300,
      height: 900,
      minify: true,
      extract: true,
      inlineImages: false
    })

    fs.writeFileSync(path.join(__dirname, '../public/critical.css'), css)
    console.log('Critical CSS generated successfully!')
  } catch (error) {
    console.error('Error generating critical CSS:', error)
  }
}

if (require.main === module) {
  generateCriticalCSS()
}

module.exports = { generateCriticalCSS }