import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Pressable, Button, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '../../../utils/icon';
import { COLORS } from '../../../res/colors';
import { width } from '../../hooks/responsive';
import TextComp from '../../components/textComp';
import Wrapper from '../../components/wrapper';
import Toast from "react-native-simple-toast";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, removeFromFavourites } from '../../../redux/slices/favouritesSlice';




const Favourites = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const data = useSelector(state => state.favorites);
  const favorites = data.items
  const logs = () => {
    console.log('Favorites:', favorites);
    console.log('Type:', typeof favorites);
    console.log('Is array:', Array.isArray(favorites));
  }

  const toggleLike = useCallback((item) => {
    const isAlreadyInFavorites = favorites.some(fav => fav.id === item.id);

    if (isAlreadyInFavorites) {
      dispatch(removeFromFavourites(item.id));
      Toast.show('Item removed from favourites');
    } else {
      dispatch(addToFavourites(item));
      Toast.show('Item added to favourites');
    }
  })

  const renderProductItem = useCallback(({ item }) => {
    const isLiked = favorites.some(fav => fav.id === item.id);

    return (

      // <TouchableOpacity
      //   //  onPress={navigateToSingleProductScreen} 
      //   style={{ width: width, alignSelf: 'center' }}>
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       borderTopWidth: 1,
      //       borderTopColor: COLORS.greyOpacity(1),
      //       overflow: 'hidden',
      //     }}
      //   >
      //     <Image
      //       source={{ uri: item.display_image }}
      //       style={{
      //         width: width * 0.92 * 0.4,
      //         height: verticalScale(120),
      //       }}
      //       resizeMode="cover"
      //     />
      //     <View
      //       style={{
      //         flex: 1,
      //         // width: width * 0.96 * 0.6,
      //         // padding: scale(8),
      //         justifyContent: 'space-between',
      //       }}
      //     >
      //       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
      //         <View style={{ flex: 1, paddingLeft: moderateScale(5) }}>
      //           <TextComp style={{ fontSize: scale(12), marginTop: scale(3), color: COLORS.secondaryAppColor }}>
      //             {item.brand.name}
      //           </TextComp>
      //           {/* <TextComp style={{ fontSize: scale(12), marginTop: scale(3), color: COLORS.secondaryAppColor }}>
      //             Pioneer
      //           </TextComp> */}
      //           <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `900`, color: COLORS.secondaryAppColor }}>
      //             {item.product_name}
      //           </TextComp>
      //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(6) }}>
      //             <TextComp style={{ fontSize: scale(20), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item.price}`}
      //               <TextComp style={{ fontSize: scale(8), color: COLORS.secondaryAppColor }}> Incl GST</TextComp>
      //             </TextComp>

      //             <TouchableOpacity style={{ backgroundColor: COLORS.black, position: 'absolute', right: -10, borderRadius: scale(30), paddingHorizontal: scale(14), paddingVertical: scale(9) }}>
      //               <TextComp style={{ fontSize: scale(10), color: COLORS.white, }}>Add to cart</TextComp>
      //             </TouchableOpacity>
      //           </View>
      //           <View style={{ flexDirection: 'row' }}>
      //             {/* <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Size:${item.mainSize.value}${item.mainSize.unit}`}
      //             </TextComp> */}
      //             <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Size:9mm`}
      //             </TextComp>
      //             <TextComp onPress={() => {
      //               // setSelectedProduct(item);
      //               // setShowVariantModal(true);
      //             }} style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue, fontWeight: '800' }}>{`More`}</TextComp>
      //           </View>
      //           {/* <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:${item.mainSize.unit}`}
      //           </TextComp> */}
      //           <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:L`}
      //           </TextComp>
      //         </View>
      //         <TouchableOpacity
      //           onPress={() => toggleLike(item)}
      //           style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
      //           <Icon type="AntDesign" name="heart" size={scale(22)} color={isLiked ? COLORS.red : COLORS.secondaryAppColor} />
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   </View>
      // </TouchableOpacity>
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
                {item.brand.name}
              </TextComp>
              {/* <TextComp style={{ fontSize: scale(12), marginTop: scale(3), color: COLORS.secondaryAppColor }}>
                Pioneer
              </TextComp> */}
              <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `900`, color: COLORS.secondaryAppColor }}>
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
                  <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>
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
                <View style={{height:10,width:60,}}/>
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

  })

  // Optional: memoize IDs for quick lookup
  // const favoriteIds = useMemo(() => favorites.map(item => item.id), [favorites]);
  return (
    <Wrapper childrenStyles={{ backgroundColor: 'white', flex: 1, width: width }}>
      <View style={{ height: verticalScale(50), width: width, alignSelf: 'center', paddingLeft: moderateScale(15), flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ left: 30 }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
        </TouchableOpacity>
        <TextComp style={{ fontSize: scale(20), paddingLeft: 13, fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`Favourites`}</TextComp>
      </View>
      {/* <Button title='get favourites' onPress={logs} /> */}
      <FlatList
        data={favorites || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        ListEmptyComponent={() => (
          <TextComp style={{ textAlign: 'center', marginTop: 20 }}>
            No favourites yet.
          </TextComp>
        )}
      />

    </Wrapper>
  )
}

export default Favourites