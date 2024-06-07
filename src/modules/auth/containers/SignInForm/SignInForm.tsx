import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, TextFieldRef } from 'react-native-ui-lib';
import head from 'lodash/head';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { UIButton, UIStack, UIView } from 'components/UIKit';
import { UITextField } from 'components/UIKit/UITextField';
import { CountryPicker } from 'modules/auth/components/CountryPicker';

import { COUNTRIES } from 'src/constants';
import { formatPhoneNumber, generatePlaceholder } from 'modules/auth/utils';
import { CountryCodeType } from 'modules/auth/types';
import { SignInFormProps } from 'modules/auth/containers/SignInForm/types';

export const SignInForm: FC<SignInFormProps> = ({ countryName: passedCountryName }) => {
  const { navigate } = useNavigation();
  const { countryPhoneCode = '', countryName }: CountryCodeType = useMemo(
    () => head(COUNTRIES.filter(({ countryName }) => countryName === passedCountryName)) || {},
    [passedCountryName],
  );
  const placeholder = useMemo(() => generatePlaceholder(countryPhoneCode), [countryPhoneCode]);
  const [phoneCodeValue, setPhoneCodeValue] = useState<string>(countryPhoneCode);
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const phoneCodeInputRef = useRef<TextFieldRef>();
  const phoneInputRef = useRef<TextFieldRef>();
  const animatedStyles = useAnimatedStyle(() => ({
    flex: !isFocused ? withTiming(1) : withTiming(0),
  }));
  const code = '123456';

  useEffect(() => {
    setPhoneCodeValue(countryPhoneCode);
    setPhoneValue('');
  }, [countryName]);

  const onChangePhoneCodeValue = (text) => {
    if (text.length < 1) return;
    if (text.length > countryPhoneCode.length) {
      phoneInputRef.current?.focus();
      return;
    }
    setPhoneCodeValue(text);
  };
  const onChangePhoneValue = (text) => {
    if (text.length < 1) phoneCodeInputRef.current?.focus();
    setPhoneValue(formatPhoneNumber(text, generatePlaceholder(countryPhoneCode)));
  };

  return (
    <UIStack flex gap={8}>
      <UIView reanimated style={animatedStyles}>
        <CountryPicker phoneCode={phoneCodeValue} />
        <UIView row>
          <UITextField
            ref={phoneCodeInputRef}
            value={phoneCodeValue}
            onChangeText={onChangePhoneCodeValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            inputStyle={styles.phoneCodeInput}
          />
          <UIView flex>
            <UITextField
              ref={phoneInputRef}
              value={phoneValue}
              onChangeText={onChangePhoneValue}
              placeholder={placeholder}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </UIView>
        </UIView>
      </UIView>

      <UIButton
        disabled={phoneCodeValue.length < countryPhoneCode.length || phoneValue.length < placeholder.length}
        title={'Continue'}
        onPress={() =>
          navigate('ConfirmCode', {
            phoneNumber: `${phoneCodeValue}${phoneValue.split(' ').join('')}`,
          })
        }
      />
    </UIStack>
  );
};

const styles = StyleSheet.create({
  phoneCodeInput: {
    borderRightWidth: 0.2,
    borderColor: Colors.grey40,
    paddingRight: 12,
  },
});
