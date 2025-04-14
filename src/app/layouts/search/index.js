import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Wrapper from '../../components/wrapper'
import StaticeHeader from '../../components/staticeHeader'
import { height, width } from '../../hooks/responsive'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../../../res/colors'
import { verticalScale } from 'react-native-size-matters'
import Icon from '../../../utils/icon'
import TextInputComp from '../../components/textInputComp'

const Search = () => {
    const navigation = useNavigation()
    return (
        <Wrapper useTopInsets={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{}}>


            {/* <StaticeHeader headerLabel={'header'} /> */}

            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,height: verticalScale(55),}}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                    <Icon type='AntDesign' name={'arrowleft'} size={23} color={COLORS.white} />
                </TouchableOpacity>
                <View style={{width:10}}/>
                <TextInputComp placeholder={'search'} style={{flex:1}} customBorderColor={COLORS.secondaryAppColor} customContainerStyle={{borderRadius:100,}} />
            </View>
            {/* <FlatList
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        numColumns={1}

        data={products}
        key={(item) => { item.id }}
        // keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
      /> */}
            {/* <Image source={IMAGES.BLACK_LOGO_WITH_TEXT} style={{height:50,width:50}}/>
        <View style={{}}/> */}
        </Wrapper>
    )
}

export default Search