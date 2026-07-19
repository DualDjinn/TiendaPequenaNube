/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F1',
        coral: '#9e3fff',
        sage: '#05cf5b',
        mustard: '#ff9a37',
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
