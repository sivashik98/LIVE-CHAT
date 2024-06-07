import { SharedValue } from 'react-native-reanimated';

export type ProfileHeaderExpandedBioProps = {
  shouldAnimate: SharedValue<boolean>;
  scrollOffset: SharedValue<number>;
};
