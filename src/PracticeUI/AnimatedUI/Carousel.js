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
const FILM = [
  {
    url: 'https://vov2.vov.vn/sites/default/files/styles/large/public/2022-06/image007.jpg',
    title: 'Minions - Sự trỗi dậy của gru',
  },
  {
    url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSjItKNo5r98nRZJxPZLAH0XlninisP_JKUhhVcMfbe2mwlGuzg',
    title: 'Frozen2',
  },
  {
    url: 'https://static.wikia.nocookie.net/disneyfanon/images/a/a9/The_Avengers_poster2.jpg/revision/latest/scale-to-width-down/1200?cb=20210328174322',
    title: 'Avengers',
  },
  {
    title: 'Stand by me 2',
  },
  {
    url: 'https://m.media-amazon.com/images/M/MV5BMTcyOTc2OTA1Ml5BMl5BanBnXkFtZTcwOTI1MjkzOQ@@._V1_FMjpg_UX1000_.jpg',
    title: 'Croods',
  },
];
const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  let position = Animated.divide(scrollX, ITEM_SIZE);
  const renderItem = ({item, index}) => {
    const transY = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [100, 50, 100],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={{
          width: ITEM_SIZE,
          marginLeft: index === 0 ? SPACER_ITEM_SIZE : 0,
          marginRight: index === FILM.length - 1 ? SPACER_ITEM_SIZE : 0,
        }}>
        <Animated.View
          style={{
            marginHorizontal: SPACING,
            padding: SPACING * 2,
            alignItems: 'center',
            backgroundColor: 'transparent',
            borderRadius: 30,
            //borderWidth: 1,
            marginTop: 50,
            transform: [{translateY: transY}],
          }}>
          <Image
            source={{
              uri: item.url,
            }}
            style={{width: 200, height: 350, borderRadius: 20}}
            resizeMode="stretch"
          />
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '600',
              marginTop: 0,
            }}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.text}>8.2</Text>
            <View style={{marginLeft: 10}}>
              <View style={{flexDirection: 'row'}}>
                {FILM.map((_, index) => {
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
            industry.
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
        {FILM.map((film, index) => {
          const transX = position.interpolate({
            inputRange: [index, index + 1],
            outputRange: [0, -width],
          });
          return (
            <Animated.View
              style={{
                width,
                height,
                position: 'absolute',
                transform: [{translateX: transX}],
              }}
              key={index}>
              <Image
                source={{
                  uri: film.url,
                }}
                style={{
                  width,
                  height,
                  resizeMode: 'stretch',
                  zIndex: 1,
                }}
                blurRadius={0.5}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  height: 300,
                  width,
                  zIndex: 2,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: width + 180,
                    height: 500,
                    borderRadius: 1000,
                    backgroundColor: '#fff',
                    opacity: 0.8,
                  }}
                />
              </View>
            </Animated.View>
          );
        })}
      </View>

      <Animated.FlatList
        data={FILM}
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
