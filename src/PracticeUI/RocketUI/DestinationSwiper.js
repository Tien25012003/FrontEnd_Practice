import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import React from "react";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Animated, {
    FadeInRight,
} from 'react-native-reanimated'
import Entypo from 'react-native-vector-icons/Entypo';
const DestinationSwiper = ({
    width,
    height,
    item,
}) => {
    close = () => {
        this._swipeableRow.close();
    };
    renderRightActions = () => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => { }}>
                <Text
                    style={{
                        color: "red",
                        paddingLeft: 10,
                        paddingRight: 5,
                    }}>
                    Order
                </Text>
            </TouchableOpacity>
        </View>
    );
    return (
        <GestureHandlerRootView>
            <Animated.View
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'hsl(0,0%,60%)',
                    marginBottom: 2,
                }}
                entering={FadeInRight.duration(500).delay(500)}>
                <Swipeable
                    friction={2}
                    rightThreshold={40}
                    renderRightActions={renderRightActions}>

                    <Pressable onPress={() => { }}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width,
                                height,
                                flexDirection: 'row',
                                paddingHorizontal: 10,
                                backgroundColor: '#fff',
                                paddingVertical: 10,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    style={{
                                        height: 50,
                                        width: 70,
                                    }}
                                    resizeMode="stretch"
                                    source={{ uri: item.image }}
                                />
                                <View
                                    style={{
                                        marginLeft: 10,
                                    }}>
                                    <Text
                                        style={{
                                            color: '#000',
                                            fontWeight: '700',
                                            fontSize: 16,
                                            //letterSpacing: 0.8,
                                        }}>
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'hsl(0,0%,60%)',
                                        }}>
                                        {item.txt}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'hsl(0,0%,60%)',
                                            fontSize: 10,
                                        }}>
                                        {item.subtxt}
                                    </Text>
                                </View>
                            </View>
                            <Entypo name="chevron-right" size={20} color="hsl(0,0%,73%)" />
                        </View>
                    </Pressable>
                </Swipeable>
            </Animated.View>
        </GestureHandlerRootView>
    );
};

export default DestinationSwiper;
