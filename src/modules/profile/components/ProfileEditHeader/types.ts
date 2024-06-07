import { SharedValue } from 'react-native-reanimated';

export type ProfileEditHeaderProps = {
  scrollOffset: SharedValue<number>;
  onPressDone: () => void;
};
