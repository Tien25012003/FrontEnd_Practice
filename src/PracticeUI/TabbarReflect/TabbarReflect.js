import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import Tabbar from './Tabbar';
const TabbarReflect = () => {
  const open = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: 'grey',
      opacity: 0.6 * open.value,
    };
  });
  const animatedProps = useAnimatedProps(() => ({
    pointerEvents: open.value < 1 ? 'none' : 'box-none',
  }));
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Animated.View
        style={[StyleSheet.absoluteFill, animatedStyle]}
        animatedProps={animatedProps}>
        <Pressable style={StyleSheet.absoluteFill} />
      </Animated.View>
      <Tabbar />
    </View>
  );
};
export default TabbarReflect;
