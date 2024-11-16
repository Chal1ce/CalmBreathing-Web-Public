/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'ripple-expand': {
          '0%': { 
            transform: 'scale(1)', 
            opacity: '0.5' 
          },
          '100%': { 
            transform: 'scale(2.5)', 
            opacity: '0' 
          }
        },
        'ripple-contract': {
          '0%': { 
            transform: 'scale(2.5)', 
            opacity: '0.5' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '0' 
          }
        },
        'ripple': {
          '0%': { 
            transform: 'scale(1)',
            opacity: '0.5' 
          },
          '50%': { 
            transform: 'scale(1.5)',
            opacity: '0.3' 
          },
          '100%': { 
            transform: 'scale(2)',
            opacity: '0' 
          }
        }
      },
      animation: {
        'ripple': 'ripple 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'ripple-expand': 'ripple-expand 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'ripple-contract': 'ripple-contract 4s cubic-bezier(0.8, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [],
};
