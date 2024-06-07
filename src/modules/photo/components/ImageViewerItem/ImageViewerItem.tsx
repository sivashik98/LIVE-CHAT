import { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { AnimatedStyle, interpolate, useAnimatedStyle } from 'react-native-reanimated';

import { UIView } from 'components/UIKit';

import { isIOS, SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants';
import { UISpinner } from 'components/UIKit/UISpinner';

export const ImageViewerItem: FC = ({ item: { url }, index, scrollOffset, navigationHeight, bottomToolsHeight }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const inputRange = [(index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH];
  const outputRange = [-SCREEN_WIDTH * 0.7, 0, SCREEN_WIDTH * 0.7];
  const imageAnimatedStyles = useAnimatedStyle(
    (): AnimatedStyle<StyleSheet> => ({ transform: [{ translateX: interpolate(scrollOffset.value, inputRange, outputRange) }] })
  );
  const { top, bottom } = useSafeAreaInsets();
  const marginTop = isIOS ? top + navigationHeight + 10 : navigationHeight + 45;
  const marginBottom = isIOS ? bottom + bottomToolsHeight + 5 : bottomToolsHeight + 10;

  return (
    <UIView center width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
      <UISpinner shouldShow={showSpinner} />
      <UIView style={styles.cover}>
        <UIView center style={styles.coverOverlay}>
          <Animated.Image blurRadius={10} contentFit='cover' source={{ uri: url }} style={[styles.coverImage, imageAnimatedStyles]} />
        </UIView>
      </UIView>
      <UIView style={[styles.frame, { marginTop, marginBottom }]}>
        <UIView center style={styles.frameOverlay}>
          <Animated.Image
            onLoadStart={() => setShowSpinner(true)}
            onLoadEnd={() => setShowSpinner(false)}
            contentFit='cover'
            source={{ uri: url }}
            style={[styles.frameImage, imageAnimatedStyles]}
          />
        </UIView>
      </UIView>
    </UIView>
  );
};

const styles = StyleSheet.create({
  blur: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 2,
    position: 'absolute',
  },
  cover: {
    zIndex: 1,
    position: 'absolute',
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOpacity: 1,
    shadowOffset: {
      width: -2,
      height: -2,
    },
  },
  coverOverlay: {
    overflow: 'hidden',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  coverImage: {
    width: SCREEN_WIDTH * 2,
    height: SCREEN_HEIGHT * 2,
  },
  frame: {
    borderRadius: 16,
    zIndex: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  frameOverlay: {
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    width: SCREEN_WIDTH / 1.1,
  },
  frameImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
