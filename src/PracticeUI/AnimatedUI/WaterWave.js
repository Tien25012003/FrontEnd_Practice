import {View, Text, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import Animated, {
  useDerivedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import {repeat} from 'core-js/core/string';
import MaskedView from '@react-native-community/masked-view';
const SIZE = Dimensions.get('window').width - 64;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const WaterWave = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
  }, [progress]);
  const data = useDerivedValue(() => {
    return {
      from: {
        x: interpolate(progress.value, [0, 1], [-0.1, -0.1]),
        y: interpolate(progress.value, [0, 1], [0.3, 0.7]),
      },
      c1: {
        x: interpolate(progress.value, [0, 1], [0.5, 0.5]),
        y: interpolate(progress.value, [0, 1], [0.3, 0.7]),
      },
      c2: {
        x: interpolate(progress.value, [0, 1], [0.5, 0.5]),
        y: interpolate(progress.value, [0, 1], [0.7, 0.3]),
      },
      to: {
        x: interpolate(progress.value, [0, 1], [1.1, 1.1]),
        y: interpolate(progress.value, [0, 1], [0.7, 0.3]),
      },
    };
  });
  const path = useAnimatedProps(() => {
    const {from, c1, c2, to} = data.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });
  const path1 = useAnimatedProps(() => {
    const {from, c1, c2, to} = {
      from: {
        x: interpolate(1 - progress.value, [0, 1], [-0.1, -0.1]),
        y: interpolate(1 - progress.value, [0, 1], [0.3, 0.7]),
      },
      c1: {
        x: interpolate(1 - progress.value, [0, 1], [0.5, 0.5]),
        y: interpolate(1 - progress.value, [0, 1], [0.3, 0.7]),
      },
      c2: {
        x: interpolate(1 - progress.value, [0, 1], [0.5, 0.5]),
        y: interpolate(1 - progress.value, [0, 1], [0.7, 0.3]),
      },
      to: {
        x: interpolate(1 - progress.value, [0, 1], [1.1, 1.1]),
        y: interpolate(1 - progress.value, [0, 1], [0.7, 0.3]),
      },
    };
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });
  const from = useAnimatedProps(() => {
    const {x, y} = data.value.from;
    return {
      cx: x,
      cy: y,
    };
  });
  const to = useAnimatedProps(() => {
    const {x, y} = data.value.to;
    return {
      cx: x,
      cy: y,
    };
  });
  const c1 = useAnimatedProps(() => {
    const {x, y} = data.value.c1;
    return {
      cx: x,
      cy: y,
    };
  });
  const c2 = useAnimatedProps(() => {
    const {x, y} = data.value.c2;
    return {
      cx: x,
      cy: y,
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <MaskedView
        maskElement={
          <View
            style={{
              backgroundColor: '#000',
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
            }}
          />
        }>
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 1 1"
          style={{backgroundColor: '#242424'}}>
          <AnimatedPath animatedProps={path1} fill="#86b4ff" />
          <AnimatedPath animatedProps={path} fill="#0804f1" />
          {/* <AnimatedCircle r={0.05} fill="blue" animatedProps={from} />
        <AnimatedCircle r={0.05} fill="red" animatedProps={c1} />
        <AnimatedCircle r={0.05} fill="red" animatedProps={c2} />
        <AnimatedCircle r={0.05} fill="blue" animatedProps={to} /> */}
        </Svg>
      </MaskedView>
    </View>
  );
};

export default WaterWave;
