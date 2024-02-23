/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

