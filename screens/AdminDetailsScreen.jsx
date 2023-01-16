import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import ProperButton from '../components/ProperButton';
import dayjs from "dayjs";
import Placeholder from "../components/Placeholder";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

export const AdminDetailsScreen = ({navigation, route}) => {
  const item = route.params.item

  const data = {
    isConfirmed: true
  }
  const handleCamera = () => {
    navigation.navigate('CameraScreen', {item})
  }
  const handleDelete = async () => {
    await deleteDoc(doc(db, 'installedSigns', route.params.itemId));
    alert("Item Deleted")
    navigation.replace('UserList', {user: route.params.user})
  }
  const handleConfirm = async () => {
    await updateDoc(doc(db,'installedSigns', route.params.itemId), data);
    alert("Request Confirmed")
    navigation.replace('UserList', {user: route.params.user})
  }
  const confirmDeleteDialog = () => {
    return Alert.alert(
        "Delete",
        "Are you sure you want to delete this sign?",
        [
          {
            text: "Yes",
            onPress: () => {
              handleDelete()
            },
          }, { text: "No" }
        ]
    )
  }
  const confirmationDialog = () => {
    return Alert.alert(
        "Confrim",
        "Would you like to confirm this request?",
        [
          {
            text: "Yes",
            onPress: () => {
              handleConfirm()
            },
          }, { text: "No" }
        ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{paddingBottom:20}}></View>
        <Text style={styles.title}>{item.address}</Text>
        <View style={styles.img}><Placeholder size={150}/></View>
        <Text style={styles.normalText}>Requested install date:</Text>
        <Text style={styles.boldText}>{dayjs(item.installDate).format("DD MMMM, YYYY")}</Text>
        <Text style={styles.normalText}>Valid until: <Text style={styles.boldText}>{dayjs(item.dateValid).format("DD MMMM, YYYY")}</Text></Text>
        <Text style={styles.normalText}>Flyerbox provided by: <Text style={styles.boldText}>{item.fBoxInstalledBy}</Text></Text>
        <StatusBar style="auto" />
        <View style={{display:'flex',flexDirection:'row', width:'95%',justifyContent:'space-around',top:25}}>
          <ProperButton type={'red'} size={'31%'} text={'Delete'} action={confirmDeleteDialog}/>
          <ProperButton type={item.isConfirmed ? 'disabled' : 'red'} size={'31%'} text={'Confirm'} action={item.isConfirmed ? null : confirmationDialog}/>
          <ProperButton type={'red'} size={'31%'} text={'Picture'} action={handleCamera}/>
        </View>
      </View>
    </View>
  )
}

const red = '#780000'

const styles = StyleSheet.create({
  container: {
    backgroundColor: red,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  boldText: {
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },
  normalText: {
    padding: 15,
    fontSize: 20
  },
  img: {
    padding: 30
  }
});
