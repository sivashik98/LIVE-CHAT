import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Colors } from 'react-native-ui-lib';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIView } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { UITextFieldSearch } from 'components/UIKit/UITextField';
import { CountryCodeItem, CountryCodeTitleSection } from 'modules/auth/components/CountryCodeItem';
import { UITouchableOpacity } from 'components/UIKit/UITouchableOpacity';

import { uiPaddingHorizontal, uiScreenPaddings } from 'components/UIKit/styles';
import { CountryCodeType } from 'modules/auth/types';
import { countryCodeSectionItems } from 'modules/auth/utils';
import { useSearchCountryItem } from 'modules/auth/hooks/useSearchCountryItem';

const stickyHeaderIndices = countryCodeSectionItems
  .map((item: CountryCodeType | string, index) => (typeof item === 'string' ? index : null))
  .filter((item) => item !== null) as number[];
const keyExtractor = (item: CountryCodeType | string) => (typeof item === 'string' ? item : item.countryName);
const getItemType = (item: CountryCodeType | string) => (typeof item === 'string' ? 'sectionHeader' : 'row');

type HeaderProps = {
  searchValue: string;
  setSearchValue: () => void;
};
type ItemSeparatorComponentProps = {
  leadingItem: CountryCodeType | string;
  trailingItem: CountryCodeType | string;
};
type ItemProps = {
  item: CountryCodeType | string;
};

const Header = ({ searchValue, setSearchValue }: HeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <UIView row centerV backgroundColor={Colors.grey10} paddingV-10 style={uiScreenPaddings}>
      <UIView flex marginR-10>
        <UITextFieldSearch value={searchValue} onChangeText={setSearchValue} />
      </UIView>
      <UITouchableOpacity onPress={goBack}>
        <UIText bodyM3 color={Colors.primary}>
          Cancel
        </UIText>
      </UITouchableOpacity>
    </UIView>
  );
};
const ItemSeparatorComponent = ({ leadingItem, trailingItem }: ItemSeparatorComponentProps) => {
  if (typeof leadingItem === 'string' || typeof trailingItem === 'string') return null;
  return (
    <UIView style={uiPaddingHorizontal}>
      <UIView height={0.2} backgroundColor={Colors.grey40} />
    </UIView>
  );
};
const Item = ({ item }: ItemProps) => (typeof item === 'string' ? <CountryCodeTitleSection title={item} /> : <CountryCodeItem {...item} />);

export const CountyCodeListScreen = ({}) => {
  const { bottom } = useSafeAreaInsets();
  const { filteredData, searchValue, setSearchValue } = useSearchCountryItem();

  return (
    <UIView flex backgroundColor={Colors.white}>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <FlashList
        keyExtractor={keyExtractor}
        data={filteredData}
        renderItem={Item}
        estimatedItemSize={50}
        stickyHeaderIndices={searchValue ? undefined : stickyHeaderIndices}
        getItemType={getItemType}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{ paddingBottom: bottom || 40 }}
      />
    </UIView>
  );
};
