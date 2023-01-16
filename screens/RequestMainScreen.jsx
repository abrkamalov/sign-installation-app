import { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Platform, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProperButton from '../components/ProperButton';
import SelectList from 'react-native-dropdown-select-list'
import { FontAwesome } from '@expo/vector-icons';
import { useRequestStore } from '../zustand';

export const RequestMainScreen = ({ navigation, route }) => {
  const setRequest = useRequestStore((state) => state.setRequest)
  const request = useRequestStore((state) => state.request)
  const [date, setDate] = useState(new Date(Date.now()));
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState("")

  const [color, setColor] = useState("White")
  const [size, setSize] = useState("10x10")
  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const colorList = [{key:'Black',value:'Black'},{key:'White',value:'White'}] 
  const sizeList = [{key:'10x10',value:'10x10'},{key:'20x10',value:'20x10'}] 

  const showDatepicker = () => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
  };
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function checkDate(date){
    let today = new Date()
    if (date.getDate() < today.getDate()) {
      return true
    }
    return false
  }
 

  const handleNext = () => {
    //const colorCost = color == 'White' ? 300 : 400
    //const sizeCost = size == '10x10' ? 300 : 400
    const distanceCost = 70 // fixed for now

    setErrorMessage("")

    setRequest({
      installDate: date,
      dateValid: addDays(date, 30),
      color,
      //colorCost,
      size,
     // sizeCost,
      address,
      distanceCost,
      userId: route.params.user.uid
    })
    console.log(request)

    if (address.trim() == "") {
      setErrorMessage("Please enter an address")
      return
    }

    if (checkDate(date)) {
      setErrorMessage("Please enter a valid date")
      return
    }
    
   navigation.navigate('extras', {user: route.params.user})
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <View style={{paddingBottom:20}}></View>
        { errorMessage != "" && <Text style={styles.error}>{errorMessage}</Text> }
        <TextInput onChangeText={(text)=>setAddress(text)} placeholder='Installation Address' style={styles.input} />
    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    <View style={styles.line}>
      <View style={styles.noteCol}>
        <Text style={styles.field}>Installation Date:</Text>
        <Text style={styles.note}>+/-2 Business Days</Text>
      </View>
    <TouchableOpacity style={styles.date} onPress={showDatepicker}>
    <Text>{date.toDateString()}</Text>
    <FontAwesome style={{marginLeft: 10}} name="calendar" size={20} color={blue} />
    </TouchableOpacity>
    </View>
    <View style={styles.line}>
    <Text style={styles.field}>Color:</Text>
    <SelectList search={false} placeholder={'White'} setSelected={setColor} data={colorList}/>
    </View>
    <View style={styles.line}>
    <Text style={styles.field}>Size:</Text>
    <SelectList search={false} placeholder={'10x10'} setSelected={setSize} data={sizeList} />
    </View>
      <View style={{paddingBottom:20}}></View>
          <ProperButton type={'white'} size={'30%'} text={'Next'} action={handleNext} />
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
  },
  error: {
    fontSize: 10,
    marginTop: 20,
    color: "red"
  }
}); 
