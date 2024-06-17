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
      colors: {
        custom: {
          'green-yellow': '#B4B657',
          'blue-gray': '#80A1C1',
          'dark-green': '#306B34',
          'coral': '#F06543',
          'mint': '#C0FDFB',
          'off-red': "#9A031E",
        },
      },
    },
  },
  plugins: [],
}
