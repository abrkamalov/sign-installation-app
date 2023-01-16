import { doc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native';
import Logo from '../components/Logo';
import ProperButton from '../components/ProperButton';
import { db, auth } from '../firebase';

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  useEffect(() => {
    if (user == null) {
      return
    }
    const logIn = async () => {
      
      
      //navigation.navigate('UserList', {user: {uid: user.uid, email: user.email, isAdmin}})
    }
    logIn() 
  },[user])
  
  const handleSignUp = () => {
    navigation.navigate('Register')
  }
  const handleForgot = () => {
    navigation.navigate('Password')
  }
  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const isAdmin = docSnap.data().isAdmin
      navigation.replace('UserList', {user: {uid: user.uid, email: user.email, isAdmin}})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
      
        <Logo size={150}/>
      <View style={{paddingBottom:20}}></View>
        <Text style={styles.title}>Welcome to PickEco Signs</Text>
        <Text style={styles.terms}>By signing in you are agreeing our Terms and privacy policy</Text>
        <TextInput onChangeText={(text)=>setEmail(text)} placeholder='Type your email' style={styles.input} />
        <TextInput onChangeText={(text)=>setPassword(text)} placeholder='Type your password' style={styles.input} secureTextEntry={true}/>
        <View style={{display:'flex',flexDirection:'row', width:'80%',justifyContent:'space-around'}}>
          <ProperButton type={'blue'} size={'40%'} text={'Register'} action={handleSignUp} />
          <ProperButton type={'white'} size={'40%'} text={'Sign In'} action={handleLogIn} />
        </View>
        <Text onPress={handleForgot} style={styles.forgot}>Forgot password?</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  terms: {
    fontSize: 10,
    marginTop: 20
  },
  forgot: {
    marginTop: 20,
    fontSize: 12
  }
});