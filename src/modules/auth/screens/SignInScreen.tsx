import React from 'react';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Colors } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UIStack } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { ScaleOnMount } from 'components/ScaleOnMount';
import { SignInForm } from 'modules/auth/containers/SignInForm/SignInForm';

import { uiScreenPaddings } from 'components/UIKit/styles';

export const SignInScreen = ({}) => {
  const { countryName = 'France' } = useRoute()?.params || {};

  return (
    <KeyboardAwareScrollView
      bounces={false}
      enableOnAndroid
      extraScrollHeight={0}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}
    >
      <ScaleOnMount style={uiScreenPaddings}>
        <UIStack flex centerV gap={15}>
          <UIStack flex centerH bottom gap={15}>
            <LottieView source={require('assets/lottie/sign-in-phone.json')} autoPlay loop style={styles.lottie} />
            <UIText h1>Your Phone</UIText>
            <UIStack center gap={2}>
              <UIText bodyM2>Please confirm your country code</UIText>
              <UIText bodyM2>and enter your phone number</UIText>
            </UIStack>
          </UIStack>

          <SignInForm countryName={countryName} />
        </UIStack>
      </ScaleOnMount>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 240,
    height: 140,
  },
  input: {
    borderRightWidth: 0.2,
    borderColor: Colors.grey40,
    paddingRight: 12,
  },
});
