// Change this ES Module import to CommonJS require
// import tailwindcss from 'prettier-plugin-tailwindcss';
const tailwindcss = require('prettier-plugin-tailwindcss');

module.exports = {
  plugins: [tailwindcss, require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
