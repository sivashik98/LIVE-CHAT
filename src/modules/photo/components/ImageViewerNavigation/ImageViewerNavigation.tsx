import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';

import { UITouchableOpacity, UIView } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { ButtonWithIcon } from 'components/Buttons/ButtonWithIcon';

import { uiPaddingHorizontal } from 'components/UIKit/styles';
import { ImageViewerNavigationProps } from 'modules/photo/components/ImageViewerNavigation/types';
import { isIOS } from 'src/constants';

export const ImageViewerNavigation: FC<ImageViewerNavigationProps> = ({ currentPage, allPages = 1, ...props }) => {
  const { goBack } = useNavigation();
  const { top } = useSafeAreaInsets();

  return (
    <UIView row absT absH style={[{ top: isIOS ? top : 40, zIndex: 1 }, uiPaddingHorizontal]} {...props}>
      <UIView flex left>
        <ButtonWithIcon Icon={MaterialIcons} name={'arrow-back-ios'} size={22} color={Colors.white} onPress={goBack}>
          <UIText bodyM3 color={Colors.white}>
            Back
          </UIText>
        </ButtonWithIcon>
      </UIView>
      <UIView flex center>
        <UIText bodyM3 color={Colors.white}>
          {currentPage} of {allPages}
        </UIText>
      </UIView>
      <UITouchableOpacity flex right onPress={() => alert('EDIT')}>
        <UIText bodyM3 color={Colors.white}>
          Edit
        </UIText>
      </UITouchableOpacity>
    </UIView>
  );
};
