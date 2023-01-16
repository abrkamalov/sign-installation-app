import {StyleSheet, View, StatusBar, Text, FlatList} from 'react-native'
import ProperButton from '../components/ProperButton'
import React , {useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox';
import { Linking } from 'react-native';
import { db } from '../firebase';
import {addDoc, collection } from 'firebase/firestore';
import { useRequestStore } from '../zustand';

    


    export const OrderSummaryScreen = ({navigation, route}) => {

      const HST = 0.13
      const [isChecked, setChecked] = useState(false);
      const setRequest = useRequestStore((state) => state.setRequest)
      const request = useRequestStore((state) => state.request)
      const getSubTotal = () => {
        return request.distanceCost +
        request.rushCost +
        request.topperBracketsCost +
        request.fBoxCost +
        request.xlPostsCost 
      }
      const subTotal = getSubTotal()

      const [data, setData] = useState([])

      useEffect(() => {
        setData([
          {optionName: 'Distance', dollar: '$', price: request.distanceCost},
          {optionName: 'Rush order', dollar: '$', price:request.rushCost},
          {optionName: 'Post with topper brackets', dollar: '$', price:request.topperBracketsCost},
          {optionName: 'Flyer box installation', dollar: '$', price:request.fBoxCost},
          {optionName: 'Extra large', dollar: '$', price:request.xlPostsCost}
        ])
      }, [])
      

      const handleCheckout = async () => {
    
        const add = async () => {
          await addDoc(collection(db, "installedSigns"), {...request, subTotal, tax: subTotal * HST, totalCost: subTotal * (1 + HST)})
        }
        add()
        setRequest(null)
        navigation.replace('UserList',{user: route.params.user})
        
      }

      const handleBack = () => {
        navigation.navigate('extras',{user: route.params.user})
      }

      const item = ({item}) => {
      
        return(
          <View style={{flexDirection: 'row'}}>
            <View style={{width:120}}>
              <Text style={{fontSize: 10}}>{item.optionName}</Text>
            </View>
            <View style={{width:10}}>
              <Text style={{fontSize: 12}}>{item.dollar}</Text>
            </View>
            <View style={{width:40}}>
              <Text style={{fontSize: 12}}>{item.price}</Text>
            </View>
            </View>
  
      )

    }


 
    return(

          <View style={styles.container}>
          <View style={styles.card}>

              <View style={{paddingBottom:20}}></View>
              <Text style={styles.title}>Your Order</Text>
              <StatusBar style="auto" />
              
              <View style={{flex:1, justifyContent:"flex-start", marginTop: '2%'}}>
                
                <FlatList
                data={data}
                renderItem = {item}
                keyExtractor = {(item,index) => index.toString()}
                />

              </View>

              <View style={styles.hairline} />

              <View style={{justifyContent:"flex-start", flexDirection: 'row', marginRight: 30}}>
              
                  <Text style={styles.subtotal}>Subtotal</Text>
                  <Text style={{fontWeight: "bold", width: 30}}>CA$</Text>
                  <Text style={{width: 60}}>{subTotal.toFixed(2)}</Text>

              </View>

              
              <View style={{justifyContent:"flex-start", flexDirection: 'row', marginLeft: 10}}>
                  <Text style={{width: 115, fontSize: 8, alignSelf: 'center',  alignContent: 'flex-start' }}>Estimated HST $</Text>
                  <Text style={{width: 60, alignSelf: 'center',  alignContent: 'flex-end'}}>{(subTotal * HST).toFixed(2)}</Text>
              </View>

              <View style={styles.endLine} />

              <View style={{justifyContent:"flex-start", flexDirection: 'row',  marginLeft: 60}}>
              
                  <Text style={{width: 40, fontWeight: "bold"}}>Total</Text>
                  <Text style={{fontWeight: "bold", width: 30}}>CA$</Text>
                  <Text style={{width: 60}}>{(subTotal * (1 + HST)).toFixed(2)}</Text>

              </View>

              <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text style={{fontSize: 13}}>Agree to terms and conditions</Text>
              </View>
              
                  <Text style={{color: 'blue', fontSize: 11}}
                        onPress={() => Linking.openURL('http://google.com')}>
                        Extra charge policy 
                  </Text>
              

              <View style={{paddingBottom:20}}></View> 
              <View style={{display:'flex', flexDirection:'row', width:'80%',justifyContent:'space-around'}}>
                  <ProperButton size={120} type={'blue'} text={'Back'} action={handleBack} />
                  <ProperButton size={120} type={isChecked ? 'white' : 'disabled' } text={'Checkout'} action={isChecked ? handleCheckout: null} />
              </View> 

           
          </View>
          </View>
        );
    };


  const blue = '#00477A'
  const styles = StyleSheet.create({
    
    container: {
      backgroundColor: "white",
      padding: 20    
    },

    card: {
      display: 'flex',
      borderRadius: 20,
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#669bbc',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 2,
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
    },

    title: {
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    
    hairline: {
      backgroundColor: '#A2A2A2',
      height: 2,
      width: 190,
      alignItems: 'center'
    },

    subtotal: {
      fontSize: 14,
      fontWeight: "bold",
      width: 100,
      marginLeft: 20
    },

    endLine: {
      backgroundColor: '#A2A2A2',
      height: 2,
      width: 135,
      marginLeft: 50
    },
       checkBox: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
      },

  });

