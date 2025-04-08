import React, { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Main from '../stacks/main';
import Auth from '../stacks/auth';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../res/colors';
// import { useDispatch, useSelector } from 'react-redux';

export default function Routes() {
//   const dispatch = useDispatch();
const scheme = useColorScheme(); // "dark" | "light"
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
