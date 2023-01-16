import { Image, StyleSheet, View } from "react-native"

const Logo = ({size}) => {
  return (
        <View style={{
    height: size,
    width: size,
}}>
    <Image
        style={styles.tinyLogo}
        source={{uri:'https://images.unsplash.com/photo-1614469723922-c043ad9fd036?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAzfHxzaWdufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60'}}
      />
           
        </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    height: '100%',
  }
})
