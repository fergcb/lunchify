/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      'purple-500': '#6167B2',
      'purple-300': '#9296C9',
      'purple-100': '#D6D8EA',
      'black-700': '#2c2c2c',
      'black-900': '#262626',
      'green-500': '#1DB954',
      'green-300': '#60E68F',
      'green-100': '#A7F1C1',
      white: '#fff',
    },
    fontSize: {
      sm: '0.8rem',
      lg: '1.5rem',
      xl: '3rem',
    },
    extend: {},
  },
  plugins: [],
}
