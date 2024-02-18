import React from 'react';
import { Text,View, StyleSheet, TouchableOpacity } from 'react-native';


const Buttons = ({ title, onPress, buttonStyle, titleStyle }) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={[styles.buttonTitle, titleStyle]}>{title}</Text>
  </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 
    button: {
      width:200,
      height: 48,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:3,
    },
    buttonTitle: {
      color: 'black',
    },
  });
  

export default Buttons