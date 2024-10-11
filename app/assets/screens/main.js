import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';


export default function main({navigation}) {
  // States for work schedule
  const [workStartTime, setWorkStartTime] = useState('');
  const [workEndTime, setWorkEndTime] = useState('');
  const [workDays, setWorkDays] = useState('');

  // States for school schedule
  const [schoolStartTime, setSchoolStartTime] = useState('');
  const [schoolEndTime, setSchoolEndTime] = useState('');
  const [schoolDays, setSchoolDays] = useState('');

  // States for sleep schedule
  const [sleepStartTime, setSleepStartTime] = useState('');
  const [sleepEndTime, setSleepEndTime] = useState('');

  // States for miscellaneous tasks
  const [miscDetails, setMiscDetails] = useState('');

  const handleSubmit = () => {
    // Validation for all fields
    if (!workStartTime || !workEndTime || !workDays || 
        !schoolStartTime || !schoolEndTime || !schoolDays || 
        !sleepStartTime || !sleepEndTime || !miscDetails) {
      Alert.alert('Error', 'Please fill out all fields');
    } else {
      // Handle form submission, e.g., save data or make API call
      Alert.alert(
        'Schedules Submitted',
        `Work Schedule: ${workDays}, ${workStartTime} - ${workEndTime}\n` +
        `School Schedule: ${schoolDays}, ${schoolStartTime} - ${schoolEndTime}\n` +
        `Sleep Schedule: ${sleepStartTime} - ${sleepEndTime}\n` +
        `Miscellaneous: ${miscDetails}`
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Schedule Information</Text>

      {/* Work Schedule Section */}
      <Text style={styles.sectionTitle}>Work Schedule</Text>
      <TextInput
        style={styles.input}
        placeholder="Work Start Time (e.g., 9:00 AM)"
        value={workStartTime}
        onChangeText={setWorkStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Work End Time (e.g., 5:00 PM)"
        value={workEndTime}
        onChangeText={setWorkEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Work Days (e.g., Mon-Fri)"
        value={workDays}
        onChangeText={setWorkDays}
      />

      {/* School Schedule Section */}
      <Text style={styles.sectionTitle}>School Schedule</Text>
      <TextInput
        style={styles.input}
        placeholder="School Start Time (e.g., 8:00 AM)"
        value={schoolStartTime}
        onChangeText={setSchoolStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="School End Time (e.g., 3:00 PM)"
        value={schoolEndTime}
        onChangeText={setSchoolEndTime}
      />
      <TextInput
        style={styles.input}
        placeholder="School Days (e.g., Mon, Wed, Fri)"
        value={schoolDays}
        onChangeText={setSchoolDays}
      />

      {/* Sleep Schedule Section */}
      <Text style={styles.sectionTitle}>Sleep Schedule</Text>
      <TextInput
        style={styles.input}
        placeholder="Sleep Start Time (e.g., 10:00 PM)"
        value={sleepStartTime}
        onChangeText={setSleepStartTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Sleep End Time (e.g., 6:00 AM)"
        value={sleepEndTime}
        onChangeText={setSleepEndTime}
      />

      {/* Miscellaneous Tasks Section */}
      <Text style={styles.sectionTitle}>Miscellaneous Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Details (e.g., Gym, Groceries)"
        value={miscDetails}
        onChangeText={setMiscDetails}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});