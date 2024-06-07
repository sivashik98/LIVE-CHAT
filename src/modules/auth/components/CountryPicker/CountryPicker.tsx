import React, { FC } from 'react';
import { Colors, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import head from 'lodash/head';
import { useNavigation } from '@react-navigation/native';

import { UIText, UIView } from 'components/UIKit';

import { COUNTRIES } from 'src/constants';
import { CountryCodeType } from 'modules/auth/types';
import { UITouchableOpacity } from 'components/UIKit/UITouchableOpacity';

export const CountryPicker: FC = ({ phoneCode }) => {
  const { navigate } = useNavigation();
  const {
    countrySource,
    countryCode,
    countryPhoneCode,
    countryName = 'Country',
  }: CountryCodeType = head(COUNTRIES.filter(({ countryPhoneCode }) => countryPhoneCode === phoneCode)) || {};

  return (
    <UITouchableOpacity row centerV onPress={() => navigate('CountyCodeList')} style={styles.container}>
      {countrySource && (
        <UIView marginR-10 style={styles.imageContainer}>
          <Image source={{ uri: countrySource }} style={styles.image} />
        </UIView>
      )}

      <UIText bodyM3 color={Colors.primary}>
        {countryName}
      </UIText>
    </UITouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: Colors.grey40,
  },
  imageContainer: {
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
    shadowRadius: 2,
    shadowColor: '#000',
    elevation: 4,
    width: 20,
    height: 12,
  },
  image: {
    width: 20,
    height: 12,
  },
});
