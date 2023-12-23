/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  important: true,
  theme: {
    extend: {
      extend: {
        colors: {
          customBlue: '#3490dc',
          customRed: '#e3342f',
        },
      },
    },
  },
  plugins: [],
}
