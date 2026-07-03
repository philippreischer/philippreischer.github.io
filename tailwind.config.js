/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark:   { DEFAULT: '#0f172a', surface: '#1e293b' },
        accent: { DEFAULT: '#2563eb', light: '#60a5fa' },
        muted:  '#94a3b8',
        light:  { DEFAULT: '#f8fafc', surface: '#e2e8f0' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: [],
}

