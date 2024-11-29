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
        'primary-light': 'var(--primary-light)',
        'secondary-light': 'var(--secondary-light)',
        'background-light': 'var(--background-light)',
        'text-light': 'var(--text-light)',
        'surface-light': 'var(--surface-light)',
        'surface-light-hover': 'var(--surface-light-hover)',
        'accent-light': 'var(--accent-light)',
        'muted-light': 'var(--muted-light)',
        'border-light': 'var(--border-light)',
        
        'primary-dark': 'var(--primary-dark)',
        'secondary-dark': 'var(--secondary-dark)',
        'background-dark': 'var(--background-dark)',
        'text-dark': 'var(--text-dark)',
        'surface-dark': 'var(--surface-dark)',
        'surface-dark-hover': 'var(--surface-dark-hover)',
        'accent-dark': 'var(--accent-dark)',
        'muted-dark': 'var(--muted-dark)',
        'border-dark': 'var(--border-dark)',
      },
      boxShadow: {
        'light-sm': 'var(--shadow-sm)',
        'light': 'var(--shadow)',
        'light-md': 'var(--shadow-md)',
        'light-lg': 'var(--shadow-lg)',
      },
      animation: {
        'float': 'floating 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'gradient': 'gradient 5s ease infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { left: '200%' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
