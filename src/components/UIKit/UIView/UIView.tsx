import React, { FC, forwardRef } from 'react';
import { View } from 'react-native-ui-lib';
import { ViewProps } from 'react-native';

import { UIViewProps, UIStackProps } from './types';

export const UIView: FC<UIViewProps> = forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} {...props}>
      {children}
    </View>
  );
});

export const UIStack: FC<UIStackProps> = forwardRef(({ children, gap, wrap, style, ...props }, ref) => {
  const styles: ViewProps['style'] = {
    flexWrap: wrap ? 'wrap' : undefined,
  };
  return (
    <UIView ref={ref} {...props} style={[style, styles]} gap={gap}>
      {children}
    </UIView>
  );
});
