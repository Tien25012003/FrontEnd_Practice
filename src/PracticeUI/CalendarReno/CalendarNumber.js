import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useCallback, useReducer} from 'react';
import DataConfig from './DataConfig';
import Entypo from 'react-native-vector-icons/Entypo';
const {width} = Dimensions.get('screen');
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
const day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WIDTH = width * 0.9;
const cellWidth = (WIDTH - 40) / 7;
const reducer = (state, action) => {
  switch (action.type) {
    case 'PREV':
      return {
        ...state,
        currentDate: new Date(
          state.currentDate.getFullYear(),
          state.currentDate.getMonth() - 1,
          1,
        ),
        DataCalendar: DataConfig(state.currentDate),
      };
    case 'NEXT':
      return {
        ...state,
        currentDate: new Date(
          state.currentDate.getFullYear(),
          state.currentDate.getMonth() + 1,
          1,
        ),
        DataCalendar: DataConfig(state.currentDate),
      };
    case 'CHOOSE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      break;
  }
};
const CalendarNumber = ({open, setOpen, setDatePicker}) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedDate: new Date().getDate(),
    currentDate: new Date(),
    DataCalendar: DataConfig(),
  });
  const onPrev = useCallback(() => {
    dispatch({type: 'PREV'});
  }, [state.currentDate]);
  const onNext = useCallback(() => {
    dispatch({type: 'NEXT'});
  }, [state.currentDate]);
  const onChoose = useCallback(item => {
    dispatch({type: 'CHOOSE', payload: item.date});
  });
  console.log(state.selectedDate);
  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <View
          key={index}
          style={{
            flex: 1,
            zIndex: 1,
          }}>
          <Pressable
            style={[
              styles.date_view,
              {
                backgroundColor:
                  state.selectedDate === item.date && item.curr === undefined
                    ? '#4fe078'
                    : '#fff',
              },
            ]}
            onPress={() => {
              onChoose(item), console.log(item);
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: '#000',
                },
              ]}>
              {item.date}
            </Text>
          </Pressable>
        </View>
      );
    },
    [state.selectedDate],
  );
  const renderHeader = useCallback(() => {
    return (
      <View>
        <View style={styles.header_view}>
          <Pressable hitSlop={10} onPress={onPrev}>
            <Entypo name="chevron-left" size={25} color="#000" />
          </Pressable>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '900',
              textAlign: 'center',
            }}>
            {month[state.currentDate.getMonth()] + '\t\t'}
            {state.currentDate.getFullYear()}
          </Text>
          <Pressable hitSlop={10} onPress={onNext}>
            <Entypo name="chevron-right" size={25} color="#000" />
          </Pressable>
        </View>
        <View style={styles.day_view}>
          {day.map((item, index) => {
            return (
              <View key={index} style={[styles.view, {marginVertical: 15}]}>
                <Text style={styles.text}>{item}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }, [state.currentDate]);
  return (
    <Modal
      visible={open}
      onRequestClose={() => setOpen(open)}
      transparent
      statusBarTranslucent>
      <View style={styles.view}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />
        <View style={[{width: WIDTH, height: 400}, styles.container]}>
          <FlatList
            data={state.DataCalendar}
            numColumns={7}
            renderItem={renderItem}
            renderToHardwareTextureAndroid={true}
            ListHeaderComponent={renderHeader}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '490',
  },
  backdrop: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: '#00000099',
  },
  date_view: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: cellWidth,
    height: cellWidth,
  },
  header_view: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 999,
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderColor: 'hsl(0,0%,50%)',
    maxHeight: 400,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  day_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default React.memo(CalendarNumber);
