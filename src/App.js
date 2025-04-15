import React from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <GestureHandlerRootView>
     <Provider store={store}>
     <Routes/>
     </Provider>
    </GestureHandlerRootView>
  )
}

export default App