import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import Logo from '../components/Logo';
import ProperButton from '../components/ProperButton';

export const RecoverPasswordScreen = ({navigation}) => {
  const handleRecover = () => {
    alert(`Recovering account ${email}`)
    navigation.navigate('Login')
  }
  const [email, setEmail] = useState('')
  return (
    <View style={styles.container}>
    <View style={styles.card}>
    <Logo size={150}/>
      <View style={{paddingBottom:20}}></View>
        <Text style={styles.title}>Forgot your password?</Text>
        <TextInput onChangeText={(text)=>setEmail(text)} placeholder='Type your email address' style={styles.input} />
        <View style={{display:'flex',flexDirection:'row', width:'80%',justifyContent:'space-around'}}>
          <ProperButton type={'blue'} size={'40%'} text={'Recover'} action={handleRecover} />
        </View>
      <StatusBar style="auto" />
    </View>
    </View>
  )
}

const blue = '#00477A'
const styles = StyleSheet.create({
  container: {
    backgroundColor: blue,
    padding: 20
  },
  card: {
    display: 'flex',
    borderRadius: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 50,
    margin: 12,
    borderColor: '#ddd',
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff'
  },
  image: {
    borderColor: 'black',
    borderWidth: 5,
    height: 150,
    width: 150,
    borderStyle: 'solid',
    marginBottom: 20
  },
  title: {
  fontSize: 20
  }
}); 
