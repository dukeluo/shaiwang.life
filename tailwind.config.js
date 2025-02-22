module.exports = {
  content: ['./app/**/*.{tsx,jsx,ts,js}'],
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'LXGW WenKai Screen',
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
          'LXGW WenKai Mono Screen',
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
        primary: '#F1A661',
        'primary-light': '#FFD8A9',
        'primary-dark': '#E38B29',
      },
    },
  },
}
