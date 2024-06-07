import { StyleSheet } from 'react-native';
import { Spacings } from 'react-native-ui-lib';

const styles = StyleSheet.create({
  screenPaddings: {
    paddingHorizontal: Spacings.s5,
    paddingVertical: Spacings.s5,
  },
  paddingHorizontal: {
    paddingHorizontal: Spacings.s5,
  },
});

export const uiScreenPaddings = styles.screenPaddings;
export const uiPaddingHorizontal = styles.paddingHorizontal;
