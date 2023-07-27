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
import Data from './Data';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('screen');
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
const padding = 20;
const cell = (width * 0.9 - padding * 2) / 7;
const reducer = (state, action) => {
  switch (action.type) {
    case 'PREV':
      return {
        ...state,
      };
    case 'NEXT':
      return {};
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
    DataCalendar: Data(),
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
  const renderItem = (item, index) => {
    return (
      <Pressable
        style={{
          width: cell,
          height: cell,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        key={index}>
        <Text>{item.date}</Text>
      </Pressable>
    );
  };
  return (
    <>
      {open && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {height, width, alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: '#00000099', flex: 1},
            ]}
            onPress={() => setOpen(false)}
          />
          <View
            style={{
              backgroundColor: '#fff',
              borderColor: 'grey',
              width: width * 0.9,
              padding,
            }}>
            {/* <FlatList
              data={state.DataCalendar}
              renderItem={renderItem}
              numColumns={7}
            /> */}
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {state.DataCalendar.map((item, index) => renderItem(item, index))}
            </View>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({});
export default React.memo(CalendarNumber);
