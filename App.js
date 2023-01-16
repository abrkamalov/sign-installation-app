import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DevSettings, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LoginScreen } from './screens/LoginScreen';
import { MainUserListScreen } from './screens/MainUserListScreen';
import { RecoverPasswordScreen } from './screens/RecoverPasswordScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { RequestMainScreen } from './screens/RequestMainScreen';
import { FontAwesome } from '@expo/vector-icons';
import { RequestExtraScreen } from './screens/RequestExtraScreen';
import { DetailsScreen } from "./screens/DetailsScreen";
import { AdminDetailsScreen } from "./screens/AdminDetailsScreen";
import UserLogo from './components/UserLogo';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { Alert } from 'react-native';
import { OrderSummaryScreen } from "./screens/OrderSummaryScreen";
import { CameraScreen } from './screens/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const logout = async () => {
    try {
        signOut(auth).then(() => {
            // Sign-out successful.
            Alert.alert("Logged out")
             DevSettings.reload()
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
          
         
      } catch (e){
       // an error
       console.log(e)
      }
}
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="UserList" component={MainUserListScreen} options={{title:'Installed Signs', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="Register" component={RegistrationScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Password" component={RecoverPasswordScreen} options={{title:'Password Recovery', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{title:'Checkout', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="RequestMain" component={RequestMainScreen} options={{title:'Installation Request', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="extras" component={RequestExtraScreen} options={{title:'Installation Request', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{title:'Installation Details', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="CameraScreen" component={CameraScreen} options={{title:'Installation picture', headerRight: ()=> <UserLogo logout={logout}/>}}/>
        <Stack.Screen name="AdminDetails" component={AdminDetailsScreen} options={{title:'Admin Installation Details', headerRight: ()=> <UserLogo logout={logout}/>}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const blue = '#00477A'
const styles = StyleSheet.create({
  icon: {
    fontWeight: 'bold'
  },
  menu: {
    height: '100%',
    width: '100%',
    zIndex: 500,
    backgroundColor: 'white'
  }
});