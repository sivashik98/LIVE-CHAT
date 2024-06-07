import { AnimatedStyle } from 'react-native-reanimated';
import { ImageStyle } from 'expo-image';

export type AvatarProps = {
  imageStyles?: AnimatedStyle | ImageStyle;
  reanimated?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};
