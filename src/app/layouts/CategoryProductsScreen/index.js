import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import StaticeHeader from '../../components/staticeHeader'
import { productsData } from '../../../utils/data'
import { useRoute } from '@react-navigation/native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { width } from '../../hooks/responsive'
import { COLORS } from '../../../res/colors'
import Icon from '../../../utils/icon'
import TextComp from '../../components/textComp'
import { isIOS } from '../../hooks/platform'



const CategoryProductsScreen = () => {
    const route = useRoute();
    const { data} = route?.params||'Category';
      const [products, setProducts] = useState(productsData || []);

      const renderProductItem = ({ item }) => (
        <View style={{ width: width, alignSelf: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: COLORS.greyOpacity(1),
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: width * 0.92 * 0.4,
                height: verticalScale(120),
              }}
              resizeMode="cover"
            />
            <View
              style={{
                flex: 1,
                // width: width * 0.96 * 0.6,
                // padding: scale(8),
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                <View style={{ flex: 1, paddingLeft: moderateScale(5) }}>
                  <TextComp style={{ fontSize: scale(12), marginTop: scale(3), color: COLORS.secondaryAppColor }}>
                    {item.brand}
                  </TextComp>
                  <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `900`, color: COLORS.secondaryAppColor }}>
                    {item.description}
                  </TextComp>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextComp style={{ fontSize: scale(20), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item.price}`}
                      <TextComp style={{ fontSize: scale(8), color: COLORS.secondaryAppColor }}> Incl GST</TextComp>
                    </TextComp>
    
                    <TouchableOpacity style={{ backgroundColor: COLORS.black, position: 'absolute', right: -10, borderRadius: scale(30), paddingHorizontal: scale(14), paddingVertical: scale(9) }}>
                      <TextComp style={{ fontSize: scale(10), color: COLORS.white, }}>Add to cart</TextComp>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Size:${item.mainSize.value}${item.mainSize.unit}`}
                    </TextComp>
                    <TextComp onPress={() => Alert.alert(`pressed`)} style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue ,fontWeight:'800'}}>{`More`}</TextComp>
                  </View>
                  <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:${item.mainSize.unit}`}
                  </TextComp>
                </View>
                <View style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
                  <Icon type="AntDesign" name="heart" size={scale(22)} color={COLORS.secondaryAppColor} />
                </View>
              </View>
            </View>
          </View>
        </View>
      );
  return (
    <Wrapper useTopInsets={true} useBottomInset={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{flex:1}}>
      <StaticeHeader headerLabel={data} />
      <FlatList
        // ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        numColumns={1}

        data={products}
        key={(item) => { item.id }}
        // keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingBottom: isIOS()?verticalScale(200):verticalScale(100) }}
      />
      {/* <Image source={IMAGES.BLACK_LOGO_WITH_TEXT} style={{height:50,width:50}}/>
        <View style={{}}/> */}
    </Wrapper>
  )
}

export default CategoryProductsScreen