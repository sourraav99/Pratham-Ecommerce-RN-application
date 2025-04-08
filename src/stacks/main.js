import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Home from '../app/layouts/home';
import { SCREEN } from '../app/layouts';



const Stack = createNativeStackNavigator();
const Main = () => {
  // headerShown: false
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN.HOME} component={Home} />
      {/* <Stack.Screen name={SCREEN.EDIT_SELF_PROFILE} component={EditSelfProfile} options={{}}/>
      <Stack.Screen name={SCREEN.SETTINGS} component={Settings} options={{}}/> */}
    </Stack.Navigator>
  )
}

export default Main