import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// ROOT
import { TabNavigation } from './Tabs';
import { ChannelScreen } from 'modules/chats/screens/ChannelScreen';
import { ImageViewerScreen } from 'modules/photo/screens/ImageViewerScreen';

// AUTH
import { WelcomeScreen } from 'modules/auth/screens/WelcomeScreen';
import { SignInScreen } from 'modules/auth/screens/SignInScreen';
import { CountyCodeListScreen } from 'modules/auth/screens/CountyCodeListScreen';
import { ConfirmCodeScreen } from 'modules/auth/screens/ConfirmCodeScreen';

import { useAuth } from 'src/providers/AuthProvider';
import { ProfileEditScreen } from 'modules/profile/screens/ProfileEditScreen';

const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const NavigationFlow = () => (
  <>
    <StatusBar barStyle='dark-content' backgroundColor='white' />

    <RootStack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={'Home'} component={TabNavigation} />
      <RootStack.Screen name={'Channel'} component={ChannelScreen} />
      <RootStack.Screen name={'ImageViewer'} component={ImageViewerScreen} options={{ animation: 'fade_from_bottom' }} />
      <RootStack.Screen name={'ProfileEdit'} component={ProfileEditScreen} options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </RootStack.Navigator>
  </>
);

const AuthFlow = () => (
  <>
    <StatusBar barStyle='dark-content' backgroundColor='white' />

    <AuthStack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={'WelcomeScreen'} component={WelcomeScreen} options={{ animation: 'fade_from_bottom' }} />
      <RootStack.Screen name={'SignIn'} component={SignInScreen} options={{ animation: 'fade_from_bottom' }} />
      <RootStack.Screen name={'CountyCodeList'} component={CountyCodeListScreen} options={{ animation: 'fade_from_bottom', presentation: 'modal' }} />
      <RootStack.Screen name={'ConfirmCode'} component={ConfirmCodeScreen} options={{ animation: 'fade_from_bottom' }} />
    </AuthStack.Navigator>
  </>
);

export const RootNavigation = () => {
  const navigationContainerRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  const { isAuth } = useAuth();

  return <NavigationContainer ref={navigationContainerRef}>{isAuth ? <NavigationFlow /> : <AuthFlow />}</NavigationContainer>;
};
