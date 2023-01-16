import { StyleSheet, Text, View, StatusBar } from 'react-native';
import dayjs from "dayjs";
import Placeholder from "../components/Placeholder";

export const DetailsScreen = ({route}) => {
  const item = route.params.item

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
        <Text style={styles.boldText}>{item.isConfirmed == true ? "Request Confirmed" : "Not Confirmed"}</Text>
        <Text style={styles.boldText}>{item.company}</Text>
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
