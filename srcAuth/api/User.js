// store the token on a device to avoid signing in at every reflesh of the app

import Client from "./Client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignIn = async (email, password) => {
  try {
    const signInRes = await Client.post("/users/sign-in", {
      email,
      password,
    });
    if (signInRes.data.success) {
      const token = signInRes.data.token;
      await AsyncStorage.setItem("token", token);
    }
    return signInRes;
  } catch (error) {
    console.log("error inside signIn method:", error.message);
  }
};

export const signOut = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      const res = await Client.post("/users/sign-out",null, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      if (res.data.success) {
        await AsyncStorage.removeItem("token");
        return true;
      }
    }
    return false;
  } catch (error) {
    console.log("error inside signout method", error.message);
    return false;
  }
};
