/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F1',
        coral: '#F4A6A0',
        sage: '#B7D9C4',
        mustard: '#FFD36E',
        ink: '#3A3532',
        stone: '#8C8378',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'sans-serif'],
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
