import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform
} from "react-native";
import ButtonCustom from "../components/ButtonCustom/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate("confirm-email");
    // console.warn('code to email');
  };
  const onSignInPressed = () => {
    navigation.navigate("sign-in");
    // console.warn('back to Sign in');
  };

  return (
    
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.heads}>
            <Text style={styles.title}>Reset your Password </Text>
          </View>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission here
              console.log(values);

              // if all fields are successful verified and submitted navigate to confirm-email
              navigation.navigate("confirm-email");
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
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <ButtonCustom
                  text="Send"
                  onPress={handleSubmit}
                  type="PRIMARY"
                />
              </View>
            )}
          </Formik>
          <View style={styles.heads}>
            <ButtonCustom
              text="Back to Sign In"
              onPress={onSignInPressed}
              type="TERTIARY"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  heads: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },


 
  
});

export default ForgotPassword;
