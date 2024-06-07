import { FC } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { UIView } from 'components/UIKit';

import { UISpinnerProps } from './types';

export const UISpinner: FC<UISpinnerProps> = ({ shouldShow, color = '#fff', size = 'small', ...props }) => {
  if (!shouldShow) return null;
  return (
    <UIView absF center style={styles.container} {...props}>
      <ActivityIndicator color={color} size={size} style={styles.spinner} />
    </UIView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },
  spinner: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 100,
  },
});
