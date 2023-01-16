import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import ProperButton from '../components/ProperButton';
import SelectList from 'react-native-dropdown-select-list'
import { useRequestStore } from '../zustand';


export const RequestExtraScreen = ({navigation, route}) => {
  const isFirstRender = useRef(true);
  const setRequest = useRequestStore((state) => state.setRequest)
  const request = useRequestStore((state) => state.request)
  const [fBoxInstalledBy, setFBoxInstalledBy] = useState("Realtor")
  const [xlPosts, setXlPosts] = useState(false)
  const [rushOrder, setRushOrder] = useState(false)
  const [topperBrackets, setTopperBrackets] = useState(false)

  const yesNoList = [{key:true,value:'Yes'},{key:false,value:'No'}] 
  const boxList = [{key:'Realtor',value:'Realtor'},{key:'Us',value:'Us'}, {key:'None', value:'None'}] 
  const isConfirmed = false

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 👈️ return early if initial render
    }
    if (!request) {return}
    console.log(request)

    navigation.navigate('OrderSummary',{user: route.params.user})

  }, [request])

  checkfBoxCost = () => {
    if (fBoxInstalledBy == 'Us') {
      return 15;
    } else if (fBoxInstalledBy == 'Realtor') {
      return 3
    } else {
      return 0;
    }
  };

  const handleCheckout = () => {
    const rushCost = rushOrder ? 20 : 0
    const xlPostsCost = xlPosts ? 10 : 0
    const topperBracketsCost = topperBrackets ? 2 : 0
    const fBoxCost = checkfBoxCost()

    setRequest( { ...request,
      isConfirmed,
      fBoxInstalledBy,
      fBoxCost,
      xlPosts,
      xlPostsCost,
      rushOrder,
      rushCost,
      topperBrackets,
      topperBracketsCost,
      createdOn: Date.now()
    })

    
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <View style={{paddingBottom:20}}></View>
        
    
    <View style={styles.line}>
    <Text style={styles.field}>Flyer box installation:</Text>
    <SelectList search={false} placeholder={'Realtor'} setSelected={setFBoxInstalledBy} data={boxList} />
    </View>
    <View style={styles.line}>
    <Text style={styles.field}>Extra large posts:</Text>
    <SelectList search={false} placeholder={'No'} setSelected={setXlPosts} data={yesNoList} />
    </View>
    <View style={styles.line}>
      <View style={styles.noteCol}>
        <Text style={styles.field}>Rush order:</Text>
        <Text style={styles.note}>Within 24hrs</Text>
      </View>
    <SelectList search={false} placeholder={'No'} setSelected={setRushOrder} data={yesNoList} />
    </View>
    <View style={styles.line}>
    <Text style={styles.field}>Topper brackets:</Text>
    <SelectList search={false} placeholder={'No'} setSelected={setTopperBrackets} data={yesNoList} />
    </View>
      <View style={{paddingBottom:20}}></View>
          <ProperButton type={'white'} size={'35%'} text={'Checkout'} action={handleCheckout} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: blue,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5
  
  },
  field: {
    fontWeight: 'bold',
  },
  note: {
    fontStyle: 'italic',
    fontSize: 10
  },
  noteCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '45%'
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
  line: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10
  }
}); 
