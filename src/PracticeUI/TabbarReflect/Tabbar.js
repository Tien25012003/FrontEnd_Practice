import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {withTiming} from 'react-native-reanimated';
import React from 'react';
import {Svg, Defs, LinearGradient, Stop, Path} from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
const {width, height} = Dimensions.get('screen');
const SIZE = width / 5;
const R = SIZE / 4;
const COLOR = '#02CBD6';
const END_COLOR = '#00B4D4';
const WIDTH = 3.14 * SIZE;
const HEIGHT = 3.5 * SIZE;
const arc = (x, y, reverse = false) =>
  `a ${R} ${R} 0 0 ${reverse ? 0 : 1} ${x} ${y}`;
const W_2 = (WIDTH - SIZE) / 2 - 2 * R;
const S = SIZE - 2 * R;
const d = [
  `M 0 ${R}`,
  arc(R, -R),
  `H ${WIDTH - 2 * R}`,
  arc(R, R),
  `v ${HEIGHT - SIZE - 2 * R}`,
  arc(-R, R),
  `h ${-W_2}`,
  arc(-R, R, true),
  `v ${S}`,
  arc(-R, R),
  `h ${-S}`,
  arc(-R, -R),
  `v ${-S}`,
  arc(-R, -R, true),
  `h ${-W_2}`,
  arc(-R, -R),
  'Z',
].join('');
const Tabbar = ({open}) => {
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => (open.value = withTiming(open.value === 1 ? 0 : 1))}>
        <View>
          <View style={[styles.overlay]} pointerEvents="none">
            <Svg width={WIDTH} height={HEIGHT}>
              <Defs>
                <LinearGradient
                  id="gradient"
                  x1={WIDTH / 2}
                  y1={0}
                  x2={WIDTH / 2}
                  y2={HEIGHT}>
                  <Stop offset={0} stopColor={END_COLOR} />
                  <Stop offset={1} stopColor={COLOR} />
                </LinearGradient>
              </Defs>
              <Path d={d} fill="url(#gradient)" />
            </Svg>
          </View>
          <View style={[styles.overlay, {paddingBottom: 10}]}>
            <View style={styles.icon}>
              <View>
                <Feather name="x" color="#fff" size={32} />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: SIZE,
    height: SIZE,
    borderRadius: R,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: (Dimensions.get('window').width - WIDTH) / 2,
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
  },
  items: {
    height: HEIGHT - SIZE,
    justifyContent: 'space-evenly',
  },
});
export default Tabbar;
