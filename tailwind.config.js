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
        lightGray: '#EBEBEB',
        fontPrimary: '#2B3674',
        fontSecondary: '#A3AED0',
        safe: '#4CAF50',
        danger: '#D50000',
        oddComment: '#F3F3F3',
        evenComment: '#F2EBFF',
        searchResult: '#353B48',
        modalPrimary: '#8C52FF',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
