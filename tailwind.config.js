/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    'bg-primary',
    'bg-primary-dark',
    'text-white',
    'text-gray-700',
    'text-gray-500',
    'text-gray-800'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0078d4',
          dark: '#106ebe',
        }
      }
    },
  },
  plugins: [],
}