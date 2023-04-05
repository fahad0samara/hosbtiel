/** @type {import('tailwindcss').Config} */
module.exports = {
 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
 theme: {
  extend: {
   screens: {
    mobile: { max: '599px' },
   },
  },
 },
 variants: {},
 plugins: [],
}
