import {View, Text, Modal, Pressable, StyleSheet, FlatList} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {ConfigData} from './ConfigData';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const day = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const Calendar_Index = ({
  width,
  open,
  setOpen,
  selectedDate,
  setSelectedDate,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const x_animatedValue = useSharedValue(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...ConfigData(currentDate)]);
  }, [currentDate]);
  const onNextPress = () => {
    //console.log('press');
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };
  const onPrevPress = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };
  const onClose = () => {
    setOpen(false);
    setCurrentDate(new Date());
  };

  const panHandler = useAnimatedGestureHandler({
    onEnd: (e, ctx) => {
      if (e.translationX < 0) {
        x_animatedValue.value = 1;
      } else if (e.translationX > 0) {
        x_animatedValue.value = -1;
      }
      //console.log(x_animatedValue.value);
    },
  });

  // const receiveValueX = useCallback(value => {
  //   //console.log(value);
  //   if (value < 0) {
  //     setCurrentDate(
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
  //     );
  //   } else {
  //     setCurrentDate(
  //       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
  //     );
  //   }
  // }, []);
  // useDerivedValue(() => {
  //   runOnJS(receiveValueX)(x_animatedValue.value);
  // });
  const renderHeader = useCallback(() => {
    //console.log('render');
    return (
      <View
        style={
          {
            //borderWidth: 1,
          }
        }>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <Pressable
            style={styles.button}
            onPress={() => onPrevPress()}
            android_ripple={styles.ripple_config}>
            <Entypo name="chevron-left" size={25} color={'#000'} />
          </Pressable>
          <Pressable style={[styles.button, {width: '80%'}]}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontWeight: '900',
              }}>
              {month[currentDate.getMonth()] + '\t\t'}
              {currentDate.getFullYear()}
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => onNextPress()}
            android_ripple={styles.ripple_config}>
            <Entypo name="chevron-right" size={25} color={'#000'} />
          </Pressable>
        </View>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingTop: 20,
              paddingBottom: 30,
            }}>
            {day.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.text}>{item}</Text>
                </View>
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }, [currentDate]);
  const renderItems = useCallback(
    ({item, index}) => {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            //borderWidth: 1,
            //marginVertical: 3,
          }}>
          <Pressable
            style={{
              //padding: 5,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedDate.toDateString() ===
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    item.value,
                  ).toDateString() && item.isEnable
                  ? '#3cda5e'
                  : '#fff',

              borderRadius: 100,
              //borderWidth: 1,
            }}
            android_ripple={styles.selected_ripple}
            disabled={item.isEnable ? false : true}
            onPress={() =>
              setSelectedDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  item.value,
                ),
              )
            }>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: '500',
                  color: item.isEnable ? '#000' : 'hsl(0,0%,70%)',
                },
              ]}>
              {item.value}
            </Text>
          </Pressable>
        </View>
      );
    },
    [currentDate, selectedDate],
  );
  const renderFooter = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <Pressable onPress={() => onClose()}>
          <Text
            style={{
              color: '#38a564',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Cancel
          </Text>
        </Pressable>
        <Pressable onPress={() => onClose()}>
          <Text
            style={{
              color: '#38a564',
              fontSize: 20,
              fontWeight: '700',
            }}>
            OK
          </Text>
        </Pressable>
      </View>
    );
  }, []);
  return (
    <Modal
      visible={open}
      onRequestClose={() => setOpen(false)}
      animationType="fade"
      transparent
      statusBarTranslucent>
      <GestureHandlerRootView style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Pressable
            style={{
              position: 'absolute',
              zIndex: 1,
              backgroundColor: '#00000099',
              ...StyleSheet.absoluteFill,
            }}
            onPress={() => onClose()}
          />

          <View
            style={{
              width,
              borderWidth: 1,
              zIndex: 2,
              backgroundColor: '#fff',
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderColor: 'hsl(0,0%,70%)',
              borderRadius: 15,
            }}>
            <FlatList
              data={data}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              renderItem={renderItems}
              numColumns={7}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple_config: {
    color: 'hsl(0,0%,80%)',
    borderless: true,
    radius: 30,
    foreground: false,
  },
  selected_ripple: {
    color: 'hsl(0,0%,80%)',
    borderless: true,
    radius: 20,
    foreground: false,
  },
});
export default React.memo(Calendar_Index);
