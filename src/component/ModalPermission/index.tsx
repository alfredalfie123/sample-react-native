import React from 'react';
import { Modal, Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

const ModalPermission = ({ btnCancel, btnOk,  message, modalVisible, onPressCancel, onPressOk, image }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{message}</Text>
          <Image style={styles.image} source={image}/>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onPressCancel}>
            <Text>{btnCancel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOk} onPress={onPressOk}>
            <Text>{btnOk}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalPermission;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  buttonCancel: {
    padding: 10,
    borderColor: 'gray',
    borderRadius: 3,
    width: 80,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonOk: {
    padding: 10,
    marginLeft: 30,
    borderRadius: 3,
    width: 80,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  image: {
    padding: 10,
  }
})