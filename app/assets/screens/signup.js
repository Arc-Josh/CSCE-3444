import React, {useState} from 'react';
import { TouchableOpacity, Alert, SafeAreaView, StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function Signup({navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: '#FFFFFF'}}>
      <View style={styles.container}>
          <View style = {styles.header}>
      <Text style={styles.title}>Sign up for Schedy</Text>
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

           <View style={styles.input}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  style={styles.inputControl}
                  placeholder="John Doe"
                  placeholderTextColor="#6b7280"
                  value={form.name}
                  onChangeText={name => setForm({...form,name})}
                  />
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
          onPress={async ()=> {
            //handle onPress
              try{
              const response = await fetch('http://localhost:8081/register', {
              method: 'POST',
              headers:{
                'Content-type':'application/json',
              },
              body: JSON.stringify({
                username: form.name,
                password: form.password,
                email: form.email,
              }),
            });            
                const data = await response.json();
              if(response.ok) {
                Alert.alert('Successfully signed up!');
              }else{
                Alert.alert('Error signing up', data.error || 'unknown error occured');
              }
            }catch(error){
              Alert.alert('Error','Could not connect to server');
              console.error(error);
            } 
          }}>
          <View style={styles.btn}>
             <Text style={styles.btnText}>Sign up</Text>
          </View>
        </TouchableOpacity>
  </View>
  <TouchableOpacity
    style={{marginTop: 'auto'}}
     onPress={() =>{ navigation.navigate("Signin")
      //handle onPress
  }}>
    <Text style={styles.formFooter}>
      Have an account? <Text style={{textDecorationLine: 'underline'}}></Text>Log in!</Text>
  </TouchableOpacity>
</View>
</View>
</View>
</View>
</SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
      padding: 24,
      flex: 1,
  },
  header: {
      marginVertical: 36,
  },
  title: {
      fontSize: 27,
      fontWeight: '700',
      color: '#010101',
      marginBottom: 6,
      textAlign: 'center',
  },
  subtitle:{
      fontSize: 15,
      fontWeight: '500',
      color: '#010101',
      textAlign: 'center'
  },
  input: {
    marginBottom: 16, 

  },
  inputLabel:{
      fontSize: 17,
      fontWeight: '600',
      color: '#222',
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
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#075eec',
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
