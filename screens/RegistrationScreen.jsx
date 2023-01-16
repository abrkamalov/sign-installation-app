import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image , ScrollView} from 'react-native';
import Logo from '../components/Logo';
import ProperButton from '../components/ProperButton';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';

export const RegistrationScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState("")

  const handleSignUp = async () => {
    setErrorMessage("")
    if (firstName == "" || lastName == "") {
      setErrorMessage("Name fields can't be empty")
      return
    }
    if (password == "") {
      setErrorMessage("Password field can't be empty")
      return
    }
    if (password != confirmpassword) {
      setErrorMessage("Passwords don't match")
      return
    }
    let name = firstName + " " + lastName
    if (Boolean(name.match(/\d/))) {
      setErrorMessage("Invalid Name")
      return
    }

    if (Boolean(phone.match(/\d{10}/)) == false || phone.length > 10) {
      setErrorMessage("Invalid Phone Number")
      return
    }
    
    let user
    try {
      user = await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage(`Email address ${email} already in use`);
          break;
        case 'auth/invalid-email':
          setErrorMessage(`Email address ${email} is invalid`);
          break;
        case 'auth/missing-email':
          setErrorMessage(`Email address ${email} is invalid`);
          break;
        case 'auth/operation-not-allowed':
          setErrorMessage(`Error during sign up`);
          break;
        case 'auth/weak-password':
          setErrorMessage('Password is not strong enough');
          break;
        case 'auth/invalid-password':
          setErrorMessage('Invalid password. Check length')
        default:
          console.log(error.message);
          break;
      }
      return
    }
    console.log(user.user.uid)
    const data = {
      name: `${name}`,
      phoneNumber: phone,
      email: email
    };
    await setDoc(doc(db, "users", user.user.uid), data)
    navigation.navigate('Login')
  }
  const handleCancel = () => {
    navigation.navigate('Login')
  }
  return (
    <ScrollView style={styles.container} >
      <View style={styles.card}>
    <Logo size={150}/>
      <View style={{paddingBottom:20}}></View>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.terms}>By signing up you are agreeing our Terms and privacy policy</Text>
        
        { errorMessage != "" && <Text style={styles.error}>{errorMessage}</Text> }
        
        <TextInput onChangeText={(text)=>setFirstName(text)} placeholder='Type your first name' style={styles.input} />
        <TextInput onChangeText={(text)=>setLastName(text)} placeholder='Type your last name' style={styles.input} />
        <TextInput onChangeText={(text)=>setEmail(text)} placeholder='Type your email' style={styles.input} />
        <TextInput onChangeText={(text)=>setPhone(text)} keyboardType={"phone-pad"} placeholder='Type your phone number' style={styles.input} />
        <TextInput onChangeText={(text)=>setPassword(text)} placeholder='Type your password' style={styles.input} secureTextEntry={true}/>
        <TextInput onChangeText={(text)=>setConfirmPassword(text)} placeholder='Confirm your password' style={styles.input} secureTextEntry={true}/>
        <View style={{display:'flex',flexDirection:'row', width:'80%',justifyContent:'space-around'}}>
          <ProperButton type={'blue'} text={'Sign Up'} action={handleSignUp} />
          <ProperButton type={'white'} text={'Cancel'} action={handleCancel} />
        </View>
      <StatusBar style="auto" />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#669bbc',
    padding: 10
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
  error: {
    fontSize: 10,
    marginTop: 20,
    color: "red"
  },
  forgot: {
    marginTop: 20,
    fontSize: 12
  },
  buttonBlueOnWhite: {
    width: '40%',
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: '#669bbc',
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  buttonWhiteOnBlue: {
    width: '40%',
    elevation: 5,
    backgroundColor: "#669bbc",
    borderColor: '#669bbc',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  buttonBlueOnWhiteText: {
    fontSize: 18,
    color: "#669bbc",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  buttonWhiteOnBlueText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
}); 
