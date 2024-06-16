/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'gradient-start': '#f8fafc',
        'gradient-end': '#1c1c1c',
      },
    },
  },
  plugins: [],
}
