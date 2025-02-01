/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html',  
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'candy-red': '#c1121c', 
          'saphire-blue': '#082567',
        },  
      },
    },
    plugins: [],
  }