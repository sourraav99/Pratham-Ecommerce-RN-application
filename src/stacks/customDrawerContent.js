import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '../res/colors';
import Icon from '../utils/icon';
import TextComp from '../app/components/textComp';
import { GABRITO_MEDIUM } from '../../assets/fonts';
import { SCREEN } from '../app/layouts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../redux/slices/authSlice';
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from 'react-redux';
import { IMAGES } from '../res/images';
import { PROFILE_IMAGE_BASE_URL } from '../utils/config';

const drawerItems = [
    { label: 'Home', screen: SCREEN.DRAWER_HOME, icon: 'home', iconType: 'Feather' },
    { label: 'Shop by categories', screen: SCREEN.CATEGORIES, icon: 'grid', iconType: 'Feather' },
    { label: 'My Orders', screen: SCREEN.MY_ORDERS, icon: 'package', iconType: 'Feather' },
    { label: 'About Us', screen: SCREEN.ABOUT_US, icon: 'account-box-outline', iconType: 'MaterialCommunityIcons' },
    { label: 'Payment Terms', screen: SCREEN.PAYMENT_TERMS, icon: 'file-document-outline', iconType: 'MaterialCommunityIcons' },
    { label: 'Favourites', screen: SCREEN.FAVOURITES, icon: 'heart-outline', iconType: 'MaterialCommunityIcons' },
    { label: 'Cancellation,Returns and Refund', screen: SCREEN.CANCELATION_AND_RETURNS, icon: 'backup-restore', iconType: 'MaterialCommunityIcons' },
    { label: 'Terms and Conditions', screen: SCREEN.TERMS_AND_CONDITION, icon: 'file-document-edit-outline', iconType: 'MaterialCommunityIcons' },
    { label: 'Ledger Statement', screen: SCREEN.LEDGER_STATEMENT, icon: 'notebook-outline', iconType: 'MaterialCommunityIcons' },
    { label: 'Pending Bills Report', screen: SCREEN.PENDING_BILLS, icon: 'credit-card', iconType: 'Feather' },
    { label: 'Contact Us', screen: SCREEN.CONTACT_US, icon: 'phone-outline', iconType: 'MaterialCommunityIcons' },
    { label: 'Support', screen: SCREEN.SUPPORT, icon: 'help-circle', iconType: 'Feather' },

];

const CustomDrawerContent = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
   const usersData = useSelector((state) => state.userData.userData);
    // const [userData, setUserData] = useState({
    //     image: null,
    //     businessName: '',
    //     phone: '',
    //     customerId: '',
    // });


    const userData = {
        image: usersData?.image || null,
        businessName: usersData?.business_name || 'Business Name',
        phone: usersData?.mobile_number || '+91 9876543210',
        customerId: usersData?.id || '123456',
      };
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             // const storedData = await AsyncStorage.getItem('userData');
    //             // if (storedData) {
    //             //     const parsed = JSON.parse(storedData);
    //                 setUserData({
    //                     image: usersData?.image || null,
    //                     businessName: usersData?.business_name || 'Business Name',
    //                     phone: usersData?.mobile_number || '+91 9876543210',
    //                     customerId: usersData?.id || '123456',
    //                 });
    //                 console.log(`userData=========>>>>>>>>>>>`,userData);
                    
    //             // }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);
    const handleLogout = async () => {
        try {
            await AsyncStorage.clear(); // clear storage
            dispatch(logoutUser()); // update redux
            Toast.show('User Logged out', Toast.SHORT);
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Top Profile Section */}
                <TouchableOpacity style={{ backgroundColor: COLORS.secondaryAppColor, alignSelf: 'flex-end', borderRadius: 100, padding: scale(3) }} onPress={() => props.navigation.closeDrawer()}>
                    <Icon name="x" type="Feather" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate(SCREEN.SELF_PROFILE)}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', paddingVertical: scale(5) }}>
                    {/* <View style={{  flexDirection: 'row',alignItems:'center'}}> */}
                    <Image
                        source={
                            userData.image
                                ? { uri: `${PROFILE_IMAGE_BASE_URL}${userData.image}` }
                                : IMAGES.DEFAULT_PROFILE // <- replace with your local fallback
                        }
                        // source={{ uri: 'https://i.pinimg.com/736x/e8/e6/41/e8e64141f4c0ae39c32f9701ccea9a2e.jpg' }}
                        style={{ width: 60, height: 60, borderRadius: 30, }}
                    />
                    <View style={{ paddingRight: moderateScale(30) }}>
                        <TextComp style={{ fontSize: scale(14), fontFamily: GABRITO_MEDIUM }}>{userData.businessName}</TextComp>
                        <TextComp style={{ fontSize: scale(12), color: COLORS.gray }}>Customer ID:{userData.customerId}</TextComp>
                        <TextComp style={{ fontSize: scale(12), color: COLORS.gray }}>{userData.phone}</TextComp>
                    </View>
                    {/* </View> */}
                    <View style={{}} >
                        <Icon name="caretright" type="AntDesign" size={16} />
                    </View>
                </TouchableOpacity>

                {/* Drawer Items */}
                <View style={{ marginTop: scale(10) }}>
                    {drawerItems.map((item, index) => (
                        <DrawerItem
                            key={index}
                            label={({ color, focused }) => (
                                <TextComp
                                    allowFontScaling={false}
                                    style={{
                                        fontSize: scale(14),
                                        fontFamily: GABRITO_MEDIUM,
                                        paddingVertical: 0,
                                        marginVertical: 0,
                                        color,
                                    }}
                                >
                                    {item.label}
                                </TextComp>
                            )}
                            onPress={() => {
                                props.navigation.navigate(item.screen);
                            }}
                            icon={({ color }) => (
                                <Icon
                                    name={item.icon}
                                    type={item.iconType}
                                    size={20}
                                    color={color}
                                />
                            )}
                            style={{
                                backgroundColor: props.state.routeNames[props.state.index] === item.screen
                                    ? COLORS.primaryAppColorOpacity(0.3)
                                    : 'transparent',
                                marginHorizontal: scale(4),
                                borderRadius: 8,
                            }}
                        />
                    ))}
                </View>
                <View style={{ padding: scale(10), marginTop: 'auto' }}>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.secondaryAppColor,
                            paddingVertical: scale(10),
                            paddingHorizontal: scale(15),
                            borderRadius: 8,
                        }}
                    >
                        <Icon name="log-out" type="Feather" size={18} color={COLORS.white} />
                        <TextComp
                            style={{
                                fontSize: scale(14),
                                color: COLORS.white,
                                marginLeft: scale(10),
                                fontFamily: GABRITO_MEDIUM,
                            }}
                        >
                            Logout
                        </TextComp>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

export default CustomDrawerContent;
