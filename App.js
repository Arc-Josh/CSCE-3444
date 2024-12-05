import React, {useState} from 'react';
import { TouchableOpacity, Alert, SafeAreaView, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './app/assets/screens/signup';
import Signin from './app/assets/screens/signin';
import Home from './app/assets/screens/home';
import Canvaslink from './app/assets/screens/canvaslog';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signin"
          component={Signin}
        />
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Canvaslink" component={Canvaslink}/>
         
           
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
