import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppState, PermissionsAndroid } from 'react-native';
import { OverlayProvider, Chat } from 'stream-chat-expo';
import { StreamChat } from 'stream-chat';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

import { RootNavigation } from 'src/navigation/Root';

import { isAndroid } from 'src/constants';
import { initUiTheme } from 'components/UIKit/utils';
import { supabase } from 'lib/supabase';
import { Session } from '@supabase/supabase-js';
import { AuthProvider } from 'src/providers/AuthProvider';

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);
initUiTheme();

const supabaseHandler = (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
};

const InnerApp = () => {
  const [isReady, setIsReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data: { user } } ) => console.log('user', user))
  //   // supabase.auth.getSession().then(({ data: { session } }) => {
  //   //   console.log('session', session)
  //   //   setSession(session)
  //   // })
  //   //
  //   //
  //   // supabase.auth.onAuthStateChange((_event, session) => {
  //   //   console.log('onAuthStateChange', session)
  //   //   setSession(session)
  //   // })
  // }, [])

  // console.log(session)

  const connectUser = async () => {
    // await client.connectUser(
    //   {
    //     id: "jlahey",
    //     name: "Jim Lahey",
    //     image: "https://i.imgur.com/fR9Jz14.png",
    //   },
    //   client.devToken("jlahey")
    // );
    // const channel = client.channel('messaging', 'the_park', {
    //     name: 'The Park',
    // });
    //
    // await channel.watch()
  };
  const disconnectUser = async () => {
    // await client.disconnectUser();
  };

  // const getProfile = async () => {
  //   try {
  //     setLoading(true);
  //     if (!session?.user) throw new Error('No user on the session!');
  //     const { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`username, website, avatar_url, full_name`)
  //       .eq('id', session?.user.id)
  //       .single();
  //     if (error && status !== 406) throw error;
  //     if (data) {
  //       setUsername(data.username);
  //       setWebsite(data.website);
  //       setAvatarUrl(data.avatar_url);
  //       setFullName(data.full_name);
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       Alert.alert(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  //
  // useEffect(() => {
  //   if (session) getProfile();
  // }, [session]);
  //

  useEffect(() => {
    const run = async () => {
      if (isAndroid) {
        await PermissionsAndroid.requestMultiple(['android.permission.POST_NOTIFICATIONS', 'android.permission.BLUETOOTH_CONNECT']);
      }
    };
    run();
    connectUser();

    // Tells Supabase Auth to continuously refresh the session automatically if
    // the app is in the foreground. When this is added, you will continue to receive
    // `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
    // if the user's session is terminated. This should only be registered once.
    const listener = AppState.addEventListener('change', supabaseHandler);

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session', session);
      setSession(session);
    });

    setIsReady(true);
    return () => {
      alert('APP REMOVE LISTNERES');
      disconnectUser();
      listener.remove();
    };
  }, []);

  if (!isReady) return null;

  return <RootNavigation />;
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={client}>
          <SafeAreaProvider>
            <AuthProvider>
              <InnerApp />
            </AuthProvider>
          </SafeAreaProvider>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
}
