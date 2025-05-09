import { View, Text, FlatList, Image, TouchableOpacity, Alert, Button, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import StaticeHeader from '../../components/staticeHeader'
import { productsData } from '../../../utils/data'
import { useNavigation, useRoute } from '@react-navigation/native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { height, width } from '../../hooks/responsive'
import { COLORS } from '../../../res/colors'
import Icon from '../../../utils/icon'
import TextComp from '../../components/textComp'
import { isIOS } from '../../hooks/platform'
import { useDispatch } from 'react-redux'
import { getProductsByCategoryAction } from '../../../redux/action'
import Toast from "react-native-simple-toast";
import { IMAGES } from '../../../res/images'
import { SCREEN } from '..'


const CategoryProductsScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute();
  const { data } = route?.params || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // initially true


  const fetchProducts = () => {
    setLoading(true); // start loading
    const payload = {
      category_id: data.id
    }

    dispatch(getProductsByCategoryAction(payload, (response) => {
      // console.log(`type of products--------->>>>>>>>>,${typeof response?.data}`);
      // console.log(`response of products--------->>>>>>>>>${JSON.stringify(response?.data)}`);
      if (response?.data?.status) {
        setProducts(response?.data?.data || [])
        console.log(`data---------------->>`, products);

      } else {
        Toast.show(response?.data?.message || "Banner fetch failed", Toast.LONG);
      }
      setLoading(false); // stop loading regardless of outcome
    }))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const navigateToSingleProductScreen = (item) => {
    navigation.navigate(SCREEN.SINGLE_PRODUCT_SCREEN, { data: item })
    // console.log('dta----------?????',item);
    
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{navigateToSingleProductScreen(item)}} style={{ width: width, alignSelf: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: COLORS.greyOpacity(1),
          overflow: 'hidden',
        }}
      >
        <Image
          source={{ uri: item.display_image }}
          style={{
            width: width * 0.92 * 0.4,
            height: verticalScale(110),
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
                brand {/* {item.brand} */}
              </TextComp>
              <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `900`, color: COLORS.secondaryAppColor }}>
                {item.product_name}
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
                <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Size:${item.mainSize?.value || '9'}${item.mainSize?.unit || 'mm'}`}
                </TextComp>
                <TextComp onPress={() => Alert.alert(`pressed`)} style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue, fontWeight: '800' }}>{`More`}</TextComp>
              </View>
              <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:${item.quantity}`}
              </TextComp>
            </View>
            <View style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
              <Icon type="AntDesign" name="heart" size={scale(22)} color={COLORS.secondaryAppColor} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <Wrapper useTopInsets={true} useBottomInset={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{ flex: 1 }}>
      <StaticeHeader headerLabel={data.name} />
      {/* <Button title='Button' onPress={fetchProducts} /> */}
      {loading ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: height * 0.9 }}>
          <ActivityIndicator size="large" color={COLORS.secondaryAppColor} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={products}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, height: height * 0.8, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={IMAGES.NO_PRODUCT} style={{ height: verticalScale(100), width: verticalScale(100) }} />
              <TextComp style={{ fontSize: scale(14), color: COLORS.grey }}>
                No products found in this category.
              </TextComp>
            </View>
          )}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={{ paddingBottom: isIOS() ? verticalScale(200) : verticalScale(100) }}
        />
      )}

      {/* <Image source={IMAGES.BLACK_LOGO_WITH_TEXT} style={{height:50,width:50}}/>
        <View style={{}}/> */}
    </Wrapper>
  )
}

export default CategoryProductsScreen