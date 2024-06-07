import { ComponentType } from 'react';
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
  EvilIcons,
  Zocial,
  Ionicons,
  Entypo,
  Foundation,
  FontAwesome,
  Octicons,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
} from '@expo/vector-icons';

import { UITouchableOpacityProps } from 'components/UIKit/UITouchableOpacity/types';

export type ButtonWithIconProps = {
  Icon: ComponentType<
    | MaterialCommunityIcons
    | AntDesign
    | Feather
    | MaterialIcons
    | SimpleLineIcons
    | EvilIcons
    | Zocial
    | Ionicons
    | Entypo
    | Foundation
    | FontAwesome
    | Octicons
    | FontAwesome5
    | FontAwesome6
    | Fontisto
  >;
  name: string;
  size: number;
  color: string;
  onPress: () => void;
} & UITouchableOpacityProps;
