import React from 'react'
import { TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';



function UserLogo({logout}) {
    
    
    const showAlert = () => {
        
      Alert.alert(
        "Logout",
        "Do you want to log out from your account?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: logout,
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }
    return (
    <TouchableOpacity onPress={showAlert}>
      <FontAwesome style={styles.icon} name="user-circle-o" size={40} color={blue} />
    </TouchableOpacity>
    
  )
}

const blue = '#00477A'
const styles = StyleSheet.create({
    icon: {
      fontWeight: 'bold'
    }
  });

export default UserLogo