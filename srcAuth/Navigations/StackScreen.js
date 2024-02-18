import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../Screens/SignInScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import ForgotPassword from '../Screens/ForgotPassword'
import NewPasswordScreen from '../Screens/NewPasswordScreen'
import ConfirmEmailScreen from '../Screens/ConfirmEmailScreen'
import ImageUpload from '../Screens/ImageUpload'
import Home from '../Screens/Home'
import UserProfile from '../Screens/UserProfile'

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator initialRouteName='sign-in'>
      <Stack.Screen
        name='sign-in'
        component={SignInScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='home-page'
        component={Home}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='upload-profile'
        component={ImageUpload}
        // options={{headerShown:false}}
      />
      <Stack.Screen
        name='User-profile'
        component={UserProfile}
      />
      <Stack.Screen
        name='sign-up'
        component={SignUpScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='forgotPassword'
        component={ForgotPassword}
        // options={{headerShown:false}}
      />
      <Stack.Screen
        name='confirm-email'
        component={ConfirmEmailScreen}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name='newPassword'
        component={NewPasswordScreen}
        // options={{headerShown:false}}
      />

      </Stack.Navigator>
  )
}

export default StackScreen