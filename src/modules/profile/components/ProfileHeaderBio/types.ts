import { SharedValue } from 'react-native-reanimated';

export type ProfileHeaderBioProps = {
  shouldExpand: SharedValue<boolean>;
  scrollOffset: SharedValue<number>;
};
