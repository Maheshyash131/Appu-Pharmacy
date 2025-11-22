/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00695C",    
        secondary: "#E0F2F1",   
        accent: "#FF7043",     
        text: "#263238",      
        highlight: "#80CBC4",   
      },
    },
  },
  plugins: [],
}
