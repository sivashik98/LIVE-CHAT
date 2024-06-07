import { FC } from 'react';
import { shareAsync } from 'expo-sharing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib';

import { UIView } from 'components/UIKit';
import { UIText } from 'components/UIKit';
import { ButtonWithIcon } from 'components/Buttons/ButtonWithIcon';

import { uiPaddingHorizontal } from 'components/UIKit/styles';
import { ImageViewerBottomToolsProps } from 'modules/photo/components/ImageViewerBottomTools/types';
import { isIOS } from 'src/constants';

export const ImageViewerBottomTools: FC<ImageViewerBottomToolsProps> = ({ shareUrl, ...props }) => {
  const { bottom } = useSafeAreaInsets();

  const onShare = async () => {
    if (shareUrl) await shareAsync(shareUrl);
  };

  return (
    <UIView row center absB absH style={[{ bottom: isIOS ? bottom : 10, zIndex: 1 }, uiPaddingHorizontal]} {...props}>
      <UIView flex left>
        <ButtonWithIcon Icon={Ionicons} name={'arrow-redo-outline'} size={24} color={Colors.white} onPress={onShare} />
      </UIView>

      <UIView flex center>
        <UIText bodyM4 color={Colors.white}>
          Макс
        </UIText>
        <UIText bodyM4 color={Colors.white}>
          08.10.23
        </UIText>
      </UIView>

      <UIView flex right>
        <ButtonWithIcon Icon={FontAwesome} name={'trash-o'} size={24} color={Colors.white} onPress={() => alert('DELETE')} />
      </UIView>
    </UIView>
  );
};
