import React from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from './routes';

const App = () => {
  return (
    <GestureHandlerRootView>
      <Routes/>
    </GestureHandlerRootView>
  )
}

export default App