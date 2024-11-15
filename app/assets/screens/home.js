import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PushNotification from 'react-native-push-notification';

const Home = () => {
  const [schedules, setSchedules] = useState({});
  const [input, setInput] = useState({
    type: '',
    description: '',
    date: '',
    time: ''
  });

  // Set up notification channel (Android specific)
  PushNotification.createChannel(
    {
      channelId: "schedule-channel", 
      channelName: "Schedule Notifications",
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );

  // Save new schedule and create alarm
  const saveSchedule = () => {
    const { type, description, date, time } = input;
    if (!type || !description || !date || !time) {
      Alert.alert("Please fill all fields");
      return;
    }

    setSchedules((prevSchedules) => ({
      ...prevSchedules,
      [date]: [
        ...(prevSchedules[date] || []),
        { type, description, time }
      ]
    }));

    createAlarm(description, date, time);

    setInput({ type: '', description: '', date: '', time: '' });
  };

  // Schedule a notification alarm
  const createAlarm = (message, date, time) => {
    const scheduleDate = new Date(`${date}T${time}:00`);
    PushNotification.localNotificationSchedule({
      channelId: "schedule-channel",
      message: message,
      date: scheduleDate,
      allowWhileIdle: true,
    });
  };

  const renderSchedules = (date) => {
    return schedules[date] ? schedules[date].map((schedule, index) => (
      <View key={index} style={{ padding: 5, borderBottomWidth: 1 }}>
        <Text>{schedule.type}: {schedule.description} at {schedule.time}</Text>
      </View>
    )) : <Text>No schedules for this day.</Text>;
  };

  return (
    <ScrollView>
      <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>Schedule Manager</Text>

      <View style={{ margin: 10 }}>
        <TextInput
          placeholder="Type (Work, Class, etc.)"
          value={input.type}
          onChangeText={(text) => setInput({ ...input, type: text })}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Description"
          value={input.description}
          onChangeText={(text) => setInput({ ...input, description: text })}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Date (YYYY-MM-DD)"
          value={input.date}
          onChangeText={(text) => setInput({ ...input, date: text })}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
          placeholder="Time (HH:MM)"
          value={input.time}
          onChangeText={(text) => setInput({ ...input, time: text })}
          style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button title="Save Schedule" onPress={saveSchedule} />
      </View>

      <Calendar
        markedDates={Object.keys(schedules).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: 'blue' };
          return acc;
        }, {})}
        onDayPress={(day) => Alert.alert("Schedules", null, [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ])}
      />

      <View style={{ padding: 10 }}>
        {Object.keys(schedules).map((date) => (
          <View key={date} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{date}</Text>
            {renderSchedules(date)}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;