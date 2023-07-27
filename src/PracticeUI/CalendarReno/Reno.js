import {View, Text, Dimensions, Pressable, StyleSheet} from 'react-native';
import React, {
  useReducer,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import DataConfig from './DataConfig';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownMonthYear from './DropDownMonthYear';
const {width, height} = Dimensions.get('screen');
const padding = 20;
const cellWidth = (width * 0.9 - padding * 2) / 7;
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
const reducer = (state, action) => {
  switch (action.type) {
    case 'PREV':
      const prevDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() - 1,
        1,
      );
      return {
        ...state,
        currentDate: prevDate,
        DataCalendar: DataConfig(prevDate),
      };
    case 'NEXT':
      const nextDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() + 1,
        1,
      );
      return {
        ...state,
        currentDate: nextDate,
        DataCalendar: DataConfig(nextDate),
      };
    case 'CLOSE':
      return {
        ...state,
        currentDate: action.FromDate,
        selectedDate: action.FromDate,
        DataCalendar: DataConfig(action.FromDate),
      };
    case 'CHOOSE':
      return {
        ...state,
        currentDate: action.item,
        selectedDate: action.item,
        DataCalendar: DataConfig(action.item),
      };
    case 'YEAR':
      const newYear = new Date(
        action.year,
        state.currentDate.getMonth(),
        state.currentDate.getDate(),
      );
      return {
        ...state,
        currentDate: newYear,
        DataCalendar: DataConfig(newYear),
      };
    case 'MONTH':
      const newMonth = new Date(
        state.currentDate.getFullYear(),
        action.month,
        state.currentDate.getDate(),
      );
      return {
        ...state,
        currentDate: newMonth,
        DataCalendar: DataConfig(newMonth),
      };
    default:
      break;
  }
};
const Reno = ({open, setOpen, setDatePicker, enablePast = true, FromDate}) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedDate: FromDate,
    currentDate: FromDate,
    DataCalendar: DataConfig(FromDate),
  });
  const [openDropDown, setOpenDropDown] = useState(false);
  const emptySpace = useMemo(
    () =>
      (state.DataCalendar.length <= 28
        ? 2
        : state.DataCalendar.length <= 35
        ? 1
        : 0) * cellWidth,
    [state.DataCalendar.length],
  );
  useEffect(() => {
    if (openDropDown) {
      setOpenDropDown(false);
    }
  }, [state.selectedDate, state.currentDate, open]);
  useEffect(() => {
    console.log('reno');
    dispatch({type: 'CLOSE', FromDate});
  }, [FromDate]);
  const onPrev = useCallback(() => {
    if (enablePast) {
      dispatch({type: 'PREV'});
    } else {
      if (state.currentDate.getFullYear() === FromDate.getFullYear()) {
        if (state.currentDate.getMonth() > FromDate.getMonth()) {
          dispatch({type: 'PREV'});
        }
      } else {
        dispatch({type: 'PREV'});
      }
    }
  }, [state.currentDate, enablePast]);
  const onNext = useCallback(() => {
    dispatch({type: 'NEXT'});
  }, []);
  const onChoose = useCallback(
    item => {
      if (enablePast) {
        dispatch({type: 'CHOOSE', item});
      } else {
        if (
          item.getTime() > FromDate.getTime() ||
          item.toDateString() === FromDate.toDateString()
        ) {
          dispatch({type: 'CHOOSE', item});
        }
      }
    },
    [enablePast, FromDate],
  );
  const onClose = useCallback(() => {
    dispatch({type: 'CLOSE', FromDate});
    setOpen(false);
  }, [FromDate]);
  const onPress = useCallback(item => {
    dispatch({type: 'YEAR', year: item});
  }, []);
  const onMonth = useCallback(index => {
    dispatch({type: 'MONTH', month: index});
  }, []);
  const colorNumber = useCallback(
    item => {
      if (state.selectedDate.toDateString() === item.toDateString()) {
        return '#fff';
      }
      if (state.currentDate.getMonth() === item.getMonth()) {
        if (enablePast) return '#000';
        else {
          if (
            item.getTime() > FromDate.getTime() ||
            item.toDateString() === FromDate.toDateString()
          ) {
            return '#000';
          }
        }
      }
      return 'grey';
    },
    [state.currentDate, enablePast],
  );
  const renderItem = useCallback(
    (item, index) => {
      return (
        <Pressable
          key={index}
          style={[
            styles.press,
            {
              backgroundColor:
                state.selectedDate.toDateString() === item.toDateString()
                  ? '#4fe078'
                  : '#fff',
            },
          ]}
          onPress={() => onChoose(item)}>
          <Text
            style={[
              styles.text,
              {
                color: colorNumber(item),
              },
            ]}>
            {item.getDate()}
          </Text>
        </Pressable>
      );
    },
    [state.selectedDate, enablePast, state.currentDate],
  );

  return (
    <>
      {open && (
        <View style={[{height, width}, styles.view]}>
          <Pressable style={styles.backdrop} onPress={onClose} />
          <View style={styles.container}>
            <View
              style={[styles.header, {alignItems: 'flex-start', zIndex: 999}]}>
              <Pressable hitSlop={20} onPress={onPrev}>
                <Entypo name="chevron-left" size={25} color="#000" />
              </Pressable>
              <DropDownMonthYear
                width={240}
                height={35}
                open={openDropDown}
                setOpen={setOpenDropDown}
                DataMonth={month}
                currentDate={state.currentDate}
                setCurrentDate={state.setCurrentDate}
                onPress={onPress}
                onMonth={onMonth}
              />
              <Pressable hitSlop={20} onPress={onNext}>
                <Entypo name="chevron-right" size={25} color="#000" />
              </Pressable>
            </View>
            <View style={[styles.header, {marginTop: openDropDown ? -107 : 0}]}>
              {day.map((item, index) => {
                return (
                  <View key={index} style={[styles.press, {borderRadius: 0}]}>
                    <Text style={[styles.text, {fontWeight: '600'}]}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {state.DataCalendar.map((item, index) => renderItem(item, index))}
            </View>
            <View style={{width: '100%', height: emptySpace}} />
            <View
              style={[styles.header, {paddingHorizontal: 10, marginTop: 0}]}>
              <Text style={styles.txt_footer} onPress={onClose}>
                Cancel
              </Text>
              <Text
                style={styles.txt_footer}
                onPress={() => {
                  setDatePicker(state.selectedDate);
                  onClose();
                }}>
                OK
              </Text>
            </View>
            <Text>Calendar with useReducer</Text>
          </View>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
  },
  backdrop: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: '#00000099',
  },
  container: {
    padding,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'grey',
    width: width * 0.9,
  },
  press: {
    width: cellWidth,
    height: cellWidth,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '450',
  },
  txt_header: {
    color: '#000',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginVertical: 5,
  },
  txt_footer: {
    color: '#38a564',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default React.memo(Reno);
