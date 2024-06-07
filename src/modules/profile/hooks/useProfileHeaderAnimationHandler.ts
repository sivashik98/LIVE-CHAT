import Animated, {
  AnimatedRef,
  runOnJS,
  scrollTo,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
  ReanimatedEvent,
} from 'react-native-reanimated';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { NativeScrollEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { isIOS } from 'src/constants';
import { useState } from 'react';

export const THRESHOLD = 50;
export const COLLAPSED_THRESHOLD = THRESHOLD * 2;
export const EXPAND_THRESHOLD = -THRESHOLD;

export const useProfileHeaderAnimationHandler = (scrollViewRef: AnimatedRef<Animated.ScrollView>) => {
  const { navigate } = useNavigation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [shouldMoveToImageViewer, setShouldMoveToImageViewer] = useState<boolean>(false);
  const scrollOffset = useSharedValue<number>(0);
  const shouldExpand = useSharedValue<boolean>(false);
  const shouldSetDefault = useSharedValue<boolean>(false);
  const shouldCollapse = useSharedValue<boolean>(false);
  const isScrolling = useSharedValue<boolean>(false);
  const isDragging = useSharedValue<boolean>(false);

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: ({ contentOffset: { y } }: ReanimatedEvent<NativeScrollEvent>) => {
        if (isDragging.value && !shouldExpand.value && y < EXPAND_THRESHOLD && isIOS) {
          shouldExpand.value = true;
          runOnJS(setIsExpanded)(true);
          runOnJS(impactAsync)(ImpactFeedbackStyle.Medium);
        }
        if (y > 5 && shouldExpand.value) {
          shouldExpand.value = false;
          runOnJS(setIsExpanded)(false);
          runOnJS(setShouldMoveToImageViewer)(false);
          runOnJS(impactAsync)(ImpactFeedbackStyle.Light);
        }

        if (shouldExpand.value && y < EXPAND_THRESHOLD * 2 && shouldMoveToImageViewer) {
          runOnJS(navigate)('ImageViewer');
        }
        scrollOffset.value = y;
      },
      onBeginDrag: () => {
        isDragging.value = true;
      },
      onEndDrag: ({ contentOffset: { y }, velocity: { y: velocityY } }: ReanimatedEvent<NativeScrollEvent>) => {
        if (shouldExpand.value) runOnJS(setShouldMoveToImageViewer)(true);
        // работа threshold-a, y > 5 запасное значение чтобы избежать лаггов
        shouldSetDefault.value = y > 5 && y < THRESHOLD && velocityY === 0;
        shouldCollapse.value = y >= THRESHOLD && y <= COLLAPSED_THRESHOLD && velocityY === 0;

        isDragging.value = false;
      },
      onMomentumBegin: () => {
        isScrolling.value = true;
      },
      onMomentumEnd: ({ contentOffset: { y } }: ReanimatedEvent<NativeScrollEvent>) => {
        // доскроллить после остановки скролла
        shouldSetDefault.value = y > 0 && y < THRESHOLD;
        shouldCollapse.value = y >= THRESHOLD && y <= COLLAPSED_THRESHOLD;

        isScrolling.value = false;
      },
    },
    [shouldMoveToImageViewer]
  );

  useAnimatedReaction(
    () => {
      return {
        isDragging: isDragging.value,
        isScrolling: isScrolling.value,
        shouldSetDefault: shouldSetDefault.value,
        shouldCollapse: shouldCollapse.value,
        shouldExpand: shouldExpand.value,
      };
    },
    ({ isDragging, isScrolling, shouldSetDefault, shouldCollapse, shouldExpand }) => {
      if (!isDragging && !isScrolling && !shouldExpand && shouldSetDefault) scrollTo(scrollViewRef, 0, 0, true);
      if (!isDragging && !isScrolling && !shouldExpand && shouldCollapse) scrollTo(scrollViewRef, 0, COLLAPSED_THRESHOLD, true);
    }
  );

  const onExpand = () => {
    runOnJS(setShouldMoveToImageViewer)(true);
    runOnJS(setIsExpanded)(true);
    shouldExpand.value = true;
  };

  return {
    scrollHandler,
    isDragging,
    scrollOffset,
    shouldExpand,
    onExpand,
    isExpanded,
  };
};

// Scroll-ы вызываются
// onScroll - всегда
// onMomentumBegin - когда я свайпом толкнул скролл и отпустил палец
// onMomentumEnd - когда я свайпом толкнул скролл и скролл закончил свое движение (остановился)
// onBeginDrag - когда я начал скроллить пальцем
// onEndDrag - когда я отпустил палец
