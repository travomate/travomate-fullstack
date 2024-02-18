import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const CustomInput = ({ value, onChangeText, placeholder, secureTextEntry, error }) => {
  return (
    <>
    <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        {error ? (
          <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
    <View style={styles.container}>
    
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FBFC",
    width: "100%",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    padding: 5,
  },
});

export default CustomInput;
