import { View, Text, Dimensions, Modal, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Svg, {
    Rect,
    Defs,
    LinearGradient,
    Stop,
    Image,
    Circle,
    G,
    ClipPath,
} from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withDelay,
    runOnJS,
    interpolate,
    FadeInDown,
    useAnimatedProps,
} from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-gestures';
import DestinationSwiper from "./DestinationSwiper";
const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");

const Rocket_Index = () => {
    const circumference = 2 * Math.PI * 100;
    const circleAnimatedValue = useSharedValue(0);
    const textTransY = useSharedValue(50);
    const textOpacity = useSharedValue(0);
    const circleScale = useSharedValue(1);
    const [isFinish, setIsFinish] = useState(false);
    const [showView1, setShowView1] = useState(true);
    const circle2Scale = useSharedValue(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const modalPosition = useSharedValue(0);
    const [up, setUp] = useState(undefined);

    const circleAnimatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: circleAnimatedValue.value * circumference,
        };
    });
    const CircleScaleStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: circleScale.value,
                }
            ],
        };
    });

    const TextStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: textTransY.value,
            }],
            opacity: textOpacity.value,
        };
    });

    const Circle2Style = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: circle2Scale.value,
            }],
        };
    });

    const ModalPositionStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(modalPosition.value, [0, 1, 2], [HEIGHT_SCREEN, HEIGHT_SCREEN * 0.5, HEIGHT_SCREEN * 0.2])
            }],
        };
    });


    const upDateFinish = () => {
        setIsFinish(true);
    };
    const UpDateShowView = () => {
        setShowView1(false);
        circle2Scale.value = withTiming(1);
        setTimeout(() => {
            setIsShowModal(true);
            modalPosition.value = withDelay(200, withTiming(1));
        }, 200);
        //modalPosition.value = withDelay(300, withTiming(1));
    };
    useEffect(() => {
        circleAnimatedValue.value =
            withTiming(1, { duration: 3000 }, (finished) => {
                if (finished) {
                    runOnJS(upDateFinish)();
                    //console.log("finished");
                }
            });
        textTransY.value = withDelay(1000, withTiming(0));
        textOpacity.value = withDelay(1000, withTiming(1));
    }, []);

    useEffect(() => {
        circleScale.value = 1;
        if (isFinish === true) {
            circleScale.value = withTiming(0);
            textTransY.value = withTiming(50);
            textOpacity.value = withTiming(0,
                {},
                (finished, currentValue) => {
                    if (finished) {
                        runOnJS(UpDateShowView)();
                    }
                });
        };
        //setShowView1 (false);
    }, [isFinish]);

    useEffect(() => {
        if (up === true) {
            modalPosition.value = withTiming(2);
            circle2Scale.value = withTiming(0);
        } else if (up === false) {
            modalPosition.value = withTiming(1);
            circle2Scale.value = withTiming(1);
        } else {
            modalPosition.value = withTiming(0);
        }
    }, [up]);

    const DATA_HEADER = [
        {
            id: 1,
            title: "ALL",
        },
        {
            id: 2,
            title: "RESTAURANT",
        },
        {
            id: 3,
            title: "CAFE",
        },
        {
            id: 4,
            title: "CINEMA",
        },
        {
            id: 5,
            title: "HOTEL",
        },

    ];

    const DATA_CONTENT = [
        {
            id: 1,
            title: "KFC FastFood",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 2,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://media.cnn.com/api/v1/images/stellar/prod/150929101049-black-coffee-stock.jpg?q=x_3,y_1231,h_1684,w_2993,c_crop/w_800"
        },
        {
            id: 3,
            title: "Chill Pizza",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395__480.jpg"
        },
        {
            id: 4,
            title: "KFC FastFood",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 5,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://media.cnn.com/api/v1/images/stellar/prod/150929101049-black-coffee-stock.jpg?q=x_3,y_1231,h_1684,w_2993,c_crop/w_800"
        },
        {
            id: 6,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 7,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 8,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 9,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 10,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 11,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 11,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 11,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 11,
            title: "Destiny Coffee",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },
        {
            id: 4,
            title: "KFC FastFood",
            txt: "High Street",
            subtxt: "100m away",
            image: "https://i.bloganchoi.com/bloganchoi.com/wp-content/uploads/2021/08/tu-lam-hamburger-696x389.jpg?fit=700%2C20000&quality=95&ssl=1"
        },


    ];

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <Animated.View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        //width: 100,
                        //borderWidth: 1,
                    }}
                    entering={FadeInDown.duration(500).delay(500)}
                >

                    <Text
                        style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: '700',
                            letterSpacing: 1.5
                        }}>
                        {item.title}
                    </Text>
                </Animated.View>
            </View>
        )
    };


    return (
        <View>
            <Svg height={HEIGHT_SCREEN} width={WIDTH_SCREEN}>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="rgb(64,212,189)" stopOpacity="1" />
                    <Stop offset="100%" stopColor="rgb(49,136,196)" stopOpacity="1" />
                </LinearGradient>
                <Rect
                    x="0"
                    y="0"
                    width={WIDTH_SCREEN}
                    height={HEIGHT_SCREEN}
                    fill="url(#grad)"
                />
                {/*Header*/}
                <View
                    style={{
                        paddingTop: 45,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                        <Feather
                            name="menu"
                            color="#fff"
                            size={24}
                        />
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                                fontWeight: '600',
                                letterSpacing: 2,
                            }}>
                            SCAN
                        </Text>
                        <Entypo
                            name="location"
                            color='#fff'
                            size={24}
                        />
                    </View>
                </View>
                {/*ImageView */}
                <View
                    style={{
                        marginTop: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //borderWidth: 1,
                        height: 320,
                    }}>
                    {/*Image*/}
                    {showView1 ? (
                        <Animated.View
                            style={[{
                                width: WIDTH_SCREEN * 0.5,
                                height: WIDTH_SCREEN * 0.5,
                                //borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                                CircleScaleStyle,
                            ]}>
                            <Svg width={'100%'} height={'100%'} viewBox="0 0 240 240" >
                                <G rotation={"-90"} origin={"120,120"}>
                                    <Circle
                                        stroke="hsl(0,0%,80%)"
                                        fill="none"
                                        cx={"50%"}
                                        cy={"50%"}
                                        r={100}
                                        strokeWidth={20}
                                    />
                                    <AnimatedCircle
                                        stroke="rgb(49,136,196)"
                                        //stroke="url(#grad)"
                                        fill="none"
                                        cx={"50%"}
                                        cy={"50%"}
                                        r={100}
                                        strokeWidth={20}
                                        strokeDasharray={circumference}
                                        //strokeDashoffset={circumference / 2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        animatedProps={circleAnimatedProps}
                                    />
                                </G>
                            </Svg>
                            <View
                                style={{
                                    position: "absolute",
                                    top: 25,
                                    left: 25,
                                    bottom: 25,
                                    right: 25,
                                    zIndex: 10,
                                    //borderWidth: 1,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 150,
                                        backgroundColor: 'rgb(64,212,189)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <LottieView
                                        style={{
                                            width: 130,
                                            height: 130,
                                            borderRadius: 180,
                                        }}
                                        source={require('./assets/81045-rocket-launch.json')}
                                        loop
                                        autoPlay
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    ) : (
                        <Animated.View
                            style={[
                                {
                                    width: 150,
                                    height: 150,
                                    borderRadius: 300,
                                    borderColor: 'hsl(185,44%,45%)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 0,
                                },
                                //BorderStyle,
                            ]}>
                            <Animated.View
                                style={[
                                    {
                                        width: 200,
                                        height: 200,
                                        borderRadius: 200,
                                        backgroundColor: 'hsl(330,2%,84%)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                    Circle2Style,
                                ]}>
                                <View
                                    style={{
                                        width: 180,
                                        height: 180,
                                        borderRadius: 180,
                                        backgroundColor: 'hsl(0,0%,80%)',
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 40,
                                            fontWeight: 'bold',
                                            color: 'hsl(185,44%,45%)',
                                        }}>
                                        26
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: '700',
                                            color: 'hsl(185,44%,45%)',
                                            textAlign: 'center'
                                        }}>
                                        Locations are found!
                                    </Text>
                                </View>
                            </Animated.View>
                        </Animated.View>
                    )}
                </View>
                <View
                    style={{
                        marginTop: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        //borderWidth: 1
                    }}>
                    {/*Text*/}
                    <Animated.Text
                        style={[
                            {
                                fontSize: 18,
                                fontWeight: '400',
                                color: '#fff',
                            },
                            TextStyle,
                        ]}>
                        Scanning your location ...
                    </Animated.Text>
                </View>
            </Svg>
            <GestureRecognizer
                onSwipeDown={() => setUp(false)}
                onSwipeUp={() => setUp(true)}
                config={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 80,
                }}>
                <Modal
                    visible={isShowModal}
                    transparent
                    onRequestClose={() => { }}
                    statusBarTranslucent
                    animationType="fade"
                >

                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(52, 52, 52, 0)',
                            }}
                        />

                        <Animated.View
                            style={[{
                                //height: 300,
                                flex: 1,
                                width: '100%',
                            },
                                ModalPositionStyle,
                            ]}>
                            <View
                                style={{
                                    backgroundColor: 'rgba(52, 52, 52, 0)',
                                    width: '100%',
                                    //borderWidth: 1,
                                }}>
                                <FlatList
                                    data={DATA_HEADER}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    paddingTop: 30,
                                    height: 500,
                                    //flex: 1,

                                }}>
                                <ScrollView
                                    style={{
                                        //backgroundColor: '#fff',
                                        //paddingTop: 30,
                                        //borderWidth: 1,

                                    }}>
                                    {DATA_CONTENT.map((item, index) => {
                                        return (
                                            <DestinationSwiper
                                                key={index}
                                                width={'100%'}
                                                height={70}
                                                //title={item.title}
                                                item={item}
                                            />
                                        )
                                    })}
                                    {/* {DATA_CONTENT.map((item, index) => {
                                        return (
                                            <Text
                                                key={index}
                                                style={{
                                                    fontSize: 70,
                                                    //height: 100,
                                                    marginBottom: 10
                                                }}>
                                                {index + 1}
                                            </Text>
                                        )
                                    })} */}
                                </ScrollView>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: '#fff',
                                }}
                            />
                        </Animated.View>
                    </View>

                </Modal>
            </GestureRecognizer>
        </View>
    );
};

export default Rocket_Index;

