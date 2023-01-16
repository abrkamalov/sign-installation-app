import { StyleSheet, Text, TouchableOpacity,  } from "react-native"

const ProperButton = ({type, text, action, size}) => {
  if (type == 'blue'){
  return (
        <TouchableOpacity style={[{width:size}, styles.buttonWhiteOnBlue]} onPress={action}>
          <Text style={styles.buttonWhiteOnBlueText}>{text}</Text>
        </TouchableOpacity>
  )
  } else if (type == 'white'){
    return (
        <TouchableOpacity style={[{width:size}, styles.buttonBlueOnWhite]} onPress={action}>
          <Text style={styles.buttonBlueOnWhiteText}>{text}</Text>
        </TouchableOpacity>
    )
  } else if (type == 'red'){
    return (
        <TouchableOpacity style={[{width:size}, styles.buttonWhiteOnRed]} onPress={action}>
          <Text style={styles.buttonWhiteOnRedText}>{text}</Text>
        </TouchableOpacity>
    )
  } else if (type == 'disabled'){
    return (
        <TouchableOpacity disabled style={[{width:size}, styles.buttonDisabled]} onPress={action}>
          <Text style={styles.buttonDisabledText}>{text}</Text>
        </TouchableOpacity>
    )
  }
}

export default ProperButton

const red = '#780000'
const blue = '#00477A'
const styles = StyleSheet.create({
  buttonBlueOnWhite: {
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: blue,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  buttonWhiteOnBlue: {
    elevation: 5,
    backgroundColor: blue,
    borderColor: blue,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  buttonWhiteOnRed: {
    elevation: 5,
    backgroundColor: red,
    borderColor: "#fff",
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  buttonBlueOnWhiteText: {
    fontSize: 18,
    color: blue,
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
  buttonWhiteOnRedText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  buttonDisabled: {
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 2,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  buttonDisabledText: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
}); 
