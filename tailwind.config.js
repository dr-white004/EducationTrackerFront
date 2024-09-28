/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    animation: {
      slide: 'slide 10s linear infinite', // Name the animation 'slide'
    },
    keyframes: {
      slide: {
        '0%': { transform: 'translateX(-100%)' }, // Start from the left
        '100%': { transform: 'translateX(100%)' }, // Move to the right
      },
    },
  },
  plugins: [],
}

