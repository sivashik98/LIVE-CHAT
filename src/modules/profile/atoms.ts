import { atom } from 'jotai';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

export const scrollOffsetAtom = atom<SharedValue | undefined>(undefined);
export const shouldExpandAtom = atom<SharedValue | undefined>(undefined);
export const shouldCollapseAtom = atom<SharedValue | undefined>(undefined);
export const isScrollingAtom = atom<SharedValue | undefined>(undefined);
