module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // enable dark mode
  theme: {
    extend: {
      fontFamily: {
        'tilt': ['Tilt Prism', 'sans-serif'],
        'special_elite': ['Special Elite', 'sans-serif'],
        'varela': ['Varela Round', 'sans-serif'],
      }
      },
    },
  variants: {
    extend: {},
  },
  plugins: [require("tw-elements/plugin.cjs")],
};