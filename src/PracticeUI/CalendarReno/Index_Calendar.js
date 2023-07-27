import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  InteractionManager,
} from 'react-native';
import React, {useState} from 'react';
import CalendarReno from './CalendarReno';
import Reno from './Reno';
import moment from 'moment/moment';
import ConditonCalendar from '../ConditionCalendar/ConditonCalendar';
import CalendarNumber from '../CalendarUI/CalendarNumber';
const Index_Calendar = () => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [datePicker, setDatePicker] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState('Edit');
  const [From, setFrom] = useState(new Date());
  const [From2, setFrom2] = useState(new Date('2023-05-03'));
  const [visible1, setVisible1] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [openNumber, setOpenNumber] = useState(false);
  const date = new Date();
  //console.log('outside: ', From);
  //console.log('outside: ', FromDate.toDateString());
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Index_Calendar</Text>
      <Button title="OpenCalendar" onPress={() => setOpenCalendar(true)} />
      <Button title="Open" onPress={() => setVisible(true)} />
      <Button title="Open1" onPress={() => setVisible1(true)} />
      <Button title="Open2" onPress={() => setOpenNumber(true)} />
      {/* <Button
        title="Edit"
        onPress={() => {
          setCheck('Edit');
          setFrom(new Date('2023-05-01'));
          setFromDate(new Date('2023-05-02'));
        }}
      />
      <Button
        title="Add"
        onPress={() => {
          setCheck('Add');
          setFrom(new Date());
          setFromDate(new Date());
        }}
      /> */}
      <Button title="now" onPress={() => setFromDate(new Date())} />
      <Button
        title="2023-06-02"
        onPress={() => setFromDate(new Date('2023-06-02'))}
      />
      <Button
        title="2023-10-01"
        onPress={() => setFromDate(new Date('2023-10-01'))}
      />
      <Button title="EnablePast" onPress={() => setCheck(true)} />
      <Button title="DisablePast" onPress={() => setCheck(false)} />
      {/* <CalendarNumber
        open={openCalendar}
        setOpen={setOpenCalendar}
        setDatePicker={setDatePicker}
      /> */}
      <ConditonCalendar
        open={visible1}
        setOpen={setVisible1}
        setDatePicker={setDatePicker}
        FromDate={FromDate}
        enablePast={check}
      />
      <Reno
        open={visible}
        setOpen={setVisible}
        setDatePicker={setDatePicker}
        FromDate={FromDate}
        enablePast={check}
      />
      <Text>{moment(datePicker).format('DD/MM/YYYY')}</Text>
      <CalendarReno
        open={openCalendar}
        setOpen={setOpenCalendar}
        setDatePicker={setDatePicker}
      />
      <CalendarNumber open={openNumber} setOpen={setOpenNumber} />
    </View>
  );
};

export default Index_Calendar;
