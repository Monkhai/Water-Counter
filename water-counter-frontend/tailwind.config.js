/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/home.html', 'src/registerAndLogin.html'],
  theme: {
    fontFamily: {
      all: ['Rubik', 'sans-serif'],
    },
    extend: {
      height: {
        'small-screen': '100svh',
      },
    },
  },
  plugins: [],
};
