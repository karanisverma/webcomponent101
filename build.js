console.log('starting')
const ejs = require('ejs');
const sass = require('node-sass');
const fs = require('fs');

const html = fs.readFileSync('./src/month/index.ejs').toString().trim();
const style = fs.readFileSync('./src/month/index.scss').toString().trim();
const script = fs.readFileSync('./src/month/index.js').toString().trim();
const htmlString = ejs.render(html, {}, {});
const styleString = sass.renderSync({
  data: style,
  outputStyle: 'compressed',
}).css.toString();
const scriptString = ejs.render(script, { style: styleString, html: htmlString }, {});

fs.writeFileSync('./dist/bundle-month-calendar.js', scriptString);


const htmlCal = fs.readFileSync('./src/cal/index.ejs').toString().trim();
const styleCal = fs.readFileSync('./src/cal/index.scss').toString().trim();
const scriptCal = fs.readFileSync('./src/cal/index.js').toString().trim();
const htmlStringCal = ejs.render(htmlCal, {}, {});
const styleStringCal = sass.renderSync({
  data: styleCal,
  outputStyle: 'compressed',
}).css.toString();
const scriptStringCal = ejs.render(scriptCal, { style: styleStringCal, html: htmlStringCal }, {});

fs.writeFileSync('./dist/bundle.js', scriptStringCal);

console.log('merging files is done');
