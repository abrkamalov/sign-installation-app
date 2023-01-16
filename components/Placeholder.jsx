import { Image, StyleSheet, View } from "react-native"

const Placeholder = ({size}) => {
  return (
        <View style={{
    height: size,
    width: size,
}}>
    <Image
        style={styles.tinyImage}
        source={{uri:'https://www.conquestgraphics.com/images/default-source/blog/open-house-frames-sign.png'}}
      />
           
        </View>
  )
}

export default Placeholder

const styles = StyleSheet.create({
  tinyImage: {
    width: '100%',
    height: '100%',
  }
})
