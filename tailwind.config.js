/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        aPink: '#22c9be',
        lPink: '#ffb6c1',
        primary: '#007BFF',
        accent: '#FF6B6B',
        button: '#FFA500',
      },
    },
  },
  plugins: [],
};
