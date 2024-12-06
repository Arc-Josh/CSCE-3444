import React, {useState} from 'react';
import { TouchableOpacity, Alert, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Signin({navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#FFFFFF'}}>
      <View style={styles.container}>
          <View style = {styles.header}>
      <Text style={styles.title}>Sign in to Schedy</Text>
      <Text style={styles.subtitle}>
        Manage your time efficiently
        </Text>
        </View>
        
      <View style={styles.form}>
          <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  style={styles.inputControl}
                  placeholder="johndoe@gmail.com"
                  placeholderTextColor="#6b7280"
                  value={form.email}
                  onChangeText={email => setForm({...form,email})}
                  />
        </View>
          <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                  secureTextEntry
                  style={styles.inputControl}
                  placeholder='********'
                  placeholderTextColor={'#6b7280'}
                  value={form.password}
                  onChangeText={password => setForm({...form,password})}
                />
            
      </View>
      <View style={styles.formAction}>
        <TouchableOpacity
            //handle onPress
          onPress={async ()=> {
           try{
            const response = await fetch('http://192.168.1.158:8080/login', {
              method: 'POST',
              headers:{
                'Content-type':'application/json',
              },
              body: JSON.stringify({
                username: form.username,
                password: form.password,
              }),
              //mode: 'cors'
            });       
              const data = await response.json();
              if(response.ok) {
                Alert.alert('Successfully logged in!');
                navigation.navigate("Home");
              }else{
                Alert.alert('Error logging in', data.error || 'unknown error occured');
              }
            }catch(error){
              Alert.alert('Error','Could not connect to server');
              console.error(error);
            } 
          }}>

          <View style={styles.btn}>
             <Text style={styles.btnText}>Sign in</Text>
          </View>
        </TouchableOpacity>
  </View>
  <TouchableOpacity
    style={{marginTop: 'auto'}}
    onPress={() =>{ navigation.navigate("Signup")
      //handle onPress
  }}> 
    <Text style={styles.formFooter}>
      Don't have an account? <Text style={{textDecorationLine: 'underline'}}></Text>Sign Up!</Text>
      </TouchableOpacity>
      
  <TouchableOpacity
    style={{marginTop: 'auto'}}
    onPress={() =>{ navigation.navigate("Canvaslink")
      //handle onPress
  }}>
  </TouchableOpacity>
</View>
</View>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#1E152A'
},
header: {
    marginVertical: 36,
    backgroundColor: '#1E152A'
},
title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#F7DD72',
    marginBottom: 6,
    textAlign: 'center',
},
subtitle:{
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
},
input: {
  marginBottom: 16, 
},
inputLabel:{
    fontSize: 17,
    fontWeight: '600',
    color: '#F7DD72',
    marginBottom: 8,
},
inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222'
},
form: {
  marginBottom: 50,
  flex: 1,
},
formAction: {
  marginVertical: 24,
},
formFooter: {
  fontSize: 17, 
  fontWeight: '600',
  color: '#FEFDFF',
  textAlign: 'center',
  letterSpacing: 0.15
},
btn: {
  backgroundColor: '#1E152A',
  borderRadius: 8,
  borderWidth: 1, 
  borderColor: '#1E152A',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
},
btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  }
});
