import { FC, memo } from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedStyle, Extrapolation, interpolate, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { Colors, Spacings } from 'react-native-ui-lib';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { UIView } from 'components/UIKit';
import { Avatar } from 'components/Avatar';
import { ProfileHeaderButton } from 'modules/profile/components/ProfileHeaderButton/ProfileHeaderButton';
import { ProfileHeaderExpandedBio } from 'modules/profile/components/ProfileHeaderExpandedBio/ProfileHeaderExpandedBio';
import { ProfileHeaderBio } from 'modules/profile/components/ProfileHeaderBio/ProfileHeaderBio';
import { ButtonWithIcon } from 'components/Buttons/ButtonWithIcon';

import { COLLAPSED_THRESHOLD, EXPAND_THRESHOLD, THRESHOLD } from 'modules/profile/hooks/useProfileHeaderAnimationHandler';
import { isIOS, SCREEN_WIDTH } from 'src/constants';
import { ProfileHeaderProps } from 'modules/profile/components/ProfileHeader/types';

const DEFAULT_IMAGE_SIZE: number = 100 as const;
const IMAGE_SCALE_RANGE: number[] = [1.6, 1.1, 1, 0.3] as const;
const IMAGE_OPACITY_RANGE: number[] = [1, 0] as const;
const IMAGE_BORDER_ANIMATION = { duration: 600 };
const IMAGE_SCALE_ANIMATION = { duration: 150 };
const HEADER_BG_RANGE: string[] = ['#F7F8F9', '#fff'] as const;
const HEADER_BORDER_RANGE: number[] = [0, 0.2] as const;

const BUTTONS_OPACITY_INPUT_RANGE: number[] = [THRESHOLD + THRESHOLD / 2, COLLAPSED_THRESHOLD] as const;
const BUTTONS_OPACITY_OUTPUT_RANGE: number[] = [1, 0] as const;
const BUTTONS_TRANSLATE_INPUT_RANGE: number[] = [0, THRESHOLD + THRESHOLD / 2, COLLAPSED_THRESHOLD, COLLAPSED_THRESHOLD + 1] as const;
const BUTTONS_TRANSLATE_OUTPUT_RANGE: number[] = [0, THRESHOLD + THRESHOLD / 2, COLLAPSED_THRESHOLD - 30, -1000] as const;
const COLLAPSED_BUTTON_TRANSLATE_INPUT_RANGE: number[] = [0, COLLAPSED_THRESHOLD] as const;
const COLLAPSED_BUTTON_TRANSLATE_OUTPUT_RANGE: number[] = [0, COLLAPSED_THRESHOLD] as const;
const COLLAPSED_BUTTON_ANIMATION = { duration: 200 };

export const ProfileHeader: FC<ProfileHeaderProps> = memo(({ isDragging, scrollOffset, shouldExpand, onExpand }) => {
  const { top: topSafeArea } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  const headerAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    const backgroundColor = interpolateColor(scrollOffset.value, [THRESHOLD, COLLAPSED_THRESHOLD], HEADER_BG_RANGE);
    const borderBottomWidth = interpolate(scrollOffset.value, [THRESHOLD, COLLAPSED_THRESHOLD], HEADER_BORDER_RANGE, Extrapolation.CLAMP);

    return {
      backgroundColor,
      borderBottomWidth,
      paddingTop: withTiming(shouldExpand.value ? 0 : isIOS ? topSafeArea : 20),
      transform: [
        {
          translateY: shouldExpand.value
            ? scrollOffset.value
            : scrollOffset.value >= COLLAPSED_THRESHOLD
            ? scrollOffset.value - COLLAPSED_THRESHOLD
            : 0,
        },
      ],
    };
  }, []);
  const imageAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    const extrapolation = shouldExpand.value ? Extrapolation.EXTEND : Extrapolation.CLAMP;
    const size = withTiming(shouldExpand.value ? SCREEN_WIDTH : DEFAULT_IMAGE_SIZE);
    const borderRadius = withTiming(shouldExpand.value ? 0 : DEFAULT_IMAGE_SIZE, IMAGE_BORDER_ANIMATION);
    const scale = isDragging.value
      ? interpolate(scrollOffset.value, [-COLLAPSED_THRESHOLD, EXPAND_THRESHOLD, 0, COLLAPSED_THRESHOLD], IMAGE_SCALE_RANGE, extrapolation)
      : withTiming(scrollOffset.value > THRESHOLD ? 0 : 1, IMAGE_SCALE_ANIMATION);
    const opacity = interpolate(scrollOffset.value, [THRESHOLD, COLLAPSED_THRESHOLD], IMAGE_OPACITY_RANGE, Extrapolation.CLAMP);

    return {
      transform: [{ scale }],
      width: size,
      height: size,
      borderRadius,
      opacity,
    };
  }, []);
  const initialButtonsAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    const opacity = interpolate(scrollOffset.value, BUTTONS_OPACITY_INPUT_RANGE, BUTTONS_OPACITY_OUTPUT_RANGE, Extrapolation.CLAMP);
    const translateY = shouldExpand.value
      ? 0
      : interpolate(scrollOffset.value, BUTTONS_TRANSLATE_INPUT_RANGE, BUTTONS_TRANSLATE_OUTPUT_RANGE, Extrapolation.CLAMP);

    return {
      top: withTiming(shouldExpand.value ? topSafeArea : 0),
      transform: [{ translateY }],
      opacity,
    };
  }, []);
  const collapsedButtonAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    return {
      transform: [
        {
          translateY: shouldExpand.value
            ? -1000
            : interpolate(scrollOffset.value, COLLAPSED_BUTTON_TRANSLATE_INPUT_RANGE, COLLAPSED_BUTTON_TRANSLATE_OUTPUT_RANGE, Extrapolation.CLAMP),
        },
      ],
      zIndex: scrollOffset.value >= COLLAPSED_THRESHOLD ? 1 : -1,
      opacity: withTiming(scrollOffset.value >= COLLAPSED_THRESHOLD ? 1 : 0, COLLAPSED_BUTTON_ANIMATION),
    };
  }, []);

  return (
    <UIView reanimated style={[styles.container, headerAnimatedStyles]}>
      <UIView centerH>
        <UIView reanimated absL style={[styles.buttons, styles['buttons-left'], initialButtonsAnimatedStyles]}>
          <ProfileHeaderButton
            shouldAnimate={shouldExpand}
            Icon={MaterialCommunityIcons}
            iconName={'qrcode-scan'}
            iconSize={20}
            onPress={() => alert('QR-CODE')}
          />
        </UIView>
        <UIView absR style={[styles.buttons, styles['buttons-right']]}>
          <UIView reanimated style={initialButtonsAnimatedStyles}>
            <ProfileHeaderButton
              shouldAnimate={shouldExpand}
              Icon={Feather}
              iconName={'edit'}
              iconSize={20}
              onPress={() => navigate('ProfileEdit')}
            />
          </UIView>

          <UIView reanimated absR style={collapsedButtonAnimatedStyles}>
            <ButtonWithIcon Icon={AntDesign} name={'search1'} size={20} color={Colors.primary} onPress={() => alert('SEARCH')} />
          </UIView>
        </UIView>
        <Avatar reanimated imageStyles={imageAnimatedStyles} onPress={isIOS ? onExpand : () => navigate('ImageViewer')} />
        <ProfileHeaderExpandedBio scrollOffset={scrollOffset} shouldAnimate={shouldExpand} />
        <ProfileHeaderBio scrollOffset={scrollOffset} shouldExpand={shouldExpand} />
      </UIView>
    </UIView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.grey40,
    zIndex: 1,
  },
  buttons: {
    zIndex: 1,
  },
  'buttons-left': {
    left: Spacings.s5,
  },
  'buttons-right': {
    right: Spacings.s5,
  },
});
