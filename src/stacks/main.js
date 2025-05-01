import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Home from '../app/layouts/home';
import { SCREEN } from '../app/layouts';
import BottomStack from './bottomStack';
import DrawerStack from './drawerStack';
import CategoryProductsScreen from '../app/layouts/CategoryProductsScreen';
import Search from '../app/layouts/search';
import OrderStatus from '../app/layouts/orderStatus';



const Stack = createNativeStackNavigator();
const Main = () => {
  // headerShown: false
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN.HOME_TAB} component={DrawerStack} />
     <Stack.Screen name={SCREEN.SEARCH} component={Search} options={{}}/>   
      <Stack.Screen name={SCREEN.CATEGORY_PRODUCT_SCREEN} component={CategoryProductsScreen} options={{}}/> 
      <Stack.Screen name={SCREEN.ORDER_STATUS} component={OrderStatus} options={{}}/> 
    </Stack.Navigator>
  )
}

export default Main