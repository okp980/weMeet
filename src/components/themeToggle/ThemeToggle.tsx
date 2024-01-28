import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../customText/CustomText';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {};

const ThemeToggle = (props: Props) => {
  const offset = useSharedValue(0);
  const {width} = Dimensions.get('screen');
  const LAYOUT_PADDING = 20;
  const TOGGLE_CONTAINER_PADDING = 8;
  const TOGGLE_CONTAINER_WIDTH = width - LAYOUT_PADDING * 2;
  const ACTIVE_BUTTON_WIDTH = Math.round(TOGGLE_CONTAINER_WIDTH / 3);

  const [theme, setTheme] = useState('light');

  const animatedStyles = useAnimatedStyle(() => {
    const translateX =
      theme === 'light'
        ? offset.value * ACTIVE_BUTTON_WIDTH + TOGGLE_CONTAINER_PADDING
        : theme === 'dark'
        ? offset.value * ACTIVE_BUTTON_WIDTH
        : theme === 'system'
        ? offset.value * ACTIVE_BUTTON_WIDTH - TOGGLE_CONTAINER_PADDING
        : offset.value * ACTIVE_BUTTON_WIDTH;
    return {
      transform: [{translateX: withTiming(translateX, {duration: 500})}],
    };
  });
  const handlePress = (type: string, index: number) => {
    setTheme(type);
    offset.value = index;
  };
  return (
    <View
      className="flex-row mt-4 h-14 rounded-md items-center bg-gray-300 p-2 relative"
      style={{width: TOGGLE_CONTAINER_WIDTH}}>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('light', 0)}>
        <CustomText as="regular">Light</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('dark', 1)}>
        <CustomText as="regular">Dark</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 items-center"
        onPress={() => handlePress('system', 2)}>
        <CustomText as="regular">System</CustomText>
      </TouchableOpacity>
      <Animated.View
        style={[
          {
            backgroundColor: 'white',
            width: ACTIVE_BUTTON_WIDTH,
            position: 'absolute',
            borderRadius: 6,
            top: 8,
            bottom: 8,
            zIndex: -1,
            transform: [
              {translateX: ACTIVE_BUTTON_WIDTH * 0 + TOGGLE_CONTAINER_PADDING},
            ],
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export default ThemeToggle;
