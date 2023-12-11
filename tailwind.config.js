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
      white: {
        100: '#FFFFFF',
        30: '#F9F7FC',
      },
      black: '#111618',
      // red: '',
      // green: '',
    },
    extend: {
      backgroundImage: {
        hero_pattern: "url('/src/assets/map.svg)",
      },
    },
  },
  plugins: [],
};
