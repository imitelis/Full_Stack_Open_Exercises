import { Platform } from "react-native";

const theme = {
    colors: {
      primary: '#0366d6',
      secondary: '#FFFFFF',
      textPrimary: '#24292e',
      textSecondary: '#586069',
      backgroundPrimary: '#e1e4e8',
      error: '#d73a4a',
    },
    fontSizes: {
      body: 14,
      large: 16,
      subheading: 18,
    },
    fonts: {
      main: Platform.select({
        default: 'System',
        android: 'Roboto',
        ios: 'Arial',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    propSizes: {
      none: 0,
      unit: 1,
      tiny: 2.5,
      small: 5,
      medium: 10,
      large: 15,
      big: 20,
    },
    imageSizes: {
      small: 40,
    },
  };
  
  export default theme;