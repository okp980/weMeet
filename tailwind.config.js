/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6657a9',
      },
      fontFamily: {
        noto: ['NotoSans'],
      },
    },
  },
  plugins: [],
};
