import React, { FC } from 'react';
import { Colors, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

import { UIText, UIView } from 'components/UIKit';

import { uiPaddingHorizontal } from 'components/UIKit/styles';
import { CountryCodeType } from 'modules/auth/types';

export const CountryCodeTitleSection: FC<{ title: string }> = ({ title }) => (
  <UIView backgroundColor={Colors.grey10} paddingV-5 style={uiPaddingHorizontal}>
    <UIText bodyB2 color={Colors.grey80}>
      {title}
    </UIText>
  </UIView>
);

export const CountryCodeItem: FC<CountryCodeType> = ({ countryName, countryPhoneCode, countrySource }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity style={uiPaddingHorizontal} onPress={() => navigate('SignIn', { countryName })}>
      <UIView row centerV spread style={styles.container}>
        <UIView row center>
          <UIView style={styles.imageContainer}>
            <Image source={{ uri: countrySource }} style={styles.image} />
          </UIView>
          <UIText bodyB2 marginL-10>
            {countryName}
          </UIText>
        </UIView>
        <UIText bodyM3 color={Colors.grey80}>
          {countryPhoneCode}
        </UIText>
      </UIView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  imageContainer: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    shadowRadius: 2,
    shadowColor: '#000',
    elevation: 6,
  },
  image: {
    width: 20,
    height: 12,
  },
});
