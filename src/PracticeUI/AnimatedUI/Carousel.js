import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('screen');
const SPACING = 10;
const ITEM_SIZE = width * 0.7;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.6;
const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, ITEM_SIZE);
  const renderItem = ({item, index}) => {
    const transY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, -50, 0],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={{
          width: ITEM_SIZE,
          marginLeft: index === 0 ? SPACER_ITEM_SIZE : 0,
        }}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 30,
            //borderWidth: 1,
            transform: [{translateY: transY}],
          }}>
          <Image
            source={{
              uri: 'https://m.media-amazon.com/images/M/MV5BMTcyOTc2OTA1Ml5BMl5BanBnXkFtZTcwOTI1MjkzOQ@@._V1_FMjpg_UX1000_.jpg',
            }}
            style={{width: 200, height: 350, borderRadius: 20}}
            resizeMode="stretch"
          />
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '600',
              marginTop: 20,
            }}>
            CROODS
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>8.2</Text>
            <View style={{marginLeft: 10}}>
              <View style={{flexDirection: 'row'}}>
                {[...new Array(5)].map((_, index) => {
                  return (
                    <AntDesign
                      name="star"
                      size={20}
                      color="#fbbc04"
                      key={index}
                    />
                  );
                })}
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'grey',
              }}>
              <Text style={{color: 'grey', fontSize: 13}}>Cartoon</Text>
            </View>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 10,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'grey',
                marginLeft: 10,
              }}>
              <Text style={{color: 'grey', fontSize: 13}}>Comedy</Text>
            </View>
          </View>
          <Text style={[styles.text, {fontSize: 13, marginTop: 10}]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={{position: 'absolute', height: BACKDROP_HEIGHT}}>
        {[...new Array(10)].map((_, index) => {
          const transX = position.interpolate({
            inputRange: [index, index + 1],
            outputRange: [0, -width],
          });
          return (
            <Animated.View
              style={{
                width,
                height: BACKDROP_HEIGHT,
                position: 'absolute',
                transform: [{translateX: transX}],
              }}
              key={index}>
              <Image
                source={{
                  uri: 'https://m.media-amazon.com/images/M/MV5BMTcyOTc2OTA1Ml5BMl5BanBnXkFtZTcwOTI1MjkzOQ@@._V1_FMjpg_UX1000_.jpg',
                }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  resizeMode: 'cover',
                }}
                blurRadius={5}
              />
            </Animated.View>
          );
        })}
      </View>

      <Animated.FlatList
        data={[...new Array(10)]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={renderItem}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        //snapToAlignment={'center'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
});
export default Carousel;
