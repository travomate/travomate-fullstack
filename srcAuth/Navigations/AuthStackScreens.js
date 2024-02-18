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

const AuthStack = createNativeStackNavigator();

const AuthStackScreens = () => {
    return (
        <AuthStack.Navigator initialRouteName='sign-in'>
          <AuthStack.Screen
            name='sign-in'
            component={SignInScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='home-page'
            component={Home}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='upload-profile'
            component={ImageUpload}
            // options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='User-profile'
            component={UserProfile}
          />
          <AuthStack.Screen
            name='sign-up'
            component={SignUpScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='forgotPassword'
            component={ForgotPassword}
            // options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='confirm-email'
            component={ConfirmEmailScreen}
            options={{headerShown:false}}
          />
          <AuthStack.Screen
            name='newPassword'
            component={NewPasswordScreen}
            // options={{headerShown:false}}
          />
    
          </AuthStack.Navigator>
      )
}

export default AuthStackScreens