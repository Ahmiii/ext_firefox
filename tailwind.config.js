const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#111618',
      red: '#FF5C5C',
      green: {
        100: '#2CDC82',
      },
      gray: colors.gray,
      white: {
        100: '#FFFFFF',
        30: '#F9F7FC',
      },
    },
    extend: {
      backgroundImage: {
        hero_pattern: "url('/src/assets/map.svg)",
      },
    },
  },
  plugins: [],
};
