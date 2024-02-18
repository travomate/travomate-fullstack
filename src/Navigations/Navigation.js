import React from 'react'
import Drawer from './Drawer'
import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { useLogin } from '../../srcAuth/context/LoginProvider'
import AuthStackScreens from '../../srcAuth/Navigations/AuthStackScreens'

const Navigation = () => {
  const {isLoggedIn} =useLogin()
  return (
    
    <NavigationContainer >
    {isLoggedIn ? <Drawer/> : <AuthStackScreens/>}
    

    </NavigationContainer>
   
  )
}

export default Navigation