import { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { withTiming, useAnimatedProps, useAnimatedStyle, AnimatedStyle } from 'react-native-reanimated';
import { BlurView, BlurViewProps } from 'expo-blur';

import { UIView } from 'components/UIKit';
import { UITouchableOpacity } from 'components/UIKit/UITouchableOpacity';

import { ProfileHeaderButtonProps } from 'modules/profile/components/ProfileHeaderButton/types';

const AnimatedBlurView = Animated.createAnimatedComponent<BlurViewProps>(BlurView);

export const ProfileHeaderButton: FC<ProfileHeaderButtonProps> = memo(({ shouldAnimate, Icon, iconName, iconSize, onPress }) => {
  const AnimatedIcon = Animated.createAnimatedComponent(Icon);
  const iconAnimatedProps = useAnimatedProps(() => ({ color: withTiming(shouldAnimate.value ? '#fff' : '#5790ff') }), []);
  const blurViewAnimatedProps = useAnimatedProps(() => ({ intensity: withTiming(shouldAnimate.value ? 30 : 0) }), []);
  const containerAnimatedStyles = useAnimatedStyle(
    (): AnimatedStyle<StyleSheet> => ({ borderRadius: withTiming(shouldAnimate.value ? 100 : 0) }),
    []
  );
  const iconAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => ({ padding: withTiming(shouldAnimate.value ? 8 : 0) }), []);

  return (
    <UITouchableOpacity onPress={onPress}>
      <UIView reanimated style={[styles.container, containerAnimatedStyles]}>
        <AnimatedBlurView tint='dark' animatedProps={blurViewAnimatedProps}>
          <UIView reanimated style={iconAnimatedStyles}>
            <AnimatedIcon name={iconName} size={iconSize} animatedProps={iconAnimatedProps} />
          </UIView>
        </AnimatedBlurView>
      </UIView>
    </UITouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
