import { View, Text, Image } from 'react-native'
import React from 'react'
import Wrapper from '../../components/wrapper'
import { height, width } from '../../hooks/responsive'
import { useNavigation, useTheme } from '@react-navigation/native'
import ButtonComp from '../../components/buttonComp'
import { IMAGES } from '../../../res/images'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../res/colors'
import { isIOS } from '../../hooks/platform'
import { SCREEN } from '..'


const EntryScreen = () => {
  const navigation=useNavigation()

  const handleRegister=()=>{
    navigation.navigate(SCREEN.SIGNUP)
  }
  const handleLogin=()=>{
    navigation.navigate(SCREEN.LOGIN)
  }

  return (

    <Wrapper useBottomInset safeAreaContainerStyle={{}} childrenStyles={{ height: height }}>
      <Image source={IMAGES.LOGO_WITH_TEXT} style={{ height: verticalScale(170), width: verticalScale(170), alignSelf: 'center',marginTop:height*0.3 }} resizeMode='contain' />
      <View style={{ flexDirection: 'row', width: '100%', position: 'absolute', bottom: isIOS() ? verticalScale(110) : verticalScale(70) }}>
        <ButtonComp onPress={handleRegister} title={'Register'} buttonStyle={{ flex: 1, backgroundColor: COLORS.white, borderWidth: 1 }} textStyle={{ color: COLORS.primaryTextColor, }} />
        <View style={{ width: moderateScale(20) }} />
        <ButtonComp onPress={handleLogin} title={'Login'} buttonStyle={{ flex: 1, }} textStyle={{ color: COLORS.white }} />
      </View>
    </Wrapper>

  )
}

export default EntryScreen