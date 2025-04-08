import { View, Text, Image, TouchableOpacity } from 'react-native'
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const navigation = useNavigation()

    const handleBack = () => {
        navigation.goBack()
    }
    const handleLogin = () => {
        console.log('email----->>',email);
        console.log('password----->>',password);
        // navigation.navigate(SCREEN.LOGIN)
    }
    return (
        <Wrapper useBottomInset useTopInsets={false} safeAreaContainerStyle={{}} childrenStyles={{ height: height }}>
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
                    // paddingHorizontal: moderateScale(15),
                    // width:width,
                    // alignSelf:'center',
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
                <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: verticalScale(8) }}>
                    <TextComp>{`Forgot Password?`}</TextComp>
                </TouchableOpacity>
                <ButtonComp onPress={handleLogin} title={'Login'} buttonStyle={{ marginTop: verticalScale(40) }} textStyle={{ color: COLORS.white }} />
            </KeyboardAwareScrollView>
        </Wrapper>
    )
}

export default Login