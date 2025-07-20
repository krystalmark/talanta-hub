/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#4174c8', // muted indigo
        secondary: '#7c4dff', // soft violet
        accent:    '#ffb74d', // warm amber
        bgLight:   '#f5f7fb', // pale background
        slateBrand: '#374a5a',
        slateBrandDark: '#2c3c4a',
      },
      keyframes: {
        slideIn: {
          '0%':   { opacity: 0, transform: 'translateY(12px) scale(0.96)' },
          '100%': { opacity: 1, transform: 'translateY(0px) scale(1)' },
        },
      },
      animation: {
        'slide-in': 'slideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
