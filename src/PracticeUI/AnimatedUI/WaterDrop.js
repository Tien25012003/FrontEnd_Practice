import {View, Animated, Text, Dimensions, Easing} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Svg, Path} from 'react-native-svg';
import {useState} from 'react';
const {width, height} = Dimensions.get('screen');
const WaterDrop = () => {
  const animatedValue = [...new Array(3)].map(
    (_, i) => useRef(new Animated.Value(0)).current,
  );
  const dropValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const DropAnimated = Animated.timing(dropValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.ease,
    });
    const WaterAnimated = animatedValue.map((_, i) => {
      return Animated.timing(animatedValue[i], {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      });
    });

    Animated.loop(
      Animated.sequence([DropAnimated, Animated.stagger(500, WaterAnimated)]),
    ).start();

    // Animated.sequence([
    //   DropAnimated,
    //   Animated.stagger(500, WaterAnimated),
    // ]).start();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          transform: [
            {
              translateY: dropValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, height / 2],
              }),
            },
          ],
          opacity: dropValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}>
        <Svg width={width / 4} height={100}>
          <Path
            d="M 11.5 16.5 C 10.1193 16.5 9 15.3807 9 14 M 5 14 C 5 10.5817 7.5817 6 12 0 C 16.4183 6 19 10.5817 19 14 C 19 18.4183 15.4183 21 12 21 C 8.5817 21 5 18.4183 5 14 Z"
            strokeWidth="1"
            fill={'#3FBFF9'}
            scale={1.5}
            transform={[{translateX: 20}]}
          />
        </Svg>
      </Animated.View>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: '#3FBFF9',
          transform: [{scaleX: 1.3}, {scaleY: -0.2}],
        }}
      />
      {[...new Array(3)].map((_, index) => {
        const scaleX = animatedValue[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1.3, 3.5],
        });
        const scaleY = animatedValue[index].interpolate({
          inputRange: [0, 1],
          outputRange: [-0.2, -0.5],
        });
        const opacity = animatedValue[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        });
        return (
          <Animated.View
            style={{
              position: 'absolute',
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: '#3FBFF9',
              transform: [{scaleX}, {scaleY}],
              opacity,
            }}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default WaterDrop;
