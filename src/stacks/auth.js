import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN } from '../app/layouts';
import Login from '../app/layouts/login';
import Signup from '../app/layouts/signup';

const Stack = createNativeStackNavigator();
const Auth = () => {
    // 
  return (
    <Stack.Navigator screenOptions={{headerShown: false  }}>
        <Stack.Screen name={SCREEN.LOGIN} component={Login}/>
        <Stack.Screen name={SCREEN.SIGNUP} component={Signup}/>
        {/* <Stack.Screen name={SCREEN.FORGOT_PASSWORD} component={ForgotPassword}/>
        <Stack.Screen name={SCREEN.STEP1} component={Step1}/>
        <Stack.Screen name={SCREEN.STEP2} component={Step2}/>
        <Stack.Screen name={SCREEN.STEP3} component={Step3}/>
        <Stack.Screen name={SCREEN.STEP4} component={Step4}/>
        <Stack.Screen name={SCREEN.OTP_SCREEN} component={OtpScreen}/>
        <Stack.Screen name={SCREEN.RESET_PASSWORD} component={ResetPassword}/> */}
    </Stack.Navigator>
  )
}

export default Auth