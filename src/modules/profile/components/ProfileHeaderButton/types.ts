import { ComponentType } from 'react';
import { MaterialCommunityIcons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { SharedValue } from 'react-native-reanimated';

export type ProfileHeaderButtonProps = {
  shouldAnimate: SharedValue<boolean>;
  Icon: ComponentType<MaterialCommunityIcons | AntDesign | Feather | MaterialIcons>;
  iconName: string;
  iconSize: number;
  onPress: () => void;
};
