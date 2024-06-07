import _ from 'lodash/fp';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native-gesture-handler';

import { UIView } from '../../../components/UIKit/UIView';

import { UIText } from '../../../components/UIKit/UIText';

import { MessageInput, ChannelList, Channel, MessageList } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';

export const ChatsScreen = () => {
  const { navigate } = useNavigation();

  const handlePress = ({ cid }) => {
    navigate('Channel', { channelCid: cid });
  };

  return <ChannelList onSelect={handlePress} />;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
