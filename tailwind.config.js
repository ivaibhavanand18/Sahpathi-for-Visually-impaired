/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#142A43',
          dark: '#0B1726',
          light: '#1E3E61',
          surface: '#1A3454',
        },
        ivory: {
          DEFAULT: '#F7F4EA',
          light: '#FDFCFA',
          muted: '#EFE9D7',
          border: '#DCD4BE',
        },
        teal: {
          DEFAULT: '#087E8B',
          light: '#0BA5B7',
          dark: '#065A63',
          soft: '#E6F4F6',
        },
        amber: {
          DEFAULT: '#F2B84B',
          light: '#FCD889',
          dark: '#D89920',
          soft: '#FEF6E4',
        },
        hc: {
          bg: '#000000',
          card: '#0a0a0a',
          border: '#FFFF00',
          text: '#FFFFFF',
          yellow: '#FFFF00',
          cyan: '#00FFFF',
          green: '#00FF66',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'sans-serif'],
      },
      boxShadow: {
        'accessible': '0 0 0 3px rgba(8, 126, 139, 0.45)',
        'accessible-focus': '0 0 0 4px #F2B84B',
        'hc-focus': '0 0 0 4px #FFFF00',
      }
    },
  },
  plugins: [],
}

