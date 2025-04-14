import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomStack from './bottomStack';
import Categories from '../app/layouts/categories';
import CustomDrawerContent from './customDrawerContent';
import { SCREEN } from '../app/layouts';
import MyOrders from '../app/layouts/myOrders';
import AboutUs from '../app/layouts/aboutUs';
import PaymentTerms from '../app/layouts/paymentTerms';
import Favourites from '../app/layouts/favourites';
import CancelationAndReturns from '../app/layouts/cancelationReturn';
import TermsAndConditions from '../app/layouts/terms&Condition';
import LedgerStatement from '../app/layouts/ledgerStatement';
import PendingBills from '../app/layouts/pendingBills';
import ContactUs from '../app/layouts/contactUs';
import Support from '../app/layouts/support';
import { GABRITO_MEDIUM } from '../../assets/fonts';
import { COLORS } from '../res/colors';
import { scale } from 'react-native-size-matters';
import { isIOS } from '../app/hooks/platform';
import TextComp from '../app/components/textComp';

const Drawer = createDrawerNavigator();


const getDrawerLabel = (label) => ({ focused, color }) => (
    <TextComp
      allowFontScaling={false}
      style={{
        fontSize: scale(15),
        fontFamily: GABRITO_MEDIUM,
        color,
      }}
    >
      {label}
    </TextComp>
  );

const DrawerStack = () => {
    return (
        <Drawer.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            drawerActiveBackgroundColor: COLORS.primaryAppColorOpacity(0.3), // <- this adds blue bg on focus
        })}
            initialRouteName={SCREEN.DRAWER_HOME}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        >

            <Drawer.Screen name={SCREEN.DRAWER_HOME} component={BottomStack}options={{ drawerLabel: getDrawerLabel('Home') }}/>
            <Drawer.Screen name={SCREEN.CATEGORIES} component={Categories} options={{ drawerLabel: getDrawerLabel('Shop by categories') }} />
            <Drawer.Screen name={SCREEN.MY_ORDERS} component={MyOrders} options={{ drawerLabel: getDrawerLabel('My Orders') }} />
            <Drawer.Screen name={SCREEN.ABOUT_US} component={AboutUs} options={{ drawerLabel: getDrawerLabel('About Us') }} />
            <Drawer.Screen name={SCREEN.PAYMENT_TERMS} component={PaymentTerms} options={{ drawerLabel: getDrawerLabel('Payment Terms' )}} />
            <Drawer.Screen name={SCREEN.FAVOURITES} component={Favourites} options={{ drawerLabel: getDrawerLabel('Favourites') }} />
            <Drawer.Screen name={SCREEN.CANCELATION_AND_RETURNS} component={CancelationAndReturns} options={{ drawerLabel: getDrawerLabel('Cancellation, Returns and Refund') }} />
            <Drawer.Screen name={SCREEN.TERMS_AND_CONDITION} component={TermsAndConditions} options={{ drawerLabel: getDrawerLabel('Terms and Conditions') }} />
            <Drawer.Screen name={SCREEN.LEDGER_STATEMENT} component={LedgerStatement} options={{ drawerLabel: getDrawerLabel('My Orders' )}} />
            <Drawer.Screen name={SCREEN.PENDING_BILLS} component={PendingBills} options={{ drawerLabel: getDrawerLabel('Pending Bills and Report') }} />
            <Drawer.Screen name={SCREEN.CONTACT_US} component={ContactUs} options={{ drawerLabel: getDrawerLabel('Contact Us') }} />
            <Drawer.Screen name={SCREEN.SUPPORT} component={Support} options={{ drawerLabel: getDrawerLabel('Support') }} />
        </Drawer.Navigator>
    )
}

export default DrawerStack;