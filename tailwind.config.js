const { spacing } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{tsx,jsx,ts,js}'],
  plugins: [require('@tailwindcss/typography')],
  variants: {
    typography: ['dark'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'LXGW WenKai Lite',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
        mono: [
          'LXGW WenKai Mono Lite',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        primary: '#FB2576',
        'primary-light': '#fd92ba',
        'primary-dark': '#8d0237',
      },
    },
  },
}
