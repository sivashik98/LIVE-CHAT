import React, { FC } from 'react';

import { UITouchableOpacity } from 'components/UIKit';

import { ButtonWithIconProps } from 'components/Buttons/ButtonWithIcon/types';

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({ Icon, name, size, color, onPress, children, ...props }) => {
  return (
    <UITouchableOpacity row center {...props} onPress={onPress}>
      <Icon name={name} size={size} color={color} />
      {children}
    </UITouchableOpacity>
  );
};
