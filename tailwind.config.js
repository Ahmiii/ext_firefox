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
      countr_card: '#2F373B',
      toogle_white: '#E3D7E7',
      slate: colors.slate,
      iconColor: '#B7B7B7',
      gray: colors.gray,
      yellow: colors.yellow,
      green: {
        100: '#2CDC82',
      },
      white: {
        100: '#FFFFFF',
        30: '#F9F7FC',
      },
    },
    extend: {
      spacing: {
        26: '6.5rem',
      },
    },
  },
  plugins: [],
};
