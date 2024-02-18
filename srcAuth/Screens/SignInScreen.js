import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform,
} from "react-native";
import Logo from "../../assets/images/logo_safe.png";
import ButtonCustom from "../components/ButtonCustom/ButtonCustom";
import Buttons from "../components/ButtonCustom/Buttons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import LoadButtonIn from "../components/ButtonCustom/signInButton/LoadButtonIn";
import { SignIn } from "../api/User";
import { useLogin } from "../context/LoginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = yup.object().shape({
  email: yup
     .string()
     .email("Invalid email")
     .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignInScreen = () => {
  const {setIsLoggedIn, setProfile} = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  const { height } = useWindowDimensions();

  // keep user logged in 
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("token");

  //       if (token) {
  //         setIsLoggedIn(true)
  //       } else {
  //         // token not found , show the login screen itself
  //       }
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);



  

  const onSignInFacebook = () => {
    console.warn("Sign in facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Sign in google");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("forgotPassword");
    // console.warn('forgot');
  };

  const onSignUpPressed = () => {
    navigation.navigate("sign-up");
    // console.warn('Sign up');
  };

  // when  sign In button is clicked call this function

  const signIn = async(values, formikActions) =>{
    try {
      // lets use custom component of SignIn

      // *** commented ****
      // const res = await Client.post('/users/sign-in', { ...values });
      // *** commented***

      // custom component
      const res = await SignIn(values.email, values.password)
      if (res.data && res.data.user) {
        // navigation.replace('home-page'); 
        console.log(res.data.user);
        setIsLoggedIn(true)
        setProfile(res.data.user)
      } else { 
        console.log('Invalid response from the server:', res.data);
        // Handle the case when the API response is not as expected
      }
    } catch (error) {
      console.log('Error during API call:', error.message);
      // Handle the API error
    }
    
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headpic}>
            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={signIn}
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
                  {values.password && (
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

                <LoadButtonIn
                  text="Sign In"
                  onPress={handleSubmit}
                  type="PRIMARY"
                  submitting={isSubmitting}
                />
              </View>
            )}
          </Formik>
          <View style={styles.headpic}>
            <ButtonCustom
              text="forgot password?"
              onPress={onForgotPasswordPressed}
              type="TERTIARY"
            />

            {/* signin up using other accounts */}
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
              text="Don't have an account? Create one"
              onPress={onSignUpPressed}
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
  input: {
    marginBottom: 10,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  passwordIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  passwordContainer: {
    position: "relative",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  root: {
    flex: 1,
    backgroundColor: "white",
  },
  headpic: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
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

export default SignInScreen;
