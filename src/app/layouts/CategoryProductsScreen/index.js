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
import { useDispatch, useSelector } from 'react-redux'
import { getBannerProductsAction, getProductsByCategoryAction } from '../../../redux/action'
import Toast from "react-native-simple-toast";
import { IMAGES } from '../../../res/images'
import { SCREEN } from '..'
import { addToFavourites, removeFromFavourites } from '../../../redux/slices/favouritesSlice'


const CategoryProductsScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const favorites = useSelector(state => state.favorites.items);
  const route = useRoute();
  const { data, bannerClick = false } = route?.params || {}; // default to false
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // initially true


  const toggleLike = (item) => {
    const isAlreadyInFavorites = favorites.some(fav => fav.id === item.id);

    if (isAlreadyInFavorites) {
      dispatch(removeFromFavourites(item.id));
      Toast.show('Item removed from favourites');
    } else {
      dispatch(addToFavourites(item));
      Toast.show('Item added to favourites');
    }
  };

  const fetchProducts = () => {
    setLoading(true); // start loading
    const payload = {
      category_id: data.id
    }

    dispatch(getProductsByCategoryAction(payload, (response) => {
      // console.log(`type of products--------->>>>>>>>>,${typeof response?.data}`);
      // console.log(`response of products--------->>>>>>>>>${response?.data?.data}`);
      if (response?.data?.status) {
        setProducts(response?.data?.data || [])
        console.log(`data---------------->>`, response?.data?.data);

      } else {
        Toast.show(response?.data?.message || "Banner fetch failed", Toast.LONG);
      }
      setLoading(false); // stop loading regardless of outcome
    }))
  }

  const fetchBannerProducts = () => {
    setLoading(true);

    const payload = {
      banners_id: data?.id,
    };

    // Replace this with your actual banner API call
    dispatch(getBannerProductsAction(payload, (response) => {
      console.log('loggggg==============>>>>>', response?.data);

      if (response?.data?.status) {
        setProducts(response?.data?.products || []);
      } else {
        Toast.show(response?.data?.message || "Banner fetch failed", Toast.LONG);
      }
      setLoading(false);
    }));
  };


  useEffect(() => {
    if (bannerClick) {
      console.log('banner data will show ');

      fetchBannerProducts();
    } else {
      fetchProducts();
    }
  }, []);

  const navigateToSingleProductScreen = (item) => {
    navigation.navigate(SCREEN.SINGLE_PRODUCT_SCREEN, { data: item })
    // console.log('dta----------?????',item);

  }

  const renderProductItem = ({ item }) =>{
    const isLiked = favorites.some(fav => fav.id === item.id);
    return (
      <TouchableOpacity onPress={() => { navigateToSingleProductScreen(item) }} style={{ width: width, alignSelf: 'center', }}>
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: COLORS.greyOpacity(1),
            overflow: 'hidden',
            // alignItems:'center'
            paddingVertical: verticalScale(5)
          }}
        >
          <Image
            source={{ uri: item.display_image }}
            style={{
              width: width * 0.92 * 0.4,
              // height: verticalScale(120),
              // backgroundColor:'red'
            }}
            resizeMode="contain"
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
                  {item?.brand?.name}
                </TextComp>
                {/* <TextComp style={{ fontSize: scale(12), marginTop: scale(3), color: COLORS.secondaryAppColor }}>
                Pioneer
              </TextComp> */}
                <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `900`, color: COLORS.secondaryAppColor, height: height * 0.050 }}>
                  {item.product_name}
                </TextComp>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(6) }}>
                  <TextComp style={{ fontSize: scale(20), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item.price}`}
                    <TextComp style={{ fontSize: scale(8), color: COLORS.secondaryAppColor }}> Incl GST</TextComp>
                  </TextComp>
  
                  <TouchableOpacity style={{ backgroundColor: COLORS.black, position: 'absolute', right: -10, borderRadius: scale(30), paddingHorizontal: scale(14), paddingVertical: scale(9) }}>
                    <TextComp style={{ fontSize: scale(10), color: COLORS.white, }}>Add to cart</TextComp>
                  </TouchableOpacity>
                </View>
                {item.variants && item.variants.length > 0 ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextComp numberOfLines={1} style={{ fontSize: scale(12), color: COLORS.secondaryAppColor, maxWidth: width * 0.25 }}>
                      {`Size: ${item.variants[0]?.size || 'N/A'}`}
                    </TextComp>
                    <TextComp
                      onPress={() => {
                        setSelectedProduct(item);
                        setShowVariantModal(true);
                      }}
                      style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue, fontWeight: '800' }}
                    >
                      More
                    </TextComp>
                  </View>
                ) : (
                  <>
                    <View style={{ height: 10, width: 60, }} />
                  </>
                  // <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>
                  //   No variants
                  // </TextComp>
                )}
  
                {/* <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:${item.mainSize.unit}`}
              </TextComp> */}
                {/* <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:L`}
              </TextComp> */}
              </View>
              <TouchableOpacity onPress={() => toggleLike(item)} style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
                <Icon type="AntDesign" name="heart" size={scale(22)} color={isLiked ? COLORS.red : COLORS.secondaryAppColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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