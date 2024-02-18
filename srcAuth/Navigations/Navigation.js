import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackScreen from './StackScreen'
import DrawerNavigator from './DrawerNavigator'
import { useLogin } from '../context/LoginProvider'


const StackNavigator = () =>{
  return (
    <StackScreen/>
    )
}

const Navigation = () => {
  const {isLoggedIn} =useLogin()

  return (
    <NavigationContainer>
    {
      isLoggedIn ? <DrawerNavigator/> : <StackNavigator/>
    }
    </NavigationContainer>
  )
}

export default Navigation