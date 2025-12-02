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
      },
    },
  },
  plugins: [],
}
