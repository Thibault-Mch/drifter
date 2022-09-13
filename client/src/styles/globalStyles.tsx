import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,

  },

  baseFont: {
    fontFamily: 'Lato_400Regular',
    fontSize: 20,
    color: colors.washedWhite,
  },

  buttonPrimary: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    color: colors.tifBlue,
    borderColor: colors.tifBlue,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: colors.lighterBlack,
  },

  textBtnPrimary: {
    color: colors.tifBlue,
    fontSize: 24
  }
});
