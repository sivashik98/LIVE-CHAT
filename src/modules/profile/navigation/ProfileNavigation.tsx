import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen } from 'modules/profile';
import { ProfileEditScreen } from 'modules/profile/screens/ProfileEditScreen';

const Stack = createNativeStackNavigator();

export const ProfileNavigation = () => (
  <>
    <Stack.Navigator initialRouteName='Profile'>
      <Stack.Screen name={'Profile'} component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </>
);
