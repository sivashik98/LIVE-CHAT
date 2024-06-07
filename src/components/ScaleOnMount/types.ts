import { PropsWithChildren } from 'react';
import { StyleSheetProperties } from 'react-native';

import { UIViewProps } from 'components/UIKit/UIView/types';

export type ScaleOnMountPropsType = {
  children: PropsWithChildren;
  style?: StyleSheetProperties;
} & Partial<Omit<UIViewProps, 'style'>>;
