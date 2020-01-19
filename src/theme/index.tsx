/**
 * Theme object required for styled towards styled-components.
 */
const colors = {
  black: 'rgb(21, 21, 21)',
  white: '#fff',
  label: 'rgb(88, 88, 88)',
  border: '#ccc',
  options: '#f3f3f3',
  blue: '#0464dd'
}

export default {
  breakpoints: [600, 900, 1200, 1800],
  fontSizes: {
    xxs: 10,
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 30,
    xxxl: 36,
    xxxxl: 72
  },
  buttons: {
    primary: {
      backgroundColor: colors.blue,
      color: colors.white,
      borderStyle: 'none',
      borderRadius: 3,
      borderWidth: '2px',
      "&:disabled": {
        backgroundColor: colors.options,
        color: colors.black,
        borderStyle: 'solid',
      }
    }
  },
  fontWeights: {
    regular: 400,
    bold: 600,
    extraBold: 900
  },
  radii: [0, 1, 2, 4, 8, 16],
  colors: colors
}