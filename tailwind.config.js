/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0D1317',
        white: '#FFFFFF',
        gray: '#6E8894',
        orange: '#BF4E30'
      },
      backgroundImage: {
        'world-map': "url('./assets/worldmap.svg')"
      }
    },
  },
  plugins: [],
}