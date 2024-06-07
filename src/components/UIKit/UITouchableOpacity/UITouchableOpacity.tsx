import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';

import { UITouchableOpacityProps } from './types';
import { isAndroid } from 'src/constants';

export const UITouchableOpacity: FC<UITouchableOpacityProps> = ({ activeOpacity, children, ...props }) => {
  return (
    <TouchableOpacity activeOpacity={isAndroid ? 0.9 : activeOpacity} {...props}>
      {children}
    </TouchableOpacity>
  );
};
