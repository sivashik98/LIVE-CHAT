import { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { AnimatedStyle, Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Colors } from 'react-native-ui-lib';

import { UIStack, UIText, UIView } from 'components/UIKit';

import { COLLAPSED_THRESHOLD, THRESHOLD } from 'modules/profile/hooks/useProfileHeaderAnimationHandler';
import { ProfileHeaderBioProps } from 'modules/profile/components/ProfileHeaderBio/types';

let DESCRIPTION_HEIGHT = 0;
let BIO_HEIGHT = 0;

export const ProfileHeaderBio: FC<ProfileHeaderBioProps> = ({ scrollOffset, shouldExpand }) => {
  const [isInitializedDescriptionHeight, setIsInitializedDescriptionHeight] = useState(false);
  const [isInitializedBioHeight, setIsInitializedBioHeight] = useState(false);
  useEffect(() => {
    if (DESCRIPTION_HEIGHT > 0 && !isInitializedDescriptionHeight) setIsInitializedDescriptionHeight(true);
    if (BIO_HEIGHT > 0 && !isInitializedBioHeight) setIsInitializedBioHeight(true);
  });
  const handleLayoutDescription = (e) => (!isInitializedDescriptionHeight ? (DESCRIPTION_HEIGHT = e.nativeEvent.layout.height) : undefined);
  const handleLayoutBio = (e) => (!isInitializedBioHeight ? (BIO_HEIGHT = e.nativeEvent.layout.height) : undefined);

  const containerAnimatedStyles = useAnimatedStyle((): AnimatedStyle<StyleSheet> => {
    if (isInitializedBioHeight && isInitializedDescriptionHeight) {
      return {
        height: shouldExpand.value
          ? withTiming(0, { duration: 600 })
          : interpolate(
              scrollOffset.value,
              [COLLAPSED_THRESHOLD, COLLAPSED_THRESHOLD + DESCRIPTION_HEIGHT],
              [BIO_HEIGHT, BIO_HEIGHT - DESCRIPTION_HEIGHT],
              Extrapolation.CLAMP
            ),
        opacity: withTiming(shouldExpand.value ? 0 : 1, { duration: 250 }),
        transform: [
          { translateX: withTiming(shouldExpand.value ? -80 : 0) },
          { translateY: withTiming(shouldExpand.value ? -80 : 0) },
          { scale: interpolate(scrollOffset.value, [0, COLLAPSED_THRESHOLD], [1, 0.7], Extrapolation.CLAMP) },
        ],
      };
    }
    return {};
  });
  const textAnimatedStyles = useAnimatedStyle(
    (): AnimatedStyle<StyleSheet> => ({ opacity: interpolate(scrollOffset.value, [THRESHOLD / 2, COLLAPSED_THRESHOLD], [1, 0]) })
  );

  return (
    <UIView reanimated center marginT-6 style={containerAnimatedStyles} onLayout={handleLayoutBio}>
      <UIView>
        <UIText h1 color={Colors.grey100}>
          Mакс
        </UIText>
      </UIView>

      <UIStack reanimated row gap={6} marginV-4 style={textAnimatedStyles} onLayout={handleLayoutDescription}>
        <UIText bodyM3 color={Colors.grey100}>
          +7 999 769 06 42
        </UIText>
        <UIText bodyM3 color={Colors.grey100}>
          •
        </UIText>
        <UIText bodyM3 color={Colors.grey100}>
          @maximuSpartan98
        </UIText>
      </UIStack>
    </UIView>
  );
};
