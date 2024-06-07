import React, { FC, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputKeyPressEventData } from 'react-native';
import { Colors, TextFieldRef } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

import { UIView } from 'components/UIKit';
import { UITextField } from 'components/UIKit/UITextField';

import { ConfirmCodeFormProps } from 'modules/auth/containers/ConfirmCodeForm/types';

const TEMPLATE = '0123456789';

export const ConfirmCodeForm: FC<ConfirmCodeFormProps> = ({ code, onConfirm }) => {
  const { navigate } = useNavigation();
  const inputRefs = useRef(_.range(6).map(() => React.createRef<TextFieldRef>())).current;
  const [values, setValues] = useState(Array(6).fill(''));

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);
  useEffect(() => {
    const isInputFilled = values.filter((el) => el).length === 6;
    if (isInputFilled) {
      onConfirm?.();
      // TODO: phone auth implementation
      // const data = values.join('')
      // if (code === data) {
      //   alert('navigate')
      //
      // } else {
      //   alert('Wrong code')
      // }
    }
  }, [values]);

  const onChangeText = (text: string, index: number) => {
    if (TEMPLATE.includes(text)) {
      const newValues = [...values];
      newValues[index] = text;
      setValues(newValues);
      if (text && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  const onKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !values[index]) {
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
        return;
      }
    }
    if (values[index] && inputRefs[index + 1] && TEMPLATE.includes(event.nativeEvent.key)) {
      const newValues = [...values];
      newValues[index + 1] = event.nativeEvent.key;
      setValues(newValues);
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <UIView center row>
      {_.range(6).map((_, index) => (
        <UITextField
          key={index}
          ref={inputRefs[index]}
          value={values[index]}
          onChangeText={(text) => onChangeText(text, index)}
          onKeyPress={(event) => onKeyPress(event, index)}
          inputStyle={[styles.input, { borderRightWidth: index < 5 ? 0.5 : 0 }]}
          keyboardType='numeric'
          maxLength={1}
        />
      ))}
    </UIView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: Colors.grey40,
    paddingRight: 14,
  },
});
