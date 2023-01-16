import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import Logo from '../components/Logo';
import MainListItem from '../components/MainListItem';
import ProperButton from '../components/ProperButton';
import {db} from '../firebase'
import { useRequestStore } from '../zustand';

export const MainUserListScreen = ({navigation,route}) => {
    const request = useRequestStore((state) => state.request)
    const loggedUser = route.params.user
    const handleSubmit = () => {
     navigation.navigate('RequestMain', {user:loggedUser})
    }

    const handlePress = async (item) => {
      const id = item.id
      const docRef = doc(db, "installedSigns", id);
      const docSnap = await getDoc(docRef);
      const itemDetails = docSnap.data()
      itemDetails.installDate = itemDetails.installDate.toMillis()
      itemDetails.dateValid = itemDetails.dateValid.toMillis()
      console.log("Document data:", itemDetails);
      
      if (loggedUser.isAdmin) {
        navigation.navigate("AdminDetails", {user:loggedUser, item:itemDetails, itemId: id})
      } else {
        navigation.navigate("Details", {user:loggedUser, item:itemDetails, itemId: id})
      }
    }

    const [installedSigns, setInstalledSigns] = useState([])


    useEffect(() => {
        const getInstalledSigns = async () => {
        console.log('loged uuid: ' + loggedUser.uid)
        let q
        if (loggedUser.isAdmin) {
          q = query(collection(db,'installedSigns'), orderBy('installDate'))
        } else {
          q = query(collection(db,'installedSigns'), where('userId', '==', loggedUser.uid), orderBy('installDate'));
        }
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size == 0) {
        } else {
            let arr = []
            querySnapshot.forEach((doc) => {
                arr = [...arr, {id:doc.id, ...doc.data()}]
            })
            setInstalledSigns(arr)
        }

        }
        getInstalledSigns()

    }, [request])

    const renderItem = ({item}) => (
        <MainListItem onPress={() => handlePress(item)} item={item}/>
    )

  return (
    <View>
{ loggedUser.isAdmin ?  
  <View style={styles.containerred}>
  <View style={styles.card}>
    <Logo size={70}/>
      <Text style={styles.title}>Current Signs List</Text>
      <View style={{ width:'100%', height:'65%', alignItems:'center'}}>
          <FlatList
              style={{width:'95%'}}
              data={installedSigns}
              renderItem={renderItem}
              keyExtractor={item=>item.id}
          />
      </View>
          {/* <ProperButton type={'red'} size={'70%'} text={'Request Installation'} action={handleSubmit}/> */}
    <StatusBar style="auto" />
  </View>
  </View>
      
: <View style={styles.container}>
<View style={styles.card}>
  <Logo size={70}/>
    <Text style={styles.title}>Current Signs List</Text>
    <View style={{ width:'100%', height:'65%', alignItems:'center'}}>
        <FlatList
            style={{width:'95%'}}
            data={installedSigns}
            renderItem={renderItem}
            keyExtractor={item=>item.id}
        />
    </View>
        <ProperButton type={'blue'} size={'70%'} text={'Request Installation'} action={handleSubmit}/>
  <StatusBar style="auto" />
</View>
</View> }

</View>
  )
}

const red = '#780000'
const blue = '#00477A'
const styles = StyleSheet.create({
  container: {
    backgroundColor: blue,
    padding: 20
  },
  containerred: {
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
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fdf0d5'
  },
  image: {
    borderColor: 'black',
    borderWidth: 5,
    height: 90,
    width: 90,
    borderStyle: 'solid',
    marginBottom: 20
  },
  title: {
  fontSize: 20
  }
}); 

