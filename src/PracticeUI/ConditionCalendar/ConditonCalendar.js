import {View, Text, Dimensions, Pressable, StyleSheet} from 'react-native';
import React, {useCallback, useMemo, useState, useEffect} from 'react';
import DataConfig from '../CalendarReno/DataConfig';
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

const ConditionCalendar = ({
  open,
  setOpen,
  setDatePicker,
  enablePast = false,
  FromDate,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(FromDate);
  const [currentDate, setCurrentDate] = useState(FromDate);
  const [DataCalendar, setDataCalendar] = useState([]);
  //console.log('inside', selectedDate.toDateString());
  //console.log('currentDate', currentDate.toDateString());
  useEffect(() => {
    setDataCalendar([...DataConfig(currentDate)]);
  }, [currentDate]);
  useEffect(() => {
    //console.log('render');
    setSelectedDate(FromDate);
    setCurrentDate(FromDate);
  }, [FromDate]);
  const emptySpace = useMemo(
    () =>
      (DataCalendar.length <= 28 ? 2 : DataCalendar.length <= 35 ? 1 : 0) *
      cellWidth,
    [DataCalendar.length],
  );
  useEffect(() => {
    if (openDropDown) {
      setOpenDropDown(false);
    }
  }, [selectedDate, currentDate]);
  const onPrev = useCallback(() => {
    if (enablePast) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      );
    } else {
      if (currentDate.getFullYear() === FromDate.getFullYear()) {
        if (currentDate.getMonth() > FromDate.getMonth()) {
          setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
          );
        }
      } else {
        setCurrentDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
      }
    }
  }, [currentDate, enablePast]);
  const onNext = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }, [currentDate]);
  const onChoose = useCallback(
    item => {
      if (enablePast) {
        setSelectedDate(item);
        setCurrentDate(item);
      } else {
        if (
          item.getTime() > FromDate.getTime() ||
          item.toDateString() === FromDate.toDateString()
        ) {
          setSelectedDate(item);
          setCurrentDate(item);
        }
      }
    },
    [enablePast, FromDate],
  );
  const onClose = useCallback(() => {
    setCurrentDate(FromDate);
    setSelectedDate(FromDate);
    setOpen(false);
  }, [FromDate]);
  const Color = useCallback(
    item => {
      if (item.toDateString() === selectedDate.toDateString()) return '#fff';
      if (item.getMonth() === currentDate.getMonth()) {
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
    [currentDate, enablePast],
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
                selectedDate.toDateString() === item.toDateString()
                  ? '#4fe078'
                  : '#fff',
            },
          ]}
          onPress={() => onChoose(item)}>
          <Text
            style={[
              styles.text,
              {
                color: Color(item),
              },
            ]}>
            {item.getDate()}
          </Text>
        </Pressable>
      );
    },
    [currentDate, selectedDate, enablePast],
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
                height={30}
                open={openDropDown}
                setOpen={setOpenDropDown}
                DataMonth={month}
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
              />
              <Pressable hitSlop={20} onPress={onNext}>
                <Entypo name="chevron-right" size={25} color="#000" />
              </Pressable>
            </View>
            <View style={[styles.header, {marginTop: openDropDown ? -92 : 0}]}>
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
              {DataCalendar.map((item, index) => renderItem(item, index))}
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
                  setDatePicker(selectedDate);
                  onClose();
                }}>
                OK
              </Text>
            </View>
            <Text>Calendar with useState</Text>
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
    zIndex: 999,
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
    marginVertical: 5,
  },
  txt_footer: {
    color: '#38a564',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default React.memo(ConditionCalendar);
