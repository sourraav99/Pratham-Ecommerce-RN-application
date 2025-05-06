import { View, Text, Image, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import { height, width } from '../../hooks/responsive'
import { CommonActions, useNavigation, useRoute, useTheme } from '@react-navigation/native'
import ButtonComp from '../../components/buttonComp'
import { IMAGES } from '../../../res/images'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../res/colors'
import { SCREEN } from '..'
import TextInputComp from '../../components/textInputComp'
import TextComp from '../../components/textComp'
import Icon from '../../../utils/icon'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from "react-native-simple-toast";
import { isIOS } from '../../hooks/platform'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../redux/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { verifyEmailAction, verifyForgetPasswordOtpAction } from '../../../redux/action'

const VerifyOtp = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const email = route?.params?.email || 'example@gmail.com';
    const comingFrom = route?.params?.comingFrom || SCREEN.SIGNUP;
    const [timeLeft, setTimeLeft] = useState(59);
    const [showResendLine, setShowResendLine] = useState(false);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (timeLeft <= 0) {
            setShowResendLine(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const payload = {
        email,
        otp
    }

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
    };


    const handleBack = () => {
        navigation.goBack()
    }
    const handleVerify = async () => {
        if (comingFrom === SCREEN.SIGNUP) {

            if (otp.length !== 4) {
                Toast.show('Please enter a 4-digit OTP');
                return;
            }
            setLoading(true)
            dispatch(verifyEmailAction(payload, (response) => {
                setLoading(false)
                if (response?.data?.status) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: SCREEN.LOGIN }],
                        })
                    );
                    Toast.show(`${response?.data?.message},Please Login` || 'Verification successfull! Please Login', Toast.SHORT);
                    console.log(`userdata---------->>>>>`, response?.data?.data);
                } else {
                    setLoading(false)
                    Toast.show(response?.data?.message || 'registration failed', Toast.SHORT);
                    console.log(`rejecteddddd`, response.data);
                    Alert.alert(response?.data?.message)
                }
            }))
        } else if (comingFrom === SCREEN.FORGOT_PASSWORD) {
            // navigation.navigate(SCREEN.CHANGE_PASSWORD);
            dispatch(verifyForgetPasswordOtpAction(payload, (response) => {
                setLoading(true)
                if (response?.data?.status) {
                    setLoading(false)
                    navigation.navigate(SCREEN.CHANGE_PASSWORD, { email: email });
                    Toast.show(`${response?.data?.message},Please Login` || 'Verification successfull! Please Login', Toast.SHORT);
                    console.log(`userdata---------->>>>>`, response?.data);
                } else {
                    setLoading(false)
                    Toast.show(response?.data?.message || 'otp verification failed failed', Toast.SHORT);
                    console.log(`rejecteddddd`, response.data);
                    Alert.alert(response?.data?.message)
                }
            }))
        } else {
            // Default action
            navigation.goBack();
        }
    };

    // const email = "sourabh@gmail.com"
    return (
        <Wrapper useBottomInset={true} useTopInsets={true} safeAreaContainerStyle={{}} childrenStyles={{ height: isIOS() ? height * 0.9 : height }}>
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

                <Image source={IMAGES.LOGO_WITH_TEXT} style={{ height: verticalScale(190), width: verticalScale(190), alignSelf: 'center', marginTop: height * 0.01 }} resizeMode='contain' />
                <View>
                    <TextComp style={{ fontSize: scale(30), fontWeight: '700', textAlign: 'center' }}>Verify Account</TextComp>
                    <TextComp style={{ marginTop: scale(8), fontSize: scale(13), textAlign: 'center' }}>
                        OTP has been sent to{' '}
                        <TextComp style={{ fontWeight: '700', fontSize: scale(13) }}>{`${email}.\n`}</TextComp>
                        {'Enter the OTP to verify your account.'}
                    </TextComp>
                </View>
                <TextInputComp
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType={'numeric'}
                    maxLength={4}
                    style={{ marginTop: verticalScale(25) }}
                    placeholder={'4 Digit Code'}
                    label={'Enter OTP'} />
                {/* <View style={{ height: verticalScale(50) }} /> */}
                <View style={{ marginTop: verticalScale(16) }}>
                    {showResendLine ? (
                        <TextComp style={{ fontSize: scale(13), textAlign: 'center' }}>
                            Didn't Receive Code?{' '}
                            <TextComp
                                onPress={() => {
                                    setTimeLeft(59);
                                    setShowResendLine(false);
                                }}
                                style={{
                                    color: `rgba(148, 163, 184, 1)`,
                                    fontWeight: '700',
                                    fontSize: scale(13),
                                    textDecorationLine: 'underline',
                                    textDecorationColor: `rgba(148, 163, 184, 1)`,
                                }}
                            >
                                Resend Code
                            </TextComp>
                        </TextComp>
                    ) : (
                        <TextComp style={{ fontSize: scale(13), textAlign: 'center', marginTop: verticalScale(10) }}>
                            Resend Code in {formatTime(timeLeft)}
                        </TextComp>
                    )}
                </View>
                {/* )} */}<ButtonComp loading={loading} onPress={handleVerify} title={'Verify Account'} buttonStyle={{ marginTop: verticalScale(40), position: 'absolute', bottom: verticalScale(50), width: width * 0.89 }} textStyle={{ color: COLORS.white }} />
            </KeyboardAwareScrollView>
        </Wrapper>
    )
}

export default VerifyOtp