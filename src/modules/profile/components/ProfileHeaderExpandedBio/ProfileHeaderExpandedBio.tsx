import { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { withTiming, useAnimatedProps, useAnimatedStyle, AnimatedStyle } from 'react-native-reanimated';
import { BlurView, BlurViewProps } from 'expo-blur';

import { UIStack, UIText, UIView } from 'components/UIKit';

import { SCREEN_WIDTH } from 'src/constants';
import { uiPaddingHorizontal } from 'components/UIKit/styles';
import { ProfileHeaderExpandedBioProps } from 'modules/profile/components/ProfileHeaderExpandedBio/types';

const AnimatedBlurView = Animated.createAnimatedComponent<BlurViewProps>(BlurView);

const TEXT_COLOR = 'rgba(255, 255, 255, 0.8)';
const INTENSITY_ANIMATION = { duration: 700 };
const TEXT_ANIMATION = { duration: 400 };

export const ProfileHeaderExpandedBio: FC<ProfileHeaderExpandedBioProps> = ({ shouldAnimate, scrollOffset }) => {
  const blurViewAnimatedProps = useAnimatedProps(() => ({ intensity: withTiming(shouldAnimate.value ? 30 : 0, INTENSITY_ANIMATION) }));
  const containerAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    return {
      transform: [{ translateY: -scrollOffset.value / 1.6 }],
      zIndex: shouldAnimate.value ? 1 : -1,
      opacity: withTiming(shouldAnimate.value ? 1 : 0),
    };
  });
  const textAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    return { transform: [{ translateX: withTiming(shouldAnimate.value ? 0 : 100, TEXT_ANIMATION) }] };
  });

  return (
    <UIView reanimated width={SCREEN_WIDTH} style={containerAnimatedStyles}>
      <AnimatedBlurView tint={'dark'} animatedProps={blurViewAnimatedProps} style={styles.container}>
        <UIView reanimated style={textAnimatedStyles}>
          <UIText h2 color={TEXT_COLOR}>
            Mакс
          </UIText>
          <UIStack row gap={6} marginT-4>
            <UIText bodyM4 color={TEXT_COLOR}>
              +7 999 769 06 42
            </UIText>
            <UIText bodyM4 color={TEXT_COLOR}>
              •
            </UIText>
            <UIText bodyM4 color={TEXT_COLOR}>
              @maximuSpartan98
            </UIText>
          </UIStack>
        </UIView>
      </AnimatedBlurView>
    </UIView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
    paddingVertical: 14,
    ...uiPaddingHorizontal,
  },
});
