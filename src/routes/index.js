import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Main from '../stacks/main';
import Auth from '../stacks/auth';
import { ActivityIndicator, Text, useColorScheme, View } from 'react-native';
import { darkTheme, lightTheme } from '../res/colors';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../redux/slices/authSlice';
// import { useDispatch, useSelector } from 'react-redux';

const Loading = ({ loadingText = 'Loading...' }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#000" />
    <Text style={{ marginTop: 10 }}>{loadingText}</Text>
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
  // const [isLoggedIn, setIsLoggedIn] = useState(true)


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
        setIsLoading(false); // ✅ Stop loading no matter what
      }
    };

    checkLoginStatus();
  }, [dispatch]);


  if (isLoading) {
    return <Loading loadingText={'Checking login status...'} />;
  }

//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//   useEffect(() => {
//     // Function to check internet status
//     const checkInternet = () => {
//       NetInfo.fetch().then((state) => {
//         setIsConnected(state.isConnected);
//       });
//     };

//     checkInternet(); // Initial check
//     const unsubscribe = NetInfo.addEventListener(checkInternet);
//     return () => unsubscribe(); // Cleanup on unmount
//   }, []);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const profileSetup = await AsyncStorage.getItem('isProfileSetup');

//         if (token && profileSetup === 'true') {
//           dispatch({ type: 'SET_LOGGED_IN', payload: true });
//         } else {
//           dispatch({ type: 'SET_LOGGED_OUT' });
//         }
//       } catch (error) {
//         console.error('Error checking login status:', error);
//       } finally {
//         setIsLoading(false); // Stop loading once the check is complete
//       }
//     };

//     if (isConnected) {
//       checkLoginStatus(); // Only check login if internet is available
//     }
//   }, [dispatch, isConnected]);

  // Retry function to recheck internet
//   const handleRetry = () => {
//     NetInfo.fetch().then((state) => {
//       if (state.isConnected) {
//         setIsConnected(true);
//       }
//     });
//   };

  // Show No Internet screen if no connection
//   if (isConnected === false) {
//     return <NoInternet onRetry={handleRetry} />;
//   }

  // Show Loading screen while checking login status
//   if (isLoading) {
//     return <Loading loadingText={'Please Wait...'} />;
//   }

  return (
    <NavigationContainer theme={theme}>
      {/* {isLoggedIn ? <Auth /> : <Main />} */}
      {isLoggedIn ?  <Main /> : <Auth /> }
    </NavigationContainer>
  );
}
