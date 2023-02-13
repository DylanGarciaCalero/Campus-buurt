module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './component/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#f2a027',
      secondary: '#eff6fa',
      white: '#ffffff',
      gray: '#75716D',
      black: '#000000',
      red: '#FF0000',
      blue: '#009ad4',
    },
    extend: {
      height: {
        huge: '70rem',
        big: '40rem',
        medium: '20rem',
        small: '10rem',
        box: '94%',
      },
      minHeight: {
        big: '40rem'
      },
      width: {
        box: '97%',
      },
    },
  },
  plugins: [],
};
