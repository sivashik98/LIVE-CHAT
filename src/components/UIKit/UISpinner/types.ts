import { UIViewProps } from 'components/UIKit/UIView/types';

export type UISpinnerProps = {
  shouldShow: boolean;
  color?: string;
  size?: 'small' | 'large';
} & UIViewProps;
