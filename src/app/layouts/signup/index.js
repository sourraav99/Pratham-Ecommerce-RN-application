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
import Toast from 'react-native-simple-toast';

const Signup = () => {
  const navigation = useNavigation()
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Input states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);



  const handleBack = () => {
    navigation.goBack()
  }
  const handleRegister = () => {
    // Trim values
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      businessName: businessName.trim(),
      businessType: businessType.trim(),
      gstNumber: gstNumber.trim(),
      businessAddress: businessAddress.trim(),
      city: city.trim(),
      state: state.trim(),
      postalCode: postalCode.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
    };

    // // Validate fields
    // for (const [key, value] of Object.entries(payload)) {
    //   if (!value) {
    //     const formattedKey = key
    //       .replace(/([A-Z])/g, ' $1')
    //       .replace(/^./, (str) => str.toUpperCase());
    //     Toast.show(`${formattedKey} is required`);
    //     return;
    //   }
    // }

    // // Password match check
    // if (payload.password !== payload.confirmPassword) {
    //   Toast.show('Passwords do not match');
    //   return;
    // }

    // Success
    console.log('Payload:', payload);
    navigation.navigate(SCREEN.VERIFY_OTP, {
      email: payload.email,
      comingFrom: SCREEN.SIGNUP,
    });
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
        }}
      >
        {/* <Header/> */}

        <Image source={IMAGES.LOGO_WITH_TEXT} style={{ height: verticalScale(190), width: verticalScale(190), alignSelf: 'center', marginTop: height * 0.01, marginBottom: height * 0.02 }} resizeMode='contain' />
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TextInputComp
            style={{ flex: 0.95 }}
            value={firstName}
            onChangeText={setFirstName}
            placeholder={'John'} label={'First Name'} />
          <View style={{ width: moderateScale(8) }} />
          <TextInputComp
            value={lastName}
            onChangeText={setLastName}
            placeholder={'Doe'} label={'Last Name'} style={{ flex: 0.95 }} />
        </View>
        <TextInputComp value={email} onChangeText={setEmail} style={{ marginTop: verticalScale(12) }} placeholder={'Enter your email'} label={'E-mail'} />
        <TextInputComp value={mobileNumber} onChangeText={setMobileNumber} placeholder={'Mobile Number'} label={'Mobile Number'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={businessName} onChangeText={setBusinessName} placeholder={'Business Name'} label={'Business Name'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={businessType} onChangeText={setBusinessType} placeholder={'Business Type'} label={'Business Type'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={gstNumber} onChangeText={setGstNumber} placeholder={'GST Number'} label={'GST Number'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={businessAddress} onChangeText={setBusinessAddress} placeholder={'Business Address'} label={'Business Address'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={city} onChangeText={setCity} placeholder={'City'} label={'City'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={state} onChangeText={setState} placeholder={'State'} label={'State'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={postalCode} onChangeText={setPostalCode} placeholder={'Postal Code'} label={'Postal Code'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={password} onChangeText={setPassword} secureTextEntry={true} showPasswordToggle={true} placeholder={'Enter your password'} label={'Password'} style={{ marginTop: verticalScale(12) }} />
        <TextInputComp value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} showPasswordToggle={true} placeholder={'Confirm Password'} label={'Confirm Password'} style={{ marginTop: verticalScale(12) }} />

        <ButtonComp onPress={handleRegister} title={'Register'} buttonStyle={{ marginTop: verticalScale(40) }} textStyle={{ color: COLORS.white }} />
        {/* {keyboardVisible && ( */}
        <TextComp style={{ fontSize: scale(11), textAlign: 'center', marginTop: verticalScale(8) }}>
          By continuing, you agree to our{' '}
          <TextComp
            onPress={() => {/* handle terms of service */ }}
            style={{
              color: COLORS.blue,
              fontWeight: '700',
              fontSize: scale(12),
              textDecorationLine: 'underline',
              textDecorationColor: COLORS.blue,
            }}
          >
            Terms of Service
          </TextComp>{' '}
          and{' '}
          <TextComp
            onPress={() => {/* handle privacy policy */ }}
            style={{
              color: COLORS.blue,
              fontWeight: '700',
              fontSize: scale(12),
              textDecorationLine: 'underline',
              textDecorationColor: COLORS.blue,
            }}
          >
            Privacy Policy
          </TextComp>
        </TextComp>

        <View style={{ height: verticalScale(50) }} />

        {/* )} */}
      </KeyboardAwareScrollView>
    </Wrapper>
  )
}

export default Signup