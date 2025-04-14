import { View, Text, Image, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
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

const ForgotPassword = () => {
    const navigation = useNavigation()


    const handleBack = () => {
        navigation.goBack()
    }

     const handleVerify = () => {
            navigation.navigate(SCREEN.VERIFY_OTP)
        };
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
                }} >
                {/* <Header/> */}
                <View style={{ marginTop: height * 0.01 }}>
                    <TextComp style={{ fontSize: scale(30), fontWeight: '700', textAlign: 'center' }}>Forgot Password</TextComp>
                    <TextComp style={{ marginTop: scale(8), fontSize: scale(13), textAlign: 'center' }}>
                        {` No worries! Enter you email below and we will \n send a Otp to reset your password.`}
                    </TextComp>
                </View>
                <TextInputComp
                    style={{ marginTop: verticalScale(25) }}
                    placeholder={'Enter your email'}
                    label={'Email'} />
                <ButtonComp
                     onPress={handleVerify} 
                    title={'Send Reset Instruction'} buttonStyle={{ marginTop: verticalScale(40), position: 'absolute', bottom: verticalScale(50), width: width * 0.89 }} textStyle={{ color: COLORS.white }} />
            </KeyboardAwareScrollView>
        </Wrapper>
    )
}

export default ForgotPassword