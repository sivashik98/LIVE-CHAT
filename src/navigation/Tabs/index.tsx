import { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ChatsNavigation } from 'modules/chats/navigation/ChatsNavigation';
import { ProfileNavigation } from 'modules/profile/navigation/ProfileNavigation';

const Tabs = createBottomTabNavigator();

export const TabNavigation: FC = () => {
  return (
    <Tabs.Navigator
      initialRouteName='ChatsTab'
      // screenOptions={mainTabsNavigationOptions}
      // screenListeners={mainTabsScreenListeners(myId)}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name={'ChatsTab'}
        component={ChatsNavigation}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({ focused }) => <Ionicons name='chatbubbles' size={30} color={focused ? 'blue' : 'black'} />,
        }}
      />
      <Tabs.Screen
        name={'ProfileTab'}
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <Ionicons name='person-circle-outline' size={30} color={focused ? 'blue' : 'black'} />,
        }}
      />
    </Tabs.Navigator>
  );
};
