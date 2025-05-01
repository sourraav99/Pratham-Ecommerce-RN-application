import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Wrapper from '../../components/wrapper'
import Icon from '../../../utils/icon'
import TextComp from '../../components/textComp'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { COLORS } from '../../../res/colors'
import { width } from '../../hooks/responsive'
import { useNavigation } from '@react-navigation/native'

const TermsAndConditions = () => {
  const navigation=useNavigation()
  return (
    <Wrapper childrenStyles={{ backgroundColor: 'white', flex: 1, width: width * 0.96 }}>
    <View style={{ height: verticalScale(50), width: width, alignSelf: 'center', paddingLeft: moderateScale(15), flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={()=>navigation.goBack()} hitSlop={{ left: 30 }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
      </TouchableOpacity>
      <TextComp style={{ fontSize: scale(20), paddingLeft: 13, fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`Terms & Conditions`}</TextComp>
    </View>
  </Wrapper>
  )
}

export default TermsAndConditions