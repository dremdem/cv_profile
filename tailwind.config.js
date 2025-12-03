/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          green: '#00FF41',
          'green-dark': '#008F11',
          dark: '#0D0208',
          cyan: '#00D9FF',
        },
        pixel: {
          red: '#FF0040',
          gray: '#1A1A1A',
        },
        ghost: '#F8F8FF',
      },
      fontFamily: {
        terminal: ['VT323', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
        code: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'matrix-rain': 'matrixRain 20s linear infinite',
        'glitch': 'glitch 0.3s infinite',
        'blink': 'blink 1s step-end infinite',
        'typewriter': 'typewriter 2s steps(20) forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'power-up': 'powerUp 0.3s ease-in-out',
      },
      keyframes: {
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 65, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.8), 0 0 30px rgba(0, 255, 65, 0.6)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        powerUp: {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.05)', filter: 'brightness(1.2)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
      },
    },
  },
  plugins: [],
}
