/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins, sans-serif',
        fastup: 'Fastup SC, sans-serif',
      },
      colors: {
        newBlack: '#08111A',
        grey: '#141F2B',
        'light-grey': '#223D57',
        yellow: '#FFD130',
        lime: '#65F78A',
        green: '#85EB8B',
        'light-green': '#DAFFDA',
      },
      height: {
        btn: '40px',
      },
      width: {
        btn: '140px',
      },
    },
  },
  plugins: [],
}
