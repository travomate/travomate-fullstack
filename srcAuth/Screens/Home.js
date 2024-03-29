import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLogin } from '../context/LoginProvider'

const Home = () => {
   const {profile} = useLogin()
  return (
    <View style={styles.container}>
      <Text>Home sweet home</Text>
      <Text>welcome home {profile.name}!!</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }

})