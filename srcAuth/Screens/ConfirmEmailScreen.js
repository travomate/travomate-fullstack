import React,{useState} from "react";
import { View, Text, ScrollView, StyleSheet, TextInput,KeyboardAvoidingView } from "react-native";
import ButtonCustom from "../components/ButtonCustom/ButtonCustom";
import CustomInput from "../components/CustomInput/CustomInput";
import { useNavigation, useRoute } from "@react-navigation/native";

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
const [username, setUsername] = useState('')
const [code, setCode] = useState('')

  const onConfirmPressed = () => {
    navigation.navigate('newPassword');
    // console.warn('go to New password')
  };

  // const onSignInPressed = () => {
  //   // navigation.navigate('Sign In');
  //   console.warn('go to sign in')
  // };

  const onResendCodePressed = () => {
    console.warn('Resend Code');
  };

  return (
    <View style={styles.mainContainer}>
    <ScrollView>
    <KeyboardAvoidingView 
    style={{flex:1}}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.root}>
        <Text style={styles.title}>Confirm your Email </Text>
        {/* <TextInput
          placeholder="username"
          style={styles.container}
          value={route?.params?.username}
          editable={false}
        /> */}
        <CustomInput
             placeholder="username"
             value={route?.params?.username}
             onChangeText={(text)=>setUsername(text)}
            />


        {/* <TextInput
          placeholder="Enter confirmation code"
          style={styles.container}
        /> */}
         <CustomInput
             placeholder="Enter confirmation code"
             value={code}
             onChangeText={(text)=>setCode(text)}
            />

        <ButtonCustom
          text='Confirm'
          onPress={onConfirmPressed}
          type="PRIMARY"
        />
        <ButtonCustom
          text='Resend Code'
          onPress={onResendCodePressed}
          type="SECONDARY"
        />
        {/* <ButtonCustom
          text="Back to Sign In"
          onPress={onSignInPressed}
          type="TERTIARY"
        /> */}
      </View>
      </KeyboardAvoidingView>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
     marginTop:40
  },
  root: {
    padding: 20,
  },
  container: {
    backgroundColor: '#F9FBFC',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 9,
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
    marginTop: 20,
  },
  facebookButton: {
    backgroundColor: '#E7EAF4',
    marginTop: 8,
  },
  facebookButtonTitle: {
    color: '#4765A9',
  },
  googleButton: {
    backgroundColor: '#FAE9EA',
    marginTop: 8,
  },
  googleButtonTitle: {
    color: '#DD4D44',
  },
  appleButton: {
    backgroundColor: '#e3e3e3',
    marginTop: 8,
  },
  appleButtonTitle: {
    color: '#363636',
  },
});

export default ConfirmEmailScreen;
