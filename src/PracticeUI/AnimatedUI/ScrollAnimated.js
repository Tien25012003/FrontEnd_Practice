import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  FlatList,
  Image,
  StatusBar,
  Animated,
} from 'react-native';
import {faker} from '@faker-js/faker/locale/de';
import React, {useRef} from 'react';
const {width, height} = Dimensions.get('screen');
faker.seed(10);
const DATA = [...Array(20).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: faker.image.avatar(),
    name: faker.name.fullName(),
    jobtitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const url =
  'https://inkythuatso.com/uploads/thumbnails/800/2022/05/hinh-nen-dien-thoai-hoa-hong-2-10-14-25-34.jpg';
const ScrollAnimated = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  console.log(scrollY);
  const renderItem = ({item, index}) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
    const opacityInputRange = [
      -1,
      0,
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 1),
    ];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: SPACING,
          backgroundColor: 'rgba(255,255,255,0.8)',
          marginBottom: SPACING,
          borderRadius: 12,
          elevation: 20,
          transform: [{scale}],
          opacity,
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: 100,
            marginRight: SPACING / 2,
          }}
        />
        <View>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={{fontSize: 15, color: '#000'}}>{item.jobtitle}</Text>
          <Text style={{fontSize: 12, color: '#0099cc'}}>{item.email}</Text>
        </View>
      </Animated.View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        //paddingTop: StatusBar.currentHeight,
      }}>
      <Image
        source={{uri: url}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <Animated.FlatList
        data={DATA}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight,
        }}
        snapToInterval={ITEM_SIZE}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default ScrollAnimated;
