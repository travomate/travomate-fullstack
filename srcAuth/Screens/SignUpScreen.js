import React, { useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import ButtonCustom from "../components/ButtonCustom/ButtonCustom";
import Buttons from "../components/ButtonCustom/Buttons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import LoadingButtonUp from "../components/ButtonCustom/signUpButton/LoadingButtonUp";
import Client from "../api/Client";
import { SignIn } from "../api/User";
import { useLogin } from "../context/LoginProvider";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Name is Invalid")
    .required("Name is required"),
  username: yup
    .string()
    .trim()
    .min(3, "Username is Invalid")
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat Password is required"),
});

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const {setIsLoggedIn, setProfile} = useLogin();
  // functiions
  const navigation = useNavigation();


  const onSignInFacebook = () => {
    console.warn("Sign in facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Sign in google");
  };


  const onTermsPressed = () => {
    console.warn("Terms and conditions");
  };

  const onPrivacyPressed = () => {
    console.warn("Privacy and conditions");
  };

  const onSignInPressed = () => {
    navigation.navigate("sign-in");
  };
  // **** ends here****


  // when Registration (sign up) button is clicked call this function

  const signUp = async (values, formikActions) => {
    try {
      const res = await Client.post("users/", {
        ...values,
      });
  
      if (res.data.success) {
        // Perform the sign-in after successful sign-up

        // we commented this cose i want to use signIn method a reusable component to use it everywhere we want to sign in
         

        //  ****** commented ****
        // const signInRes = await Client.post("/users/sign-in", {
        //   email: values.email,
        //   password: values.password,
        // }); 
        //  ****** commented ****

         const signInRes = await SignIn(values.email, values.password)
  
        if (signInRes.data.success) {
          navigation.replace('upload-profile', { token: signInRes.data.token});

        } else {
          console.log("Sign-in failed:", signInRes.data.message);
        }
        if (signInRes.data && signInRes.data.user) {
          
          // setIsLoggedIn(true) , know more about this cose it is taking u somewhere else
          setProfile(signInRes.data.user)
          console.log(signInRes.data.user);
        }
        
        else { 
          console.log('Invalid response from the server:', signInRes.data);
          // Handle the case when the API response is not as expected
        }
        
      } else {
        console.log("Sign-up failed:", res.data.message);
      }
    } catch (error) {
      console.log("Error during API call:", error.message);
      // Handle the API error
    }
    
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };
  


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.head}>
            <Text style={styles.title}>Create an Account</Text>
          </View>
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={signUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <TextInput 
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                 {values.password &&(
                  <FontAwesome
                    name={showPassword ? "eye" : "eye-slash"}
                    size={24}
                    color="#888"
                    style={styles.passwordIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                 )}
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Repeat Password"
                    secureTextEntry={!showRepeatPassword}
                    onChangeText={handleChange("repeatPassword")}
                    onBlur={handleBlur("repeatPassword")}
                    value={values.repeatPassword}
                  />
                  {values.repeatPassword && (
                    <FontAwesome
                    name={showRepeatPassword ? "eye" : "eye-slash"}
                    size={24}
                    color="#888"
                    style={styles.passwordIcon}
                    onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                  />
                  )}
                </View>
                {touched.repeatPassword && errors.repeatPassword && (
                  <Text style={styles.errorText}>{errors.repeatPassword}</Text>
                )}

                {/* <ButtonCustom
                  submitting={isSubmitting}
                  text="Register"
                  onPress={handleSubmit}
                  type="PRIMARY"
                /> */}
                <LoadingButtonUp
                  submitting={isSubmitting}
                  text='Register'
                  onPress={handleSubmit}
                  type='PRIMARY'
                />
              </View>
            )}
          </Formik>

          <View>
            <Text style={styles.text}>
              By registering, you confirm that you accept our{" "}
              <Text style={styles.link} onPress={onTermsPressed}>
                Terms of Use
              </Text>{" "}
              and{" "}
              <Text style={styles.link} onPress={onPrivacyPressed}>
                Privacy Policy
              </Text>
            </Text>
          </View>
          {/* signin up using other accounts */}
          <View style={styles.head}>
            <Buttons
              title="Sign In with Facebook"
              onPress={onSignInFacebook}
              buttonStyle={styles.facebookButton}
              titleStyle={styles.facebookButtonTitle}
            />
            <Buttons
              title="Sign In with Google"
              onPress={onSignInGoogle}
              buttonStyle={styles.googleButton}
              titleStyle={styles.googleButtonTitle}
            />
            <ButtonCustom
              text="Have an account? Sign In"
              onPress={onSignInPressed}
              type="TERTIARY"
            />
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
  },
  passwordIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  passwordContainer: {
    position: "relative",
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
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
  facebookButton: {
    backgroundColor: "#E7EAF4",
    marginTop: 8,
  },
  facebookButtonTitle: {
    color: "#4765A9",
  },
  googleButton: {
    backgroundColor: "#FAE9EA",
    marginTop: 8,
  },
  googleButtonTitle: {
    color: "#DD4D44",
  },
  appleButton: {
    backgroundColor: "#e3e3e3",
    marginTop: 8,
  },
  appleButtonTitle: {
    color: "#363636",
  },
});

export default SignUpScreen;
