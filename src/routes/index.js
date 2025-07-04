import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Main from '../stacks/main';
import Auth from '../stacks/auth';
import { ActivityIndicator, Image, Text, useColorScheme, View } from 'react-native';
import { darkTheme, lightTheme } from '../res/colors';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../redux/slices/authSlice';
import { IMAGES } from '../res/images';
import { height } from '../app/hooks/responsive';
// import { useDispatch, useSelector } from 'react-redux';

const Loading = ({ loadingText = 'Loading...' }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* <ActivityIndicator size="large" color="#000" />
    <Text style={{ marginTop: 10 }}>{loadingText}</Text> */}
    <Image source={IMAGES.LOGO_WITH_TEXT} style={{ height: height * 0.3, width: height * 0.3 }} resizeMode='contain' />
  </View>
);

export default function Routes() {
  //   const dispatch = useDispatch();
  const scheme = useColorScheme(); // "dark" | "light"
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(null);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginStatus = await AsyncStorage.getItem('token');
        if (loginStatus) {
          dispatch(loginUser());
        }
      } catch (err) {
        console.log('Login check error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [dispatch]);


  if (isLoading) {
    return <Loading loadingText={'Checking login status...'} />;
  }


  return (
    <NavigationContainer theme={theme}>
      {/* {isLoggedIn ? <Auth /> : <Main />} */}
      {isLoggedIn ? <Main /> : <Auth />}
    </NavigationContainer>
  );
}
