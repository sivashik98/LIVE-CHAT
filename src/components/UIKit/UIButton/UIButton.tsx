import { FC } from 'react';
import { Button, Colors } from 'react-native-ui-lib';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { UIText } from '../UIText';

import { UIButtonProps } from './types';

export const UIButton: FC<UIButtonProps> = ({ loading, title, disabled, titleProps, ...props }) => {
  return (
    <Button disabled={disabled} style={styles.button} backgroundColor={Colors.primary} disabledBackgroundColor={Colors.grey30} center {...props}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <UIText color={disabled ? Colors.grey80 : Colors.white} bodyM2 {...titleProps}>
          {title}
        </UIText>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    minHeight: 45,
  },
});
