import React, { useState } from 'react';
import { NativeScrollEvent, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import Animated, { ReanimatedEvent, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { UIButton, UIText, UITextField, UITouchableOpacity, UIView } from 'components/UIKit';
import { ProfileEditHeader } from 'modules/profile/components/ProfileEditHeader/ProfileEditHeader';
import { Avatar } from 'components/Avatar';

import { useAuth } from 'src/providers/AuthProvider';
import { uiScreenPaddings } from 'components/UIKit/styles';
import { SCREEN_HEIGHT } from 'src/constants';
import { supabase } from 'lib/supabase';
import { User } from 'src/types';
import { UISpinner } from 'components/UIKit/UISpinner';

export const ProfileEditScreen = () => {
  const { session } = useAuth();
  const { navigate } = useNavigation();
  //
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [dateBirth, setDateBirth] = useState<string>(new Date(1672531199000));
  //
  const shouldShowDatePicker = useSharedValue<boolean>(false);
  const scrollOffset = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler(
    { onScroll: ({ contentOffset: { y } }: ReanimatedEvent<NativeScrollEvent>) => (scrollOffset.value = y) },
    []
  );
  const dateAnimatedStyles = useAnimatedStyle(() => ({
    color: withTiming(shouldShowDatePicker.value ? '#5790ff' : '#7D8287'),
  }));
  const datePickerAnimatedStyles = useAnimatedStyle(() => ({
    height: withTiming(shouldShowDatePicker.value ? 220 : 0),
    opacity: shouldShowDatePicker.value ? withTiming(1, { duration: 600 }) : 0,
  }));

  const updateProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');
      const updates = {
        id: session?.user.id,
        first_name: firstName,
        second_name: secondName,
        username,
        status,
        date_birth: dateBirth,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      } as User;
      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDate = (event, selectedDate: string) => setDateBirth(selectedDate);

  return (
    <>
      <Animated.ScrollView onScroll={scrollHandler} style={{ backgroundColor: Colors.grey10 }} showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView>
          <ProfileEditHeader scrollOffset={scrollOffset} onPressDone={updateProfile} />
          <UIView centerH>
            <Avatar onPress={() => navigate('ImageViewer')} />

            <UITouchableOpacity marginT-10 onPress={() => alert('SET NEW PHOTO')}>
              <UIText bodyM3 color={Colors.primary}>
                Set New Photo
              </UIText>
            </UITouchableOpacity>
          </UIView>
          <UIView marginT-30 style={uiScreenPaddings}>
            <UIView style={styles.item}>
              <UITextField placeholder={'First Name'} inputStyle={{ fontSize: 14 }} value={firstName} onChangeText={setFirstName} />
              <UITextField placeholder={'Last Name'} inputStyle={{ fontSize: 14 }} value={secondName} onChangeText={setSecondName} />
              <UITextField
                placeholder={'Username'}
                containerStyle={{ borderBottomWidth: 0 }}
                inputStyle={{ fontSize: 14 }}
                value={username}
                onChangeText={setUsername}
              />
            </UIView>
            <UIText marginT-6 marginL-15 bodyR4 color={Colors.grey80}>
              Enter your name, username and an optional profile photo
            </UIText>

            <UIView marginT-30 style={styles.item}>
              <UITextField
                placeholder={'Status'}
                inputStyle={{ fontSize: 14 }}
                containerStyle={{ borderBottomWidth: 0 }}
                value={status}
                onChangeText={setStatus}
              />
            </UIView>
            <UIText marginT-6 marginL-15 bodyR4 color={Colors.grey80}>
              You can add a few lines about yourself. Choose who can see your bio in Settings
            </UIText>

            <UIView marginT-30 style={styles.item} paddingR-15>
              <UITouchableOpacity
                activeOpacity={0.7}
                row
                spread
                centerV
                paddingV-10
                onPress={() => (shouldShowDatePicker.value = !shouldShowDatePicker.value)}
              >
                <UIText bodyR3 color={Colors.grey80}>
                  Date of Birth
                </UIText>
                <Animated.Text style={[styles.dateText, dateAnimatedStyles]}>{format(dateBirth, 'dd.MM.yyyy')}</Animated.Text>
              </UITouchableOpacity>

              <UIView reanimated style={datePickerAnimatedStyles}>
                <DateTimePicker value={dateBirth} display={'spinner'} onChange={handleChangeDate} />
              </UIView>
            </UIView>
            <UIText marginT-6 marginL-15 bodyR4 color={Colors.grey80}>
              Only your contacts can see your birthday.
            </UIText>

            <UIButton marginT-30 title={'Log Out'} onPress={() => supabase.auth.signOut()} backgroundColor={Colors.error} />
          </UIView>

          <UIView height={SCREEN_HEIGHT / 2} />
        </KeyboardAwareScrollView>
      </Animated.ScrollView>
      <UISpinner shouldShow={loading} />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.05,
    backgroundColor: Colors.white,
    shadowRadius: 1,
    shadowColor: '#000',
    elevation: 4,
    borderRadius: 10,
    paddingLeft: 15,
  },

  dateText: { fontSize: 14, fontWeight: '500', lineHeight: 20, color: Colors.grey100, fontFamily: 'HelveticaNeueMedium' },
});
