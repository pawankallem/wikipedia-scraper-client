/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// module.exports = {
//   variants: {
//     extend: {
//       opacity: ['disabled'],
//       cursor: ['disabled'],
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//   ],
// };

