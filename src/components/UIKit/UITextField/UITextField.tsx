import { Colors, TouchableOpacity } from 'react-native-ui-lib';
import { TextField } from 'react-native-ui-lib';
import { FC, forwardRef, useEffect, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, TextInputFocusEventData } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming, interpolateColor } from 'react-native-reanimated';

// import ClearSVG from 'assets/svgComponents/Clear';

// import {ScrollEventEmitter} from 'utils';
import { UIText, UIView } from 'components/UIKit';
import { UITextFieldProps } from './types';
import { TextInputContentSizeChangeEventData } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { fill } from 'lodash';
import { isAndroid } from 'src/constants';

const DURATION = 500;
const INITIAL_MULTILINE_HEIGHT = 63;
const ERROR_COLOR = 'rgba(247, 29, 29, 1)';
const INPUT_COLOR = 'rgba(0, 21, 47, 0.06)';
const PLACEHOLDER_COLOR = 'rgba(125, 130, 135, 1)';
const TRANSPARENT = 'rgba(0, 0, 0, 0)';

export const UITextField: FC<UITextFieldProps> = forwardRef(
  ({ value, onChangeText, placeholder, onFocus, onBlur, inputStyle, containerStyle, ...props }, ref) => {
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(e);
    };
    const handleBlur = () => {
      (onBlur as any)?.();
    };

    return (
      <TextField
        ref={ref}
        containerStyle={[UITextFieldStyles.container, containerStyle]}
        fieldStyle={{ flexGrow: 1 }}
        style={[UITextFieldStyles.input, inputStyle]}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusable={false}
        selectionColor={'#426BF2'}
        value={value}
        placeholder={placeholder && placeholder.length > 25 ? placeholder.slice(0, 25) : placeholder}
        {...props}
      />
    );
  }
);

const UITextFieldStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    borderColor: Colors.grey40,
    padding: 8,
  },
  input: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'HelveticaNeue',
  },
});

const SearchIcon = () => (
  <UIView marginL-2>
    <EvilIcons name='search' size={isAndroid ? 26 : 22} color={Colors.grey80} />
  </UIView>
);
const ClearIcon = ({ styles, onPress }) => (
  <UIView reanimated center marginR-12 style={styles}>
    <TouchableOpacity onPress={onPress}>
      <AntDesign name='closecircle' size={16} color={Colors.grey80} />
    </TouchableOpacity>
  </UIView>
);

export const UITextFieldSearch: FC<
  UITextFieldProps & {
    error?: boolean;
    errorMessage?: string;
    autoHeight?: boolean;
  }
> = forwardRef(({ hint, error, value, onChangeText, placeholder, onFocus, onBlur, errorMessage, ...props }, ref) => {
  const border = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const clearOpacity = useSharedValue(0);
  const clearZIndex = useSharedValue(-1);
  const [focused, setFocused] = useState(false);
  const filled = value;

  const inputWrapStyles = useAnimatedStyle(() => ({
    borderWidth: withTiming(border.value ? 1 : 0),
    borderColor: withTiming(interpolateColor(border.value, [0, 1], [TRANSPARENT, ERROR_COLOR]), {
      duration: DURATION,
    }),
  }));
  const textStyles = useAnimatedStyle(() => ({
    opacity: withTiming(textOpacity.value, { duration: DURATION }),
  }));
  const clearStyles = useAnimatedStyle(() => ({
    opacity: withTiming(clearOpacity.value, { duration: DURATION }),
    zIndex: withTiming(clearZIndex.value, { duration: DURATION }),
  }));

  useEffect(() => {
    clearOpacity.value = value && focused ? 1 : 0;
    clearZIndex.value = value && focused ? 1 : -1;
  }, [value, focused, clearOpacity, clearZIndex]);

  useEffect(() => {
    if (error) {
      border.value = 1;
      textOpacity.value = 1;
    } else {
      border.value = 0;
      textOpacity.value = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = () => {
    setFocused(false);
    (onBlur as any)?.();
  };
  const handleClear = () => onChangeText?.('');

  return (
    <>
      <UIView row reanimated style={[UITextFieldSearchStyles.wrapInput, inputWrapStyles]}>
        <SearchIcon />
        <TextField
          ref={ref}
          containerStyle={[UITextFieldSearchStyles.container, filled && UITextFieldSearchStyles['container--filled']]}
          fieldStyle={{ flexGrow: 1 }}
          style={[UITextFieldSearchStyles.input]}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          focusable={false}
          selectionColor={'#426BF2'}
          value={value}
          placeholder={placeholder && placeholder.length > 25 ? placeholder.slice(0, 25) : placeholder}
          {...props}
        />
        {filled && <ClearIcon styles={clearStyles} onPress={handleClear} />}
      </UIView>

      {/*{errorMessage && (*/}
      {/*  <UIView reanimated style={[textStyles]}>*/}
      {/*    <UIView paddingV-4>*/}
      {/*      <UIText paddingV-4 bodyR3 color={ERROR_COLOR}>*/}
      {/*        {errorMessage}*/}
      {/*      </UIText>*/}
      {/*    </UIView>*/}
      {/*  </UIView>*/}
      {/*)}*/}
      {/*{hint && !errorMessage && (*/}
      {/*  <UIView paddingV-4>*/}
      {/*    <UIText bodyR3 color={'#BFC1C4FF'}>*/}
      {/*      {hint}*/}
      {/*    </UIText>*/}
      {/*  </UIView>*/}
      {/*)}*/}
    </>
  );
});

const UITextFieldSearchStyles = StyleSheet.create({
  wrapInput: {
    backgroundColor: INPUT_COLOR,
    borderRadius: 6,
    paddingVertical: 6,
  },
  container: {
    paddingRight: 8,
    paddingLeft: 4,
    flex: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: 'HelveticaNeue',
  },
});
