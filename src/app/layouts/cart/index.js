import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '../../../utils/icon';
import { COLORS } from '../../../res/colors';
import { width } from '../../hooks/responsive';
import TextComp from '../../components/textComp';
import Wrapper from '../../components/wrapper';
import { IMAGES } from '../../../res/images';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  return (
    <Wrapper childrenStyles={{ backgroundColor: 'white', flex: 1, width: width * 0.96 }}>
        <View style={{ height: verticalScale(50), width: width, alignSelf: 'center', paddingLeft: moderateScale(15), flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',borderBottomWidth:0.5, borderColor: COLORS.greyOpacity(0.5)}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity hitSlop={{ left: 30 }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
          </TouchableOpacity>
          <TextComp style={{ fontSize: scale(21), paddingLeft: 13, fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`Cart`}</TextComp>
        </View>
        <TouchableOpacity style={{backgroundColor:COLORS.red,paddingVertical:8,paddingHorizontal:8,borderRadius:100,marginRight:moderateScale(16),marginTop:verticalScale(3)}}>
          <TextComp style={{fontSize:scale(12),color:COLORS.white}}>{`Remove all`}</TextComp>
        </TouchableOpacity>
      </View>
    </Wrapper>
  )
}

export default Cart