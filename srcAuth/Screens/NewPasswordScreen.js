import React,{ useState } from "react";
import { View,Text,ScrollView,StyleSheet,KeyboardAvoidingView,TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../components/CustomInput/CustomInput";
import ButtonCustom from "../components/ButtonCustom/ButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";


const validationSchema = yup.object().shape({
  NewPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("NewPassword"), null], "Passwords must match")
    .required("confirmPassword is required"),
});

const NewPasswordScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const navigation = useNavigation();
    
   
    const onSubmitPressed = () =>{
      navigation.navigate('sign-in');
    };

  return (
    <KeyboardAvoidingView 
    style={{flex:1}}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.head}>
            <Text style={styles.title}>Create an Account</Text>
          </View>
          <Formik
            initialValues={{
              NewPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission here
              console.log(values);

              // if all fields are successful verified and submitted navigate to sign in
              navigation.navigate("sign-in");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your new password"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("NewPassword")}
                    onBlur={handleBlur("NewPassword")}
                    value={values.NewPassword}
                  />
                 {values.NewPassword &&(
                  <FontAwesome
                    name={showPassword ? "eye" : "eye-slash"}
                    size={24}
                    color="#888"
                    style={styles.passwordIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                 )}
                </View>
                {touched.NewPassword && errors.NewPassword && (
                  <Text style={styles.errorText}>{errors.NewPassword}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    secureTextEntry={!showRepeatPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  {values.confirmPassword && (
                    <FontAwesome
                    name={showRepeatPassword ? "eye" : "eye-slash"}
                    size={24}
                    color="#888"
                    style={styles.passwordIcon}
                    onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                  />
                  )}
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <ButtonCustom
                  text="Submit"
                  onPress={handleSubmit}
                  type="PRIMARY"
                />
              </View>
            )}
          </Formik>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>

);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "white",
  },
  head: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  passwordIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  passwordContainer: {
    position: "relative",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
title:{
  fontSize:24,
  fontWeight:'bold',
  color:'#051C60',
},
});


export default NewPasswordScreen