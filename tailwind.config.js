/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
      },
      colors: {
        merah: '#872341',
        section1: '#C2C2C2',
        login: '#E9E9E9',
        navBlur: '#636363',
      },
    },
  },
  plugins: [],
};
