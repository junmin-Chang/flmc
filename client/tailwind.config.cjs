/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('./assets/image/bg-auth.svg')",
      },
    },
  },
  plugins: [],
};
