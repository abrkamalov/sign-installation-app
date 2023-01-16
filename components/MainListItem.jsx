import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Placeholder from "../components/Placeholder";
import dayjs from "dayjs";

const MainListItem = ({item, onPress}) => {
  return (

    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.image} >
        <Placeholder
          style={styles.tinyLogo}
          source={{uri:item.imgUrl}}
        />
      </View>

      <View style={styles.info}>
        <Text style={{fontSize: 10, alignSelf:'flex-start'}}>{dayjs(item.installDate.toMillis()).format("DD MMMM, YYYY")}</Text>
       <Text style={{fontSize: 20}}>{item.address}</Text>
      {item.rushOrder ?  <Text style={{fontSize: 10}}>Rush Order</Text> : null }
      </View>
    </TouchableOpacity>
  )
}

export default MainListItem

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#eee',
    marginVertical: 1
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
  },
  info: {
    display: 'flex',
    paddingLeft: 10,
    justifyContent: 'space-evenly'
  },
  image: {
    height: 90,
    width: 90,
  },
}); 
