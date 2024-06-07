import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChatsScreen } from '../screens/ChatsScreen';

const Stack = createNativeStackNavigator();

export const ChatsNavigation = () => (
  <>
    <StatusBar barStyle='light-content' backgroundColor='black' />

    <Stack.Navigator initialRouteName='Chats'>
      <Stack.Screen name={'Chats'} component={ChatsScreen} />
    </Stack.Navigator>
  </>
);
