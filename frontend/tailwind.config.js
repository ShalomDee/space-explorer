/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0B3D91',  // NASA Blue
          light: '#1E88E5',
          accent: '#FC3D21', // NASA Red
          black: '#111827',
          gray: '#374151'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

