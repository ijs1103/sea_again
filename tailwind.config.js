/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5E17EB',
        toggleOn: '#5D5FEF',
        toggleOff: '#FCDDEC',
        gray: '#EBEBEB',
        fontPrimary: '#2B3674',
        fontSecondary: '#A3AED0',
        safe: '#4CAF50',
        danger: '#D50000',
        oddComment: '#F3F3F3',
        evenComment: '#F2EBFF',
        searchResult: '#353B48',
      },
    },
  },
  plugins: [],
}
