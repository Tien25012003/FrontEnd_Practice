import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Switch,
} from 'react-native';
import React, {useReducer, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  interpolate,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import Svg, {LinearGradient, Rect, Defs, Stop} from 'react-native-svg';
import Fontisto from 'react-native-vector-icons/Fontisto';
const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('screen');
const ALARM_DATA = [
  {
    id: 0,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: true,
  },
  {
    id: 1,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 2,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 3,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 4,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 5,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 6,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 7,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 8,
    time: '07 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
  {
    id: 9,
    time: '08 : 00',
    date: 'T.4 12 Th4',
    status: false,
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case 'ON':
      return state.map((item, index) => {
        if (index === action.index) {
          return {...item, status: !item.status};
        } else {
          return item;
        }
      });
    default:
      break;
  }
};
const FunnyScroll = () => {
  const [state, dispatch] = useReducer(reducer, ALARM_DATA);
  const [isScroll, setIsScroll] = useState(false);
  const transY = useSharedValue(HEIGHT_SCREEN * 0.3);
  const onSwicth = index => {
    dispatch({type: 'ON', index: index});
  };

  const panHandler = useAnimatedGestureHandler({
    // onActive: (e, ctx) => {
    //   //console.log(e.translationY);
    //   if (e.translationY < 0) {
    //     transY.value = withTiming(0);
    //   } else {
    //     transY.value = withTiming(1);
    //   }
    // },
    onStart: (e, ctx) => {
      ctx.startY = transY.value;
    },
    onActive: (e, ctx) => {
      if (e.translationY + ctx.startY < 0) {
        transY.value = withTiming(0);
      } else if (e.translationY + ctx.startY > HEIGHT_SCREEN * 0.3) {
        transY.value = withTiming(HEIGHT_SCREEN * 0.3);
      } else {
        transY.value = ctx.startY + e.translationY;
      }
    },
    onEnd: (e, ctx) => {
      if (e.translationY < 0) {
        transY.value = withTiming(0);
      } else {
        transY.value = withTiming(HEIGHT_SCREEN * 0.3);
      }
    },
  });
  const yAxisAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          //   translateY: interpolate(
          //     transY.value,
          //     [0, 1],
          //     [0, HEIGHT_SCREEN * 0.3],
          //   ),
          translateY: transY.value,
        },
      ],
    };
  });
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(transY.value, [0, HEIGHT_SCREEN * 0.3], [0, 1]),
      transform: [
        {
          translateY: interpolate(
            transY.value,
            [0, HEIGHT_SCREEN * 0.3],
            [-50, 30],
          ),
        },
      ],
    };
  });
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(transY.value, [0, HEIGHT_SCREEN * 0.3], [1, 0]),
    };
  });
  const receiveValue = value => {
    //console.log('y', value);
    if (value === 0) {
      setIsScroll(true);
    } else if (value === HEIGHT_SCREEN * 0.3) {
      setIsScroll(false);
    }
  };
  useDerivedValue(() => {
    runOnJS(receiveValue)(transY.value);
  });
  const onScroll = e => {
    if (e.nativeEvent.contentOffset.y === 0 && transY.value === 0) {
      //console.log(transY.value);
      transY.value = withTiming(HEIGHT_SCREEN * 0.3);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: '#fff',
      }}>
      <View
        style={{
          height: HEIGHT_SCREEN * 0.3,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 80,
          position: 'absolute',
          top: 0,
          width: '100%',
        }}>
        <Animated.Text
          style={[styles.text, {textAlign: 'center'}, textAnimatedStyle]}>
          Tất cả chuông báo đều tắt
        </Animated.Text>
      </View>
      <GestureHandlerRootView style={{flex: 1}}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: 'hsl(0,0%,95%)',
                //   transform: [
                //     {
                //       translateY: HEIGHT_SCREEN * 0.3,
                //       //translateY: 0,
                //     },
                //   ],
              },
              yAxisAnimatedStyle,
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 15,
                backgroundColor: '#fff',
                //borderWidth: 1,
                paddingTop: 50,
              }}>
              <Animated.Text
                style={[styles.text, {fontSize: 22}, titleAnimatedStyle]}>
                Chuông báo
              </Animated.Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Pressable>
                  <Entypo name="plus" size={20} color="#000" />
                </Pressable>
                <Pressable>
                  <Entypo
                    name="dots-three-vertical"
                    size={18}
                    color="#000"
                    style={{marginLeft: 10}}
                  />
                </Pressable>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'hsl(0,0%,95%)',
              }}>
              <ScrollView scrollEnabled={isScroll} onScroll={onScroll}>
                {/*  */}
                <View
                  style={{
                    alignSelf: 'center',
                    width: WIDTH_SCREEN - 20,
                    marginVertical: 5,
                    borderRadius: 5,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    //height: 100,
                    //borderWidth: 1,
                  }}>
                  <View style={{position: 'absolute'}}>
                    <Svg width={WIDTH_SCREEN - 20} height={100}>
                      <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                          <Stop
                            offset="0"
                            stopColor="hsl(0,0%,70%)"
                            stopOpacity="1"
                          />
                          <Stop offset="0.6" stopColor="#000" stopOpacity="1" />
                        </LinearGradient>
                      </Defs>
                      <Rect
                        x="0"
                        y="0"
                        rx="14"
                        ry="14"
                        width={WIDTH_SCREEN - 20}
                        height={100}
                        fill="url(#grad)"
                      />
                    </Svg>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Fontisto
                        name="bed-patient"
                        size={20}
                        color="hsl(0,0%,50%)"
                      />
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          fontWeight: '400',
                          marginLeft: 10,
                        }}>
                        22:00
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: '#000',
                        fontSize: 25,
                        fontWeight: '400',
                      }}>
                      07 : 00
                    </Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: '400',
                        marginLeft: 10,
                        marginRight: 20,
                      }}>
                      Giữ cho điện thoại của bạn luôn yên lặng và có một đêm
                      ngon giấc với chế độ Ngủ
                    </Text>
                  </View>
                </View>
                {state.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        alignSelf: 'center',
                        width: WIDTH_SCREEN - 20,
                        backgroundColor: '#fff',
                        marginVertical: 5,
                        borderRadius: 5,
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: 25,
                          fontWeight: '350',
                          color: 'grey',
                        }}>
                        {item.time}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: '350',
                            color: 'grey',
                            marginRight: 20,
                          }}>
                          {item.date}
                        </Text>
                        <Switch
                          trackColor={{false: '#767577', true: '#7264F0'}}
                          thumbColor={'#f4f3f4'}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() => onSwicth(index)}
                          value={item.status}
                        />
                        {/* <Button title="press" onPress={() => onActive(index)} /> */}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: '500',
  },
});
export default FunnyScroll;
