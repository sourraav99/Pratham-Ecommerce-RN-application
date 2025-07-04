import { Platform, Animated } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { scale, verticalScale } from 'react-native-size-matters';
import BottomTab from './bottomTab';
import { SCREEN } from '../app/layouts';
import Home from '../app/layouts/home';
import Categories from '../app/layouts/categories';
import Cart from '../app/layouts/cart';
import TextComp from '../app/components/textComp';
import Icon from '../utils/icon';
import { COLORS } from '../res/colors';

const BottomStack = ({navigation}) => {
    const Tab = createBottomTabNavigator();
   



    return (
        <Tab.Navigator
        initialRouteName={SCREEN.HOME_TAB}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';
            let iconType = 'Feather'; // Default type
      
            switch (route.name) {
              case SCREEN.HOME_TAB:
                iconName = 'home';
                iconType = 'Entypo';
                break;
              case SCREEN.CATEGORIES:
                iconName = 'format-list-bulleted-square';
                iconType = 'MaterialCommunityIcons';
                break;
              case SCREEN.CART:
                iconName = 'shopping-cart';
                iconType = 'Foundation';
                break;
              default:
                iconName = 'circle';
            }
      
            return (
              <Icon
                name={iconName}
                type={iconType}
                size={scale(24)}
                color={focused ? COLORS.white : COLORS.black}
              />
            );
          },
          tabBarLabel: ({ focused, color }) => (
            <TextComp
              allowFontScaling={false}
              style={{
                fontSize: scale(12),
                fontWeight: focused ? '700' : '400',
                color,
              }}
            >
              {route.name}
            </TextComp>
          ),
          tabBarStyle: {
            backgroundColor:COLORS.primaryAppColor
          },
          headerShown:false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name={SCREEN.HOME_TAB} component={Home}  options={{ title: 'Home' }} />
        <Tab.Screen name={SCREEN.CATEGORIES} component={Categories}  options={{ title: 'Categories' }} />
        <Tab.Screen name={SCREEN.CART} component={Cart}  options={{ title: 'Cart' }}/>
      </Tab.Navigator>
    );
};

export default BottomStack;

