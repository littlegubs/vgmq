/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins, sans-serif',
      },
      colors: {
        newBlack: '#09111A',
        grey: '#141F2B',
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
