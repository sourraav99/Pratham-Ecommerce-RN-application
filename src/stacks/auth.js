import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN } from '../app/layouts';
import Signup from '../app/layouts/signup';
import EntryScreen from '../app/layouts/entryScreen';
import Login from '../app/layouts/login';

const Stack = createNativeStackNavigator();
const Auth = () => {
    // 
  return (
    <Stack.Navigator screenOptions={{headerShown: false  }}>
        <Stack.Screen name={SCREEN.ENTERY_SCREEN} component={EntryScreen}/>
        <Stack.Screen name={SCREEN.SIGNUP} component={Signup}/>
        <Stack.Screen name={SCREEN.LOGIN} component={Login}/>
    </Stack.Navigator>
  )
}

export default Auth