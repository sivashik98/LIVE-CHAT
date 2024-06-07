import { useEffect, useState } from 'react';
import { NativeScrollEvent, StatusBar } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import Animated, { runOnJS, useSharedValue, useAnimatedScrollHandler, ReanimatedEvent } from 'react-native-reanimated';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

import { UIView } from 'components/UIKit';
import { ImageViewerItem } from 'modules/photo/components/ImageViewerItem';
import { ImageViewerNavigation } from 'modules/photo/components/ImageViewerNavigation/ImageViewerNavigation';
import { ImageViewerBottomTools } from 'modules/photo/components/ImageViewerBottomTools';

import { isAndroid, SCREEN_WIDTH } from 'src/constants';

const data = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1445820200644-69f87d946277?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const keyExtractor = ({ id }: { id: number }) => id;

export const ImageViewerScreen = ({ shouldUseHaptic = true }) => {
  const [page, setPage] = useState<number>(1);
  const [navigationHeight, setNavigationHeight] = useState<number>(0);
  const [bottomToolsHeight, setBottomToolsHeight] = useState<number>(0);
  const scrollOffset = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }: ReanimatedEvent<NativeScrollEvent>) => (scrollOffset.value = x),
    onMomentumEnd: ({ contentOffset: { x } }: ReanimatedEvent<NativeScrollEvent>) => {
      const pageNumber = Math.min(Math.max(Math.floor(x / SCREEN_WIDTH + 0.5) + 1, 0), data.length);
      runOnJS(setPage)(pageNumber);
    },
  });

  useEffect(() => {
    if (shouldUseHaptic) impactAsync(ImpactFeedbackStyle.Light);
  }, []);

  const handleLayoutNavigation = (e) => setNavigationHeight(e.nativeEvent.layout.height);
  const handleLayoutBottomTools = (e) => setBottomToolsHeight(e.nativeEvent.layout.height);

  return (
    <UIView flex backgroundColor={Colors.black}>
      <StatusBar barStyle={'light-content'} hidden={isAndroid} animated />
      <ImageViewerNavigation currentPage={page} allPages={data.length} onLayout={handleLayoutNavigation} />
      <ImageViewerBottomTools shareUrl={data[page - 1]?.url} onLayout={handleLayoutBottomTools} />
      <Animated.FlatList
        data={data}
        renderItem={({ ...props }) => (
          <ImageViewerItem {...props} scrollOffset={scrollOffset} navigationHeight={navigationHeight} bottomToolsHeight={bottomToolsHeight} />
        )}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    </UIView>
  );
};
