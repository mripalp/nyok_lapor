/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins'],
      },
      bottom: {
        open: '1%', // Atau properti bottom yang diinginkan
      },
      colors: {
        merah: '#872341',
        section1: '#C2C2C2',
        login: '#E9E9E9',
        navBlur: '#636363',
        butungu: '#164863',
        section2: '#1F2937',
      },
    },
  },
  plugins: [],
};
