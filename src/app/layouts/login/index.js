import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import { height, width } from '../../hooks/responsive'
import { useNavigation, useTheme } from '@react-navigation/native'
import ButtonComp from '../../components/buttonComp'
import { IMAGES } from '../../../res/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../res/colors'
import { SCREEN } from '..'
import TextInputComp from '../../components/textInputComp'
import TextComp from '../../components/textComp'
import Icon from '../../../utils/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isIOS } from '../../hooks/platform'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux/slices/authSlice'
import { loginAction } from '../../../redux/action'
import { setUserData } from '../../../redux/slices/userDataSlice'

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate(SCREEN.ENTERY_SCREEN)
    }

    const storeToken = async (jwtToken) => {
        try {
            await AsyncStorage.setItem('token', jwtToken);
            // console.log('Token stored successfully:', jwtToken);
        } catch (error) {
            console.error('Error storing user data:', error);
        }
    };


    const payload = {
        email,
        password
    }

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show('Please enter both email and password');
            return;
        }
        setLoading(true)
        // console.log(payload);
        dispatch(
            loginAction(payload, (response) => {
                setLoading(false)
                if (response?.data?.status) {
                    // console.log(`token----->>>`, response?.data?.data?.auth_token);

                    storeToken(response?.data?.data?.auth_token)
                    dispatch(setUserData(response?.data?.data)); // update redux
                    AsyncStorage.setItem('userData', JSON.stringify(response?.data?.data));
                    dispatch(loginUser()); // this will update redux
                    Toast.show(response?.data?.message || 'login successfull', Toast.SHORT);
                    // console.log(`userdata---------->>>>>`,response?.data?.data);
                } else {
                    // console.log(`rejecteddddd`, response.data);
                    Alert.alert(response?.data?.message)
                }
            })
        )
    };

    const handleForgotPassword = () => {
        navigation.navigate(SCREEN.FORGOT_PASSWORD)
    }
    return (
        <Wrapper useBottomInset useTopInsets={true} safeAreaContainerStyle={{}} childrenStyles={{ height: isIOS() ? height * 0.9 : height }}>
            <View style={{ height: verticalScale(50), width: width, alignSelf: 'center', justifyContent: 'center', paddingLeft: moderateScale(15) }}>
                <TouchableOpacity onPress={handleBack} hitSlop={{ left: 30 }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView
                enableOnAndroid
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            >
                {/* <Header/> */}

                <Image source={IMAGES.LOGO_WITH_TEXT} style={{ height: verticalScale(190), width: verticalScale(190), alignSelf: 'center', marginTop: height * 0.13, marginBottom: height * 0.02 }} resizeMode='contain' />
                <TextInputComp
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'Enter your email'} label={'E-mail'} />
                <TextInputComp
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    showPasswordToggle={true} placeholder={'Enter your password'} label={'Password'} style={{ marginTop: verticalScale(12) }} />
                <TouchableOpacity onPress={handleForgotPassword} style={{ alignItems: 'flex-end', marginTop: verticalScale(8) }}>
                    <TextComp style={{ color: COLORS.blue }}>{`Forgot Password?`}</TextComp>
                </TouchableOpacity>
                <ButtonComp loading={loading} onPress={handleLogin} title={'Login'} buttonStyle={{ marginTop: verticalScale(40) }} textStyle={{ color: COLORS.white }} />
            </KeyboardAwareScrollView>
        </Wrapper>
    )
}

export default Login