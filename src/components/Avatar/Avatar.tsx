import React, { FC, ComponentType, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Image, ImageProps } from 'expo-image';

import { UIView, UITouchableOpacity } from 'components/UIKit';

import { AvatarProps } from 'components/Avatar/types';
import { UITouchableOpacityProps } from 'components/UIKit/UITouchableOpacity/types';
import { UIViewProps } from 'components/UIKit/UIView/types';
import { Colors } from 'react-native-ui-lib';
import { UISpinner } from 'components/UIKit/UISpinner';

const IMAGE_URI =
  'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Avatar: FC<AvatarProps> = ({ reanimated, disabled, onPress, imageStyles }) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const ContainerComponent: ComponentType<UITouchableOpacityProps | UIViewProps> = onPress ? UITouchableOpacity : UIView;
  const ImageComponent: ComponentType<ImageProps | AnimatedProps<ImageProps>> = reanimated ? Animated.Image : Image;

  return (
    <ContainerComponent activeOpacity={disabled ? 1 : 0.7} onPress={disabled ? undefined : onPress}>
      <UISpinner shouldShow={showSpinner} />
      <ImageComponent contentFit={'cover'} onLoadEnd={() => setShowSpinner(false)} source={{ uri: IMAGE_URI }} style={[styles.image, imageStyles]} />
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#000',
  },
});
