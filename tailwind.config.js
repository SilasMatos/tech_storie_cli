/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  safelist: ['datatable-header', 'datatable-row', 'datatable-cell'],
  theme: {
    extend: {
      colors: {
        'dark-box': '#202024',
        'border-dark': '#363636',
        'dark-bg': '#19191b',
        'dark-bg-soft': '#161618',
        'dark-bg-soft-table': '#2e3138',
        'dark-bg-button': '#323238', // Fundo secundário
        'dark-hover': '#23262E', // Efeito hover em elementos
        'dark-accent': '#3A3D46', // Acento para contrastes leves
        'dark-text': '#A5AAB3', // Texto principal claro
        'dark-text2': '#DEE0E4', // Texto principal mais claro
        'dark-muted': '#7A808A', // Texto menos destacado

        'purple-main': '#6f42c1',
        'purple-secondary': '#9f7ae2'
      },
      animation: {
        spin: 'spin 5s linear infinite'
      },
      maxWidth: {
        '1140px': '1140px'
      }
    }
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true
    })
  ]
}
