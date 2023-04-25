import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {interpolate} from 'react-native-reanimated';
const PhoneRing = () => {
  const animatedValue = [...new Array(3)].map(
    (_, i) => useRef(new Animated.Value(0)).current,
  );

  useEffect(() => {
    const animations = animatedValue.map((item, index) => {
      return Animated.timing(animatedValue[index], {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      });
    });
    Animated.loop(Animated.stagger(500, animations)).start();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: '#3FBFF9',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {[...new Array(3)].map((_, index) => {
          const scale = animatedValue[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 4],
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
                transform: [{scale: scale}],
                opacity,
              }}
              key={index}
            />
          );
        })}
        <Feather name="phone-call" size={30} color="#fff" />
      </View>
    </View>
  );
};

export default PhoneRing;
