/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1e4620',
          dark: '#143115',
          light: '#2d6830',
          muted: '#e8f0e9',
        },
        charcoal: {
          DEFAULT: '#222222',
          light: '#333333',
          dark: '#111111',
        }
      }
    },
  },
  plugins: [],
}