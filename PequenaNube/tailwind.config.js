/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F1',
        ink: '#3A3532',
        stone: '#8C8378',
        sage: '#05cf5b',
        mustard: '#ff9a37',
        bg: '#FFF8F4',
        bgSoft: '#FFF1EC',
        text: '#4A3A50',
        textSoft: '#8A7690',
        coral: '#FF9E8B',
        coralDark: '#FF7A61',
        coralBg: '#FFE7E1',
        lilac: '#B994E8',
        lilacDark: '#9C6FD8',
        lilacBg: '#F0E5FC',
        plum: '#3A2C40',
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'sans-serif'],
        sans: ['"Quicksand"', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 12px 30px -12px rgba(150,100,130,0.25)',
      },
    },
  },
  plugins: [],
};
