import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

export default function Main({ navigation }) {
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
      <View style={styles.sectionContainer}>
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
      </View>

      {/* School Schedule Section */}
      <View style={styles.sectionContainer}>
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
      </View>

      {/* Sleep Schedule Section */}
      <View style={styles.sectionContainer}>
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
      </View>

      {/* Miscellaneous Tasks Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Miscellaneous Tasks</Text>
        <TextInput
          style={styles.input}
          placeholder="Details (e.g., Gym, Groceries)"
          value={miscDetails}
          onChangeText={setMiscDetails}
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} color="#637074" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#BDD4E7',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#212227',
  },
  sectionContainer: {
    backgroundColor: '#fff', 
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212227',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#AAB9CF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#212227',
  },
});