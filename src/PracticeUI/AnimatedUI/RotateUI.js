import {View, Text, Dimensions, Image, Button} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import Animated, {
  useSharedValue,
  withSpring,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
const url =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ2Vti41k_S7Co_WNKDT0z9ExyU_Zl3-jZ0Q&usqp=CAU';
const RotateUI = () => {
  const [toggle, setToggle] = useState(false);
  const isToggle = useSharedValue(0);
  useEffect(() => {
    isToggle.value = toggle ? 1 : 0;
  }, [isToggle, toggle]);
  const transition = useDerivedValue(() => {
    return withSpring(isToggle.value);
  });
  const mix = (value, x, y) => {
    'worklet'; // javascript function run on UI
    return x * (1 - value) + y * value;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
      <View style={{width: WIDTH, marginHorizontal: 50, height: 180}}>
        {[...new Array(3)].map((card, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const rotate = mix(transition.value, 0, (index - 1) * 30);
            return {
              transform: [
                {translateX: -150},
                {rotate: `${rotate}deg`},
                {translateX: 150},
              ],
            };
          });
          return (
            <Animated.View
              style={[{position: 'absolute'}, animatedStyle]}
              key={index}>
              <Image
                style={{
                  width: 300,
                  height: 180,
                  borderRadius: 20,
                }}
                source={{uri: url}}
                resizeMode="contain"
              />
            </Animated.View>
          );
        })}
      </View>
      <View
        style={{
          marginTop: 100,
        }}>
        <Button title="Toggle" onPress={() => setToggle(!toggle)} />
      </View>
    </View>
  );
};

export default RotateUI;
