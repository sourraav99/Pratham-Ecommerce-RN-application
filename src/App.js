import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GABRITO_BOLD, GABRITO_MEDIUM, GABRITO_REGULAR } from '../assets/fonts';
import Feather from 'react-native-vector-icons/Feather';

const App = () => {
  return (
    <GestureHandlerRootView>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {/* <Text style={{ fontSize: 18, fontFamily: GABRITO_BOLD }}>App</Text>
        <Feather name='book-open' color='red' size={20} />
        <Text style={{ fontSize: 18, fontFamily: GABRITO_MEDIUM }}>App</Text>
        <Text style={{ fontSize: 18, fontFamily: GABRITO_REGULAR }}>App</Text> */}
         <Text style={{ fontSize: 18, fontFamily: GABRITO_BOLD }}>App</Text>
        <Feather name='book-open' color='red' size={20} />
        <Text style={{ fontSize: 18, fontFamily: GABRITO_MEDIUM }}>App</Text>
        <Text style={{ fontSize: 18, fontFamily: GABRITO_REGULAR }}>App</Text>
      </View>
    </GestureHandlerRootView>
  )
}

export default App