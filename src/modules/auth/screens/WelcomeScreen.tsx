import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native-ui-lib';

import { UIStack, UIView } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { UIButton } from 'components/UIKit';
import { ScaleOnMount } from 'components/ScaleOnMount';

import { uiScreenPaddings } from 'components/UIKit/styles';

export const WelcomeScreen = () => {
  const { navigate } = useNavigation();

  return (
    <UIView flex centerV backgroundColor={Colors.white}>
      <ScaleOnMount style={uiScreenPaddings}>
        <UIView flex center>
          <LottieView source={require('assets/lottie/tg-welcome.json')} autoPlay loop style={styles.lottie} />
          <UIText h1>LIVE-CHAT</UIText>
          <UIStack center gap={2} marginT-10>
            <UIText bodyM2>
              The world's <UIText bodyB2>fastest</UIText> messaging app.
            </UIText>
            <UIText bodyM2>
              It's <UIText bodyB2>free</UIText> and <UIText bodyB2>secure</UIText>
            </UIText>
          </UIStack>
        </UIView>
        <UIButton title={'Start Messaging'} onPress={() => navigate('SignIn')} />
      </ScaleOnMount>
    </UIView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});
