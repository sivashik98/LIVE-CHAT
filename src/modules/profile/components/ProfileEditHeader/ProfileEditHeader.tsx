import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedStyle, Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';
import { Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { UIText, UITouchableOpacity, UIView } from 'components/UIKit';

import { uiPaddingHorizontal } from 'components/UIKit/styles';
import { ProfileEditHeaderProps } from 'modules/profile/components/ProfileEditHeader/types';

export const ProfileEditHeader: FC<ProfileEditHeaderProps> = ({ scrollOffset, onPressDone }) => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const animatedStyles = useAnimatedStyle(
    (): AnimatedStyle<StyleSheet> => ({
      borderWidth: interpolate(scrollOffset.value, [0, 50], [0, 0.2], Extrapolation.CLAMP),
      backgroundColor: interpolateColor(scrollOffset.value, [0, 50], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.98)']),
      transform: [{ translateY: scrollOffset.value }],
    })
  );

  return (
    <UIView reanimated row spread style={[styles.container, { paddingTop: top }, animatedStyles]}>
      <UITouchableOpacity onPress={goBack}>
        <UIText bodyR3 color={Colors.primary}>
          Cancel
        </UIText>
      </UITouchableOpacity>
      <UITouchableOpacity
        onPress={() => {
          onPressDone?.();
          goBack();
        }}
      >
        <UIText bodyM3 color={Colors.primary}>
          Done
        </UIText>
      </UITouchableOpacity>
    </UIView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    paddingBottom: 15,
    borderColor: Colors.grey40,
    ...uiPaddingHorizontal,
  },
});
