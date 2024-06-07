import { UIViewProps } from 'components/UIKit/UIView/types';

export type ImageViewerNavigationProps = {
  currentPage: number;
  allPages: number;
} & UIViewProps;
