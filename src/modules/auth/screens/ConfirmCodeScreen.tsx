import React, { FC, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Colors } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UIButton, UIStack } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { ScaleOnMount } from 'components/ScaleOnMount';
import { ConfirmCodeForm } from 'modules/auth/containers/ConfirmCodeForm/ConfirmCodeForm';

import { uiScreenPaddings } from 'components/UIKit/styles';
import { supabase } from 'lib/supabase';
import { useGetNewUser } from 'hooks/auth';

export const ConfirmCodeScreen = ({}) => {
  const { phoneNumber }: { phoneNumber: string } = useRoute()?.params || {};
  const [code, setCode] = useState('');
  const { email, password } = useGetNewUser();

  const signUpWithEmail = async () => {
    let { data, error } = await supabase.auth.signUp({ email, password });

    console.log('signUpWithEmail - ', data, error);
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      enableOnAndroid
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}
    >
      <ScaleOnMount style={uiScreenPaddings}>
        <UIStack flex center gap={15}>
          <LottieView source={require('assets/lottie/confirm-code.json')} autoPlay loop style={styles.lottie} />
          <UIText bodyM2 style={{ marginTop: -60 }}>
            Please confirm your <UIText bodyB2>code</UIText>
          </UIText>
          <ConfirmCodeForm code={code} onConfirm={signUpWithEmail} />
        </UIStack>
      </ScaleOnMount>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 200,
  },
});
