import { ViewProps } from 'react-native-ui-lib';

export type UIViewProps = ViewProps;

export type UIStackProps = {
  children: (JSX.Element | null | undefined | boolean | '')[];
  gap: number;
  direction?: 'row' | 'column';
  wrap?: boolean;
} & ViewProps;
