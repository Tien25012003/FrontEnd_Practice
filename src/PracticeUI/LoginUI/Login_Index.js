import { View, Text, TextInput, KeyboardAvoidingView, Dimensions, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, {
    withTiming,
    useSharedValue,
    useAnimatedStyle,
    runOnJS,
    FadeInDown,
    useAnimatedGestureHandler,
    withSpring,
    useAnimatedProps,
    useDerivedValue,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGesture, PanGestureHandler } from "react-native-gesture-handler";
import Svg, { Defs, Mask, Path, Rect, LinearGradient, Stop } from "react-native-svg"
const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const Login_Index = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isFinish, setIsFinish] = useState(false);
    const [on, setOn] = useState(false);
    const textInputAnimatedValue = useSharedValue(HEIGHT_SCREEN * 0.8);
    const panY = useSharedValue(0);
    const pressed = useSharedValue(false);
    const colorChangeY = useSharedValue(0);
    const textInputAnimatedStyle = useAnimatedStyle(() => {
        return {
            height: textInputAnimatedValue.value,
        };
    });
    const upDateFinish = () => {
        setIsFinish(true);
    };
    useEffect(() => {
        textInputAnimatedValue.value = withTiming(50, { duration: 1000 }, (finished) => {
            if (finished) {
                runOnJS(upDateFinish)();
            };
        });
    }, []);

    useEffect(() => {
        //console.log(pressed.value);
        //console.log(on);
        if (on === true) {
            colorChangeY.value = withTiming(1, { duration: 100 });
        } else {
            //colorChangeY.value = 0;
            colorChangeY.value = withTiming(0, { duration: 100 });
        }
    }, [on])

    const panGestureHandler = useAnimatedGestureHandler({
        onStart: (e, ctx) => {
            ctx.transY = panY.value;
            //pressed.value = false;
        },
        onActive: (e, ctx) => {
            if (ctx.transY + e.translationY < ctx.transY) {
                panY.value = ctx.transY;
            } else if (ctx.transY + e.translationY >= ctx.transY && ctx.transY + e.translationY <= 40) {
                panY.value = ctx.transY + e.translationY;
            } else if (ctx.transY + e.translationY > 40) {
                panY.value = 40;
            }
            //panY.value = ctx.transY + e.translationY;
        },
        onEnd: (e, ctx) => {
            panY.value = withSpring(0);
            //pressed.value = true;
            pressed.value = !pressed.value;
            //console.log(pressed.value);
            //panY.value = 0;
            //panY.value = ctx.tranY + e.translationY
        },
    });

    const receiveValue = (value) => {
        setOn(value);
    }
    useDerivedValue(() => {
        runOnJS(receiveValue)(pressed.value);
    })

    const panAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: panY.value,
                }
            ],
        };
    });
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);
    const AnimatedRect = Animated.createAnimatedComponent(Rect);
    const rectAnimatedProps = useAnimatedProps(() => {
        return {
            //height: colorChangeY.value,
            height: `${colorChangeY.value * 100}%`,
        };
    });
    return (
        <GestureHandlerRootView
            style={{
                flex: 1,
            }}>
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    backgroundColor: 'hsl(180,7%,6%)',
                    //alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: WIDTH_SCREEN * 0.6,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        //borderWidth: 1,
                        //borderColor: '#fff',
                        height: 60,
                        zIndex: 99,
                    }}>
                    <PanGestureHandler onGestureEvent={panGestureHandler}>
                        <Animated.View
                            style={panAnimatedStyle}>
                            <Animated.View
                                style={{
                                    height: 200,
                                    width: 2,
                                    backgroundColor: '#fff',
                                    alignSelf: 'center',
                                }}
                            />
                            <Animated.View
                                style={{
                                    height: 20,
                                    width: 20,
                                    backgroundColor: '#fff',
                                    borderRadius: 100,
                                    alignSelf: 'center',
                                }}
                            />
                        </Animated.View>
                    </PanGestureHandler>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        //borderColor: '#fff',
                        //borderWidth: 1,
                        //backgroundColor: 'yellow',
                        height: HEIGHT_SCREEN * 0.4,
                        zIndex: 1,
                        width: WIDTH_SCREEN,
                    }}>
                    <AnimatedSvg width={WIDTH_SCREEN} height={WIDTH_SCREEN} viewBox={`20 0  ${WIDTH_SCREEN / 2} ${WIDTH_SCREEN / 2}`} >
                        <Defs>
                            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0%" stopColor="hsl(0,0%,40%)" stopOpacity="1" />
                                <Stop offset="100%" stopColor="hsl(180,7%,6%)" stopOpacity="1" />
                            </LinearGradient>
                            <Mask id="mask">
                                <AnimatedRect
                                    //height={"100%"}
                                    fill={"#fff"}
                                    width={"100%"}
                                    animatedProps={rectAnimatedProps}
                                />
                            </Mask>
                        </Defs>
                        <Path
                            fill="url(#grad)"
                            d="M 44 144 L 96 7 L 135 7 L 186 144 L 44 144"
                            mask="url(#mask)"
                        />
                    </AnimatedSvg>
                </View>

                <View
                    style={{
                        paddingHorizontal: 30,
                        zIndex: 99,
                    }}>
                    <AnimatedTextInput
                        style={[{
                            borderWidth: 2,
                            borderColor: '#fff',
                            width: '100%',
                            borderRadius: 200,
                            paddingHorizontal: 20,
                            color: '#fff',
                            height: 55,
                            zIndex: 99,
                            fontWeight: '500',
                        },
                            textInputAnimatedStyle,
                        ]}
                        value={name}
                        onChangeText={setName}

                    />
                    {isFinish ? (
                        <Animated.View
                            entering={FadeInDown}>
                            <TextInput
                                style={{
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    width: '100%',
                                    borderRadius: 30,
                                    paddingHorizontal: 20,
                                    color: '#fff',
                                    marginTop: 20,
                                    height: 55,
                                    zIndex: 99,
                                    fontWeight: '500',
                                }}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        alignSelf: 'center',
                                        color: '#fff',
                                        fontSize: 20,
                                        fontWeight: '600',
                                        letterSpacing: 2,
                                        marginTop: 20,
                                    }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ) : (null)}

                </View>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

export default Login_Index;
