import { SharedValue } from 'react-native-reanimated';

export type ProfileHeaderProps = {
  isDragging: SharedValue<boolean>;
  scrollOffset: SharedValue<number>;
  shouldExpand: SharedValue<boolean>;
  isExpanded: boolean;
  onExpand: () => void;
};
