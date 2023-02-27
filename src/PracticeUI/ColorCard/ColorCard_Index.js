import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { BLACK_COLORS, GREEN_COLORS, BLUE_COLORS, PURPLE_COLORS, PINK_COLORS, ORANGE_COLORS } from "./ColorData";
import Animated, {
    withTiming,
    useAnimatedStyle,
    useSharedValue,
    interpolate,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const BAR_HEIGHT = HEIGHT_SCREEN * 0.6;
const CONTAINER_HEIGHT = HEIGHT_SCREEN * 0.4;
const ColorCard_Index = () => {
    const [colorSelected, setColorSelected] = useState('hsl(0,0%,20%)');
    const [onActive, setOnActive] = useState(false);
    const rotateAnimatedValue = useSharedValue(0);

    const blackAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(rotateAnimatedValue.value, [-BAR_HEIGHT, 0, BAR_HEIGHT], [-90, 0, 90])}deg`
            }],
        };
    });
    const greenAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(rotateAnimatedValue.value, [-BAR_HEIGHT, 0, BAR_HEIGHT], [-72, 0, 72])}deg`
            }],
        };
    });
    const blueAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(rotateAnimatedValue.value, [-BAR_HEIGHT, 0, BAR_HEIGHT], [-54, 0, 54])}deg`
            }],
        };
    });
    const purpleAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(rotateAnimatedValue.value, [-BAR_HEIGHT, 0, BAR_HEIGHT], [-36, 0, 36])}deg`
            }],
        };
    });
    const pinkAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(rotateAnimatedValue.value, [-BAR_HEIGHT, 0, BAR_HEIGHT], [-18, 0, 18])}deg`
            }],
        };
    });
    const panHandler = useAnimatedGestureHandler({

        onActive: (e, ctx) => {
            rotateAnimatedValue.value = withTiming(e.translationX);
        },
        onEnd: (e, ctx) => {
            if (e.translationX > 0) {
                rotateAnimatedValue.value = withSpring(BAR_HEIGHT);
            } else {
                rotateAnimatedValue.value = withTiming(0);
            }
        },
    });
    useEffect(() => {
        if (onActive === true) {
            rotateAnimatedValue.value = withSpring(BAR_HEIGHT);
        } else if (onActive === false) {
            rotateAnimatedValue.value = withTiming(0);
        }

    }, [onActive]);
    //console.log('HEIGHT: ' + CONTAINER_HEIGHT);
    //console.log('WIDTH: ' + WIDTH_SCREEN);
    return (
        <GestureHandlerRootView
            style={{
                flex: 1,
            }}>

            <View
                style={{
                    backgroundColor: colorSelected,
                    flex: 1,
                    paddingTop: 40,
                }}>
                <Text
                    style={{
                        color: '#fff',
                    }}>
                    ColorCard_Index
                </Text>

            </View>


            <PanGestureHandler onGestureEvent={panHandler}>
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: WIDTH_SCREEN,
                        //borderWidth: 1,
                        //borderColor: 'blue',
                        height: HEIGHT_SCREEN * 0.4,
                    }}>
                    {/* Animated View Black */}
                    <Animated.View
                        style={[{
                            width: 60,
                            height: HEIGHT_SCREEN * 0.6,
                            //borderWidth: 1,
                            //borderColor: '#fff',
                            position: 'absolute',
                            top: 30,
                            left: 30,
                            zIndex: 7,
                        },
                            blackAnimatedStyle,
                        ]}>
                        <View
                            style={{
                                width: 60,
                                height: BAR_HEIGHT * 0.55,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                //justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            {BLACK_COLORS.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{
                                            width: 50,
                                            backgroundColor: item,
                                            height: BAR_HEIGHT * 0.5 * 0.25,
                                            marginVertical: 3,
                                            borderTopLeftRadius: index === 0 ? 20 : 10,
                                            borderTopRightRadius: index === 0 ? 20 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}
                                        key={index}
                                        onPress={() => setColorSelected(item)}>
                                    </Pressable>
                                )
                            })}
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 10,
                                    borderWidth: 1,
                                    borderColor: '#000',
                                    borderRadius: 20,
                                }}>
                                <Pressable
                                    style={{
                                        height: 20,
                                        width: 20,
                                        borderWidth: 3,
                                        borderColor: '#fff',
                                        borderRadius: 100,
                                        backgroundColor: '#000'
                                    }}
                                    onPress={() => setOnActive(!onActive)}
                                />
                            </View>
                        </View>
                    </Animated.View>

                    {/* Animated View Green */}
                    <Animated.View
                        style={[{
                            width: 60,
                            height: HEIGHT_SCREEN * 0.6,
                            //borderWidth: 1,
                            //borderColor: '#fff',
                            position: 'absolute',
                            top: 30,
                            zIndex: 6,
                            left: 30,
                        },
                            greenAnimatedStyle,
                        ]}>
                        <View
                            style={{
                                width: 60,
                                height: BAR_HEIGHT * 0.55,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                //justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            {GREEN_COLORS.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{
                                            width: 50,
                                            backgroundColor: item,
                                            height: BAR_HEIGHT * 0.5 * 0.25,
                                            marginVertical: 3,
                                            borderTopLeftRadius: index === 0 ? 20 : 10,
                                            borderTopRightRadius: index === 0 ? 20 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}
                                        key={index}
                                        onPress={() => setColorSelected(item)}>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </Animated.View>
                    {/* Animated View Blue*/}
                    <Animated.View
                        style={[{
                            width: 60,
                            height: HEIGHT_SCREEN * 0.6,
                            //borderWidth: 1,
                            //borderColor: '#fff',
                            position: 'absolute',
                            top: 30,
                            zIndex: 5,
                            left: 30,
                        },
                            blueAnimatedStyle,
                        ]}>
                        <View
                            style={{
                                width: 60,
                                height: BAR_HEIGHT * 0.55,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                //justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            {BLUE_COLORS.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{
                                            width: 50,
                                            backgroundColor: item,
                                            height: BAR_HEIGHT * 0.5 * 0.25,
                                            marginVertical: 3,
                                            borderTopLeftRadius: index === 0 ? 20 : 10,
                                            borderTopRightRadius: index === 0 ? 20 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}
                                        key={index}
                                        onPress={() => setColorSelected(item)}>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </Animated.View>

                    {/* Animated View Purple*/}
                    <Animated.View
                        style={[{
                            width: 60,
                            height: HEIGHT_SCREEN * 0.6,
                            //borderWidth: 1,
                            //borderColor: '#fff',
                            position: 'absolute',
                            top: 30,
                            zIndex: 4,
                            left: 30,
                        },
                            purpleAnimatedStyle,
                        ]}>
                        <View
                            style={{
                                width: 60,
                                height: BAR_HEIGHT * 0.55,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                //justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            {PURPLE_COLORS.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{
                                            width: 50,
                                            backgroundColor: item,
                                            height: BAR_HEIGHT * 0.5 * 0.25,
                                            marginVertical: 3,
                                            borderTopLeftRadius: index === 0 ? 20 : 10,
                                            borderTopRightRadius: index === 0 ? 20 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}
                                        key={index}
                                        onPress={() => setColorSelected(item)}>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </Animated.View>
                    {/* Animated View Pink*/}
                    <Animated.View
                        style={[{
                            width: 60,
                            height: HEIGHT_SCREEN * 0.6,
                            //borderWidth: 1,
                            //borderColor: '#fff',
                            position: 'absolute',
                            top: 30,
                            zIndex: 3,
                            left: 30,
                        },
                            pinkAnimatedStyle,
                        ]}>
                        <View
                            style={{
                                width: 60,
                                height: BAR_HEIGHT * 0.55,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                //justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            {PINK_COLORS.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{
                                            width: 50,
                                            backgroundColor: item,
                                            height: BAR_HEIGHT * 0.5 * 0.25,
                                            marginVertical: 3,
                                            borderTopLeftRadius: index === 0 ? 20 : 10,
                                            borderTopRightRadius: index === 0 ? 20 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}
                                        key={index}
                                        onPress={() => setColorSelected(item)}>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </Animated.View>

                    {/* Animated View Orange*/}
                    <View
                        style={{
                            width: 60,
                            height: HEIGHT_SCREEN * 0.6,
                            //borderWidth: 1,
                            //borderColor: '#fff',
                            position: 'absolute',
                            top: 30,
                            zIndex: 2,
                            left: 30,
                        }}>
                        <View
                            style={{
                                width: 60,
                                height: BAR_HEIGHT * 0.55,
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                //justifyContent: 'center',
                                alignItems: 'center',

                            }}>
                            {ORANGE_COLORS.map((item, index) => {
                                return (
                                    <Pressable
                                        style={{
                                            width: 50,
                                            backgroundColor: item,
                                            height: BAR_HEIGHT * 0.5 * 0.25,
                                            marginVertical: 3,
                                            borderTopLeftRadius: index === 0 ? 20 : 10,
                                            borderTopRightRadius: index === 0 ? 20 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                        }}
                                        key={index}
                                        onPress={() => setColorSelected(item)}>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

export default ColorCard_Index;
