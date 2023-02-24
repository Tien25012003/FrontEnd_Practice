import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Svg, { Path } from 'react-native-svg';
import Animated, {
    withSpring,
    withTiming,
    useSharedValue,
    useAnimatedStyle,
    BounceInRight,
} from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const TabBarWidth = WIDTH_SCREEN * 0.9;
const TabBarItem = ({
    name,
    index,
    IconType,
    IconName,
    onPress,
    selected,
}) => {
    const transY = useSharedValue(0);
    useEffect(() => {
        if (selected === index) {
            transY.value = withSpring(-30);
        } else {
            transY.value = withSpring(0);
        }
    }, [selected]);
    const animatedTransYStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: transY.value,
            }],
        };
    })
    return (
        <Pressable
            style={{
                //width: '100%',
                flex: 1,
                //borderWidth: 1,
                //borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            }}
            onPress={onPress}>

            {/* <IconType
                name={IconName}
                size={32}
                color={"#fff"}
            /> */}
            <Animated.View
                style={[{
                    //borderWidth: 1,
                    //borderColor: '#fff',
                },
                    animatedTransYStyle
                ]}>
                {index === 2 ? (
                    <Entypo
                        name={IconName}
                        size={32}
                        color={"#fff"}
                        style={{
                            //opacity: selected === index ? 0 : 1,
                        }}
                    />
                ) : (
                    <Ionicons
                        name={IconName}
                        size={32}
                        color={"#fff"}
                        style={{
                            //opacity: selected === index ? 0 : 1,
                        }}
                    />
                )}
            </Animated.View>

        </Pressable>

    )
};
const TabBar = (props) => {
    const { routes } = props.state;
    //console.log(routes[0].params);
    //console.log()
    //console.log(props.state.index.params);
    //console.log(focusPosition);
    const [selected, setSelected] = useState(0);
    //console.log(selected);
    const transX = useSharedValue(0);
    const animatedCircleTransXStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: transX.value,
            }],
        };
    });
    const handleOnPress = (currentTab, index) => {
        transX.value = withSpring(TabBarWidth / 3 * index);
        if (props.state.index !== index) {
            setSelected(index);
            props.navigation.navigate(currentTab);
        };
    };
    return (
        <View style={styles.container}>
            <Animated.View
                style={[{
                    position: 'absolute',
                    left: 5,
                    top: 0,
                    zIndex: 2,
                    alignItems: 'center',
                    //borderWidth: 1,
                },
                    animatedCircleTransXStyle,
                ]}>
                <Svg
                    width={TabBarWidth * 0.3}
                    height={52}
                >
                    <Path
                        fill="#fff"
                        d="M18 0h70v17c0 19.33-15.67 35-35 35S18 36.33 18 17V0zM18 17.333V0H.667C10.24 0 18 7.76 18 17.333zm70 0V0h17.333C95.761 0 88 7.76 88 17.333z"
                    />
                </Svg>
                <View
                    style={{
                        height: 55,
                        width: 55,
                        backgroundColor: 'hsl(0,0%,10%)',
                        position: 'absolute',
                        bottom: 15,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Animated.View
                    //entering={BounceInRight.duration().delay(500)}
                    >
                        {selected === 2 ? (
                            <Entypo
                                name={routes[selected].params.IconName}
                                size={32}
                                color={"hsl(55,97%,73%)"}
                            />
                        ) : (
                            <Ionicons
                                name={routes[selected].params.IconName}
                                size={32}
                                color={"hsl(55,97%,73%)"}
                            />
                        )}
                    </Animated.View>

                </View>
            </Animated.View>
            {routes.map((item, index) => (
                <TabBarItem
                    key={index}
                    name={item.name}
                    //IconType={item.params.IconType}
                    IconName={item.params.IconName}
                    onPress={() => handleOnPress(item.name, index)}
                    selected={selected}
                    index={index}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        width: WIDTH_SCREEN * 0.9,
        height: HEIGHT_SCREEN * 0.1,
        //borderWidth: 1,
        backgroundColor: 'hsl(0,0%,10%)',
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 25,
        elevation: 10,
        //paddingHorizontal: 35,
        //justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
    },

})
export default TabBar;
