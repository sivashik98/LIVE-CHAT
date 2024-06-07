import _ from 'lodash/fp';
import { useEffect, useState, useCallback, useRef } from 'react';
import { StyleSheet, FlatList, View, Button, TextInput, Alert, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native-gesture-handler';

import { UIStack, UIView } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { useAuth } from 'src/providers/AuthProvider';
import { supabase } from 'lib/supabase';
import { Colors } from 'react-native-ui-lib';
import { uiScreenPaddings } from 'components/UIKit/styles';

import Animated, { useAnimatedReaction, useAnimatedRef, scrollTo, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ProfileHeader } from 'modules/profile/components/ProfileHeader/ProfileHeader';
import { useProfileHeaderAnimationHandler } from 'modules/profile/hooks/useProfileHeaderAnimationHandler';
import { SCREEN_HEIGHT } from 'src/constants';

export const ProfileScreen = () => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const { scrollHandler, isDragging, scrollOffset, shouldExpand, onExpand, isExpanded } = useProfileHeaderAnimationHandler(scrollViewRef);

  return (
    <Animated.ScrollView ref={scrollViewRef} onScroll={scrollHandler} style={{ backgroundColor: Colors.grey10 }} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={isExpanded ? 'light-content' : 'dark-content'} />
      <ProfileHeader isDragging={isDragging} scrollOffset={scrollOffset} shouldExpand={shouldExpand} isExpanded={isExpanded} onExpand={onExpand} />

      <UIView style={uiScreenPaddings}>
        <UIView marginT-20 style={styles.container}>
          <UIView paddingV-10 style={styles.item}>
            <UIText bodyM4>username</UIText>
            <UIText bodyR3 color={Colors.primary}>
              @user-23456991
            </UIText>
          </UIView>

          <UIView paddingV-10 style={styles.item}>
            <UIText bodyM4>fullName</UIText>
            <UIText bodyM3>Maxim Sivashov</UIText>
          </UIView>

          <UIView paddingV-10>
            <UIText bodyM4>website</UIText>
            <UIText bodyM3>https//:dasdasdasd/asdasdasd</UIText>
          </UIView>
        </UIView>

        <UIView marginT-20 style={styles.container}>
          <UIView paddingV-10 style={styles.item}>
            <UIText bodyM4>username</UIText>
            <UIText bodyR3 color={Colors.primary}>
              @user-23456991
            </UIText>
          </UIView>

          <UIView paddingV-10 style={styles.item}>
            <UIText bodyM4>fullName</UIText>
            <UIText bodyM3>Maxim Sivashov</UIText>
          </UIView>

          <UIView paddingV-10>
            <UIText bodyM4>website</UIText>
            <UIText bodyM3>https//:dasdasdasd/asdasdasd</UIText>
          </UIView>
        </UIView>

        <UIView height={SCREEN_HEIGHT / 2} />
      </UIView>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.05,
    backgroundColor: '#fff',
    shadowRadius: 1,
    shadowColor: '#000',
    elevation: 4,
    borderRadius: 20,
    paddingLeft: 15,
  },
  item: {
    borderBottomWidth: 0.2,
    borderColor: Colors.grey40,
  },
});
