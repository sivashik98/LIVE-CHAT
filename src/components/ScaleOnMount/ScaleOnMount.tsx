import React, { FC, useEffect, useState } from 'react';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { UIView } from '../UIKit/UIView';

import { ScaleOnMountPropsType } from 'components/ScaleOnMount/types';

export const ScaleOnMount: FC<ScaleOnMountPropsType> = ({ children, style, ...props }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(mounted ? 1 : 0.97, { duration: 900 }) }],
  }));

  return (
    <UIView reanimated flex style={[animatedStyles, style]} {...props}>
      {children}
    </UIView>
  );
};
