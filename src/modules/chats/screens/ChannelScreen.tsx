import { head } from 'lodash/fp';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefreshControl } from 'react-native-gesture-handler';

import { UIView } from '../../../components/UIKit/UIView';

import { UIText } from '../../../components/UIKit/UIText';

import { MessageInput, ChannelList, Channel, MessageList, useChatContext } from 'stream-chat-expo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Channel as ChannelType } from 'stream-chat-expo';

export const ChannelScreen = ({}) => {
  const { goBack } = useNavigation();
  const { channelCid } = useRoute<{ params: { channelCid: string } }>()?.params || {};
  const { client } = useChatContext();
  const [channel, setChannel] = useState<ChannelType | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const channel = await client.queryChannels({ cid: channelCid });
      setChannel(head(channel));
    };
    fetchChannel();
  }, [channelCid]);

  if (!channel) {
    return (
      <UIView flex center backgroundColor={'pink'}>
        <ActivityIndicator />
      </UIView>
    );
  }

  return (
    <UIView flex useSafeArea backgroundColor={'pink'}>
      <TouchableOpacity onPress={goBack} backgroundColor={'red'}>
        <UIText>GO BACK</UIText>
      </TouchableOpacity>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </UIView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
