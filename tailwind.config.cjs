/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
