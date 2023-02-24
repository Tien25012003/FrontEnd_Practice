import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image, Pressable, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import GestureRecognizer from 'react-native-swipe-gestures';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    SlideInLeft,
    SlideInRight,
    interpolate,
    Extrapolate,
    Extrapolation,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import FOOD_DATA from "./FoodData";
const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");

const Food_Index = () => {
    //console.log(HEIGHT_SCREEN);
    const imageAnimatedValue = useSharedValue('0deg');
    //const imagePosition = useSharedValue(0);
    const [next, setNext] = useState(0);
    const [imagePosition, setImagePosition] = useState(0);
    const imageOpacity = useSharedValue(0);
    const [number, setNumber] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: imageAnimatedValue.value,
            }]
        };
    });
    useEffect(() => {
        imageAnimatedValue.value = withTiming(`${next}deg`, { duration: 500 });
        //imageOpacity.value = imagePosition;
        //console.log(imageOpacity.value);
        //console.log(imagePosition);
    }, [next]);

    const preAction = () => {
        if (imageOpacity.value <= 0) {
            imageOpacity.value = withTiming(FOOD_DATA.length - 1);
        } else {
            imageOpacity.value = withTiming(imageOpacity.value - 1);
        };

        if (imagePosition <= 0) {
            setImagePosition(FOOD_DATA.length - 1);
        } else {
            setImagePosition(imagePosition - 1);
        };
        setNext(next + 90);

    };
    //console.log(next);
    //console.log(imagePosition);
    const nextAction = () => {
        if (imageOpacity.value >= FOOD_DATA.length - 1) {
            imageOpacity.value = withTiming(0);
        } else {
            imageOpacity.value = withTiming(imageOpacity.value + 1);
        };

        if (imagePosition >= FOOD_DATA.length - 1) {
            setImagePosition(0);
        } else {
            setImagePosition(imagePosition + 1);
        };
        setNext(next - 90);

    };

    const reduceItem = () => {
        setNumber(number - 1);
        if (number <= 0) {
            setNumber(0);
        };
    };
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'flex-end',
            }}>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    height: HEIGHT_SCREEN * 0.4,
                    backgroundColor: '#fff',
                    width: WIDTH_SCREEN,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    zIndex: 1,
                }}>
                <View
                    style={{
                        height: HEIGHT_SCREEN * 0.8,
                        width: HEIGHT_SCREEN * 0.8,
                        borderRadius: HEIGHT_SCREEN,
                        backgroundColor: '#edd6d8',
                        //borderWidth: 1,
                        //borderColor: 'hsl(355,9%,78%)',
                        justifyContent: 'flex-end',
                    }}>
                    <Svg viewBox="-40 -170 210 210">
                        <Path
                            d="M7.094 11.59a5.91 5.91 0 0 1 .346-.466 3.484 3.484 0 0 1-.406-1.637A3.501 3.501 0 0 1 7.01 4.54a3.5 3.5 0 0 1 3.473-3.472A3.49 3.49 0 0 1 13 0c.943 0 1.799.373 2.428.98a3.504 3.504 0 0 1 3.521 3.5A3.572 3.572 0 0 1 20 7c0 .95-.379 1.813-.994 2.443V9.5A3.5 3.5 0 0 1 15.45 13c-.631.618-1.496 1-2.45 1-.96 0-1.83-.387-2.463-1.013a3.49 3.49 0 0 1-1.68-.428 3.775 3.775 0 0 0 .127 4.623l1.79 2.184a1 1 0 1 1-1.547 1.268l-1.79-2.184a5.765 5.765 0 0 1-.964-1.692 3.213 3.213 0 0 1-3.404-.177c-.968-.679-1.795-2.861-2.48-6.547 3.142.177 5.197.605 6.166 1.283.12.085.234.176.34.274zm4.265-.604l.586.58c.28.277.653.434 1.055.434.4 0 .77-.154 1.05-.429l.596-.584.835.013c.854 0 1.525-.671 1.525-1.5l-.013-.857.581-.596C17.847 7.767 18 7.398 18 7c0-.41-.163-.79-.45-1.072l-.606-.593.005-.847c0-.837-.671-1.509-1.5-1.509l-.823.005-.585-.564A1.488 1.488 0 0 0 13 2a1.49 1.49 0 0 0-1.079.458l-.583.603-.84.007A1.5 1.5 0 0 0 9.01 4.556l-.006.812-.571.578C8.156 6.226 8 6.598 8 7c0 .407.16.783.443 1.065l.592.587v.834a1.5 1.5 0 0 0 1.5 1.5h.824zM13 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-8.783 5.942a1.213 1.213 0 0 0 1.39-1.986c-.358-.251-1.198-.491-2.47-.674.42 1.566.826 2.483 1.08 2.66z"
                            //stroke={'#fff'}
                            fill={'#fff'}
                        />
                    </Svg>
                </View>


            </View>

            <GestureRecognizer
                style={{
                    position: 'absolute',
                    top: 0,
                    height: HEIGHT_SCREEN * 0.5,
                    backgroundColor: 'transparent',
                    width: WIDTH_SCREEN,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    zIndex: 4,
                    //borderWidth: 1,
                    //backgroundColor: 'yellow',
                }}
                onSwipeLeft={preAction}
                onSwipeRight={nextAction}
                config={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 80,
                }}>
                <View
                    style={{
                        // position: 'absolute',
                        // top: 0,
                        // height: HEIGHT_SCREEN * 0.5,
                        // backgroundColor: 'transparent',
                        // width: WIDTH_SCREEN,
                        // justifyContent: 'flex-end',
                        // alignItems: 'center',
                        // zIndex: 2,
                        // borderWidth: 1,
                    }}>
                    <Animated.View
                        style={[{
                            height: HEIGHT_SCREEN,
                            width: HEIGHT_SCREEN,
                            borderRadius: HEIGHT_SCREEN,
                            backgroundColor: 'transparent',
                            //borderWidth: HEIGHT_SCREEN * 0.15,
                            //borderColor: 'hsl(355,9%,78%)',
                            //borderWidth: 1,
                            //marginBottom: HEIGHT_SCREEN * 0.05,
                            alignItems: 'center',
                        },
                            imageAnimatedStyle,
                        ]}>
                        {FOOD_DATA.map((item, index) => {
                            const opacityAnimatedStyle = useAnimatedStyle(() => {
                                return {
                                    opacity: interpolate(
                                        imageOpacity.value,
                                        [index - 1, index, index + 1],
                                        [0.3, 1, 0.3],
                                        { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
                                    ),
                                };
                            });
                            return (
                                <Animated.View
                                    style={[{
                                        position: 'absolute',
                                        //bottom: - HEIGHT_SCREEN * 0.08,
                                        zIndex: 1,
                                        opacity: imagePosition === index ? 1 : 0.3
                                    },
                                    item.image_position,
                                        //opacityAnimatedStyle,
                                    ]}
                                    key={index}>
                                    <View
                                        style={{
                                            //alignSelf: 'center',
                                            //height: 200,
                                            //width: 200,
                                            borderRadius: 200,
                                            backgroundColor: '#000',
                                            elevation: 20,
                                            zIndex: 1,
                                        }}>
                                        <Animated.Image
                                            style={[{
                                                height: 200,
                                                width: 200,
                                            },
                                            ]}
                                            source={item.image}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </Animated.View>
                            )
                        })}

                    </Animated.View>
                </View>
            </GestureRecognizer>

            {/* Header */}
            <View
                style={{
                    position: 'absolute',
                    top: 40,
                    //borderWidth: 1,
                    zIndex: 10,
                    width: '100%',
                    justifyContent: 'center',
                }}>
                <View
                    style={{
                        //paddingTop: 40,
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity>
                        <Feather
                            name="menu"
                            size={24}
                            color={'#000'}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <View
                            style={{
                                width: 33,
                                height: 33,
                                //borderWidth: 1,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    backgroundColor: '#fff',
                                    borderRadius: 100,
                                    width: 15,
                                    height: 15,
                                    zIndex: 99,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    elevation: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 10,
                                    }}>
                                    3
                                </Text>
                            </View>
                            <SimpleLineIcons
                                name="bag"
                                size={24}
                                color={'#000'}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    height: HEIGHT_SCREEN * 0.5,
                }}>
                <ScrollView
                    style={{
                        //paddingTop: 40,
                        flex: 1,
                        zIndex: 3,
                        //backgroundColor: '#fff'
                    }}>
                    {/* Button */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            marginTop: 50,
                            //borderWidth: 1,
                            //marginTop: -10,
                            //marginTop: HEIGHT_SCREEN * 0.4,
                        }}>
                        <Pressable
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                backgroundColor: '#edd6d8',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={preAction}>
                            <Feather
                                name="chevron-left"
                                size={30}
                                color={'hsl(0,0%,60%)'}
                            />
                        </Pressable>
                        <Animated.Text
                            style={{
                                color: '#000',
                                fontSize: 20,
                                fontWeight: '600',
                                marginTop: 20,
                            }}>
                            {FOOD_DATA[imagePosition].name}
                        </Animated.Text>
                        <Pressable
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                backgroundColor: '#edd6d8',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={nextAction}>
                            <Feather
                                name="chevron-right"
                                size={30}
                                color={'hsl(0,0%,60%)'}
                            />
                        </Pressable>
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            paddingHorizontal: 30,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            //borderWidth: 1,
                        }}>
                        {[...new Array(5)].map((item, index) => (
                            <Entypo
                                key={index}
                                name="star"
                                size={20}
                                color="#fbcb3c"
                            />
                        ))}
                        <Text
                            style={{
                                color: 'hsl(0,0%,70%)',
                                fontSize: 14,
                                marginLeft: 5,
                            }}>
                            100 reviews
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 30,
                        }}>
                        <Text
                            style={{
                                color: 'hsl(0,0%,70%)',
                                fontSize: 16,
                                marginTop: 10,
                            }}>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi
                            ut aliquip ex ea commodo consequat.
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                }}>
                                $7.89
                            </Text>
                            <View
                                style={{
                                    marginLeft: 10,
                                    backgroundColor: '#edd6d2',
                                    width: '25%',
                                    height: 40,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#000',
                                        fontWeight: '400',
                                    }}>450 cal</Text>
                            </View>
                            <View
                                style={{
                                    marginLeft: 10,
                                    backgroundColor: '#edd6d2',
                                    width: '25%',
                                    height: 40,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#000',
                                        fontWeight: '400',
                                    }}>3 sugar</Text>
                            </View>
                            <View
                                style={{
                                    marginLeft: 10,
                                    backgroundColor: '#edd6d2',
                                    width: '25%',
                                    height: 40,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 13,
                                        color: '#000',
                                        fontWeight: '400',
                                    }}>250 mac</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 10,
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    width: '60%',
                                    backgroundColor: '#000',
                                    borderRadius: 5,
                                    paddingVertical: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <SimpleLineIcons
                                    name="bag"
                                    size={24}
                                    color={'#fff'}
                                />
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 18,
                                        fontWeight: '400',
                                        marginLeft: 10,
                                        letterSpacing: 0.8,
                                    }}>
                                    Add to cart
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '36%',
                                    backgroundColor: '#000',
                                    borderRadius: 5,
                                    paddingVertical: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}>
                                <TouchableOpacity
                                    style={{
                                        width: '40%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={reduceItem}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}>
                                    {number}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        width: '40%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => setNumber(number + 1)}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 20,
                                            fontWeight: 'bold'
                                        }}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                transparent
                statusBarTranslucent
                animationType="fade"
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}>
                    <Pressable
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(52, 52, 52, 0)',
                        }}
                        onPress={() => setShowModal(false)}
                    />

                    <Animated.View
                        entering={SlideInRight}
                        exiting={SlideInLeft}
                        style={{
                            height: HEIGHT_SCREEN,
                            paddingHorizontal: 10,
                            backgroundColor: '#d4b0b1',
                            paddingVertical: 40,
                            //alignItems: 'center',
                            //borderWidth: 1,
                            //position: 'absolute',
                            //left: 0,
                        }}>
                        <View style={{ height: HEIGHT_SCREEN * 0.7 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}>
                                <Pressable
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        backgroundColor: '#e9cecf',
                                        elevation: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                    }}
                                    onPress={() => setShowModal(false)}>
                                    <Feather
                                        name="x"
                                        size={24}
                                        color={'#fff'}
                                    />
                                </Pressable>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: '#fff',
                                        marginTop: 20,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                    }}>
                                    Your
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: '#fff',
                                        fontWeight: '600',
                                        textAlign: 'center',
                                    }}>
                                    Order
                                </Text>
                                <View
                                    style={{
                                        marginTop: 30,
                                    }}>
                                    {[... new Array(3)].map((_, i) => (
                                        <View
                                            key={i}
                                            style={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 100,
                                                borderWidth: 1,
                                                marginBottom: 25,
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <TouchableOpacity
                                                style={{
                                                    position: 'absolute',
                                                    top: -10,
                                                    height: 20,
                                                    width: 20,
                                                    borderRadius: 100,
                                                    backgroundColor: '#c3b7b8',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    zIndex: 999,
                                                }}>
                                                <Feather
                                                    name="x"
                                                    size={15}
                                                    color={'#fff'}
                                                />
                                            </TouchableOpacity>
                                            <Image
                                                source={require('./assets/salad.png')}
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 80,
                                                }}
                                                resizeMode={"contain"}
                                            />
                                        </View>
                                    ))}
                                </View>


                            </ScrollView>
                        </View>
                        <View
                            style={{
                                alignSelf: "center",
                                position: 'absolute',
                                bottom: 100,
                                justifyContent: 'flex-end',
                                //borderWidth: 1,
                            }}>
                            <Text
                                style={{
                                    //marginTop: 50,
                                    textAlign: "center",
                                    color: '#fff',
                                    fontSize: 20,
                                }}>
                                Total
                            </Text>
                            <Text
                                style={{
                                    marginTop: 5,
                                    textAlign: "center",
                                    color: '#fff',
                                    fontSize: 20,
                                    fontWeight: '800',
                                }}>
                                $42.60
                            </Text>
                            <Pressable>
                                <View
                                    style={{
                                        alignSelf: "center",
                                        width: 50,
                                        height: 50,
                                        borderRadius: 100,
                                        backgroundColor: '#fff',
                                        marginTop: 30,
                                        elevation: 5,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                    <AntDesign
                                        name={"check"}
                                        size={28}
                                        color={'hsl(0,0%,70%)'}
                                    />
                                </View>
                            </Pressable>
                        </View>
                    </Animated.View>
                </View>
            </Modal>

        </View>
    );
};

export default Food_Index;
