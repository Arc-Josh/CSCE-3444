import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Schedy! </Text>
      <Button 
      title='Log in right here'
      onPress={() => console.log("Button Tapped.")}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDD4E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
