import { View, TouchableOpacity, Image, FlatList, BackHandler, } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { COLORS } from '../../../res/colors';
import Wrapper from '../../components/wrapper';
import { height, width } from '../../hooks/responsive';
import { IMAGES } from '../../../res/images';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '../../../utils/icon';
import TextComp from '../../components/textComp';
import StaticeHeader from '../../components/staticeHeader';
import Carousel from '../../components/carousel';
import { GABRITO_MEDIUM } from '../../../../assets/fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SCREEN } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { getBannersAction, getCategoriesAction, getProductsAction } from '../../../redux/action';
import Toast from "react-native-simple-toast";
import { addToFavourites, removeFromFavourites } from '../../../redux/slices/favouritesSlice';
import FilterModal from '../../components/filter';


const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const flatListRef = useRef(null);
  const favorites = useSelector(state => state.favorites.items);
  const [products, setProducts] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantQuantities, setVariantQuantities] = useState({});
  const [bannerImages, setBannerImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(COLORS.primaryAppColor, 'dark'); // 'dark' makes buttons grey
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       if (isFilterVisible) {
  //         setIsFilterVisible(false)
  //         return true
  //       }
  //       return false
  //     }
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   },[isFilterVisible])
  // )


  const fetchBanner = () => {
    // console.log('DISPATCHING BANNER ACTION'); // ✅ Check if this appears
    dispatch(getBannersAction((response) => {
      // console.log('INSIDE CALLBACK'); // ✅ Check if this appears
      if (response?.data?.status) {
        const banners = response?.data?.data || [];
        setBannerImages(banners);
        // console.log('bannerImges-------->>>', bannerImages);

      } else {
        Toast.show(response?.data?.message || "Banner fetch failed", Toast.LONG);
      }
    }));
  };

  const fetchCategories = () => {
    dispatch(getCategoriesAction((response) => {
      if (response?.data?.status) {

        const categoryData = response?.data?.data
        setCategories(categoryData);
        // console.log('categories-------->>>', categoryData);

      } else {
        Toast.show(response?.data?.message || "category fetch failed", Toast.LONG);
      }
    }))
  }

  const fetchProducts = () => {
    dispatch(getProductsAction((response) => {
      // console.log(`productsResponse${JSON.stringify(response?.data)}`);
      // console.log(`productsResponse length${response?.data?.data.length}`);
      setProducts(response?.data?.data || [])
    }))

  }

  useEffect(() => {
    fetchCategories()
    fetchBanner()
    fetchProducts()
  }, [])




  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    // console.log('Scroll Y:', y);
    setShowScrollToTop(y > 300); // Show button if scrolled beyond 300px
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const increaseQuantity = (key) => {
    setVariantQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
  };

  const decreaseQuantity = (key) => {
    setVariantQuantities((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 0) - 1, 0),
    }));
  };

  const navigateToSingleProductScreen = (item) => {
    navigation.navigate(SCREEN.SINGLE_PRODUCT_SCREEN, { data: item })
  }

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


  const RenderItem = ({ item, index }) => {
    const key = `${selectedProduct.id}_${index}`;
    const quantity = variantQuantities[key] || 0;
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.greyOpacity(0.3),
          paddingVertical: verticalScale(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextComp>{`${item.size}-₹${item.price}`}</TextComp>
        {/* <TextComp>{`9mm - ₹100`}</TextComp> */}

        {/* <TextComp>{`₹${item.price}`}</TextComp> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.greyOpacity(0.1),
            borderRadius: scale(20),
            paddingHorizontal: scale(10),
            paddingVertical: scale(6),
          }}
        >
          <TouchableOpacity onPress={() => decreaseQuantity(key)}>
            <Icon
              type="AntDesign"
              name="minus"
              size={scale(14)}
              color={COLORS.black}
            />
          </TouchableOpacity>

          <TextComp style={{ marginHorizontal: scale(10), fontSize: scale(12) }}>{quantity}</TextComp>

          <TouchableOpacity onPress={() => increaseQuantity(key)}>
            <Icon
              type="AntDesign"
              name="plus"
              size={scale(14)}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

const ProductItem= React.memo(({item})=>{
  console.log('product item render-------------');
  
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
          <View style={{ width: width * 0.92 * 0.4, position: 'relative' }}>
            <Image
              source={{ uri: item.display_image }}
              style={{
                width: '100%',
                height: verticalScale(90),
                // aspectRatio: 2, // or your desired height
                borderRadius: scale(8),
              }}
            />
            {item?.best_products && (
              <View style={{
                position: 'absolute',
                top: verticalScale(-5),
                // left: 8,
                backgroundColor: COLORS.blackOpacity(0.7),
                paddingHorizontal: 6,
                paddingVertical: 2,
                // borderRadius: 4,
                borderBottomRightRadius: 7,
                zIndex: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Image source={IMAGES.BEST_PRODUCT_ICON} style={{ height: verticalScale(13), width: verticalScale(13) }} />
                <TextComp style={{ color: 'white', fontSize: scale(10) }}>{`Our best product`}</TextComp>
              </View>
            )}

          </View>

          {/* </View> */}
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
})


  const renderProductItem = ({ item }) => {
    return <ProductItem item={item} />
  }


  const handleCategoryPress = useCallback((cat) => {
    navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: cat });
  }, [navigation]);


  const CategoryItem = React.memo(({ cat, onPress }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress(cat)}
        style={{
          width: (width - scale(13) * 2) / 4 - scale(4),
          alignItems: 'center',
          marginVertical: verticalScale(5),
        }}
      >
        <Image
          source={{ uri: cat.image }}
          style={{
            height: scale(72),
            width: scale(70),
            borderRadius: scale(8),
            borderWidth: 1,
            borderColor: COLORS.secondaryAppColor || '#ccc',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: scale(4),
            elevation: 7,
            overflow: 'hidden'
          }}
          resizeMode="cover"
        />
        <TextComp
          numberOfLines={1}
          style={{
            fontSize: scale(11),
            marginTop: scale(5),
            textAlign: 'center',
          }}
        >
          {cat.name}
        </TextComp>
      </TouchableOpacity>
    );
  });

  const renderHeader = () => (
    <View style={{}}>
      {/* 🔹 Carousel */}
      {
        bannerImages.length > 0 && (
          <View style={{ height: height * 0.2, marginTop: verticalScale(12) }}>
            <Carousel
              data={bannerImages}
              // onPressItem={(item, index) => console.log('Image pressed:', item)}
              onPressItem={(item, index) => { navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: item, bannerClick: true, }) }}
              interval={4000}
              height={height * 0.2}
            />
          </View>
        )
      }

      {/* 🔹 Category Grid */}


      <View style={{ marginTop: verticalScale(15), paddingHorizontal: scale(13) }}>
        <TextComp style={{ fontSize: scale(14), marginBottom: verticalScale(8) }}>
          Shop by category
        </TextComp>

        {categories.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {categories.map((cat) => (
              <CategoryItem key={cat.id} cat={cat} onPress={handleCategoryPress} />
            ))}
          </View>
        )}

      </View>
      {/* <Button title='fetch pRODUCTS' onPress={fetchProducts} /> */}

      {/* 🔹 Divider + Products Section */}
      {
        products.length > 0 && (
          <TextComp
            style={{
              fontSize: scale(12),
              fontFamily: GABRITO_MEDIUM,
              marginLeft: scale(13),
              marginTop: verticalScale(10),
              marginBottom: verticalScale(10),
            }}
          >
            Explore our best products
          </TextComp>
        )
      }
    </View>
  );



  return (

    <Wrapper useTopInsets={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{}}>
      <StaticeHeader onpressFilter={() => setIsFilterVisible(true)} />
      <FlatList
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        data={products}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        windowSize={10}
        key={(item) => { item.id }}
        renderItem={renderProductItem}
        onScroll={handleScroll}
        ref={flatListRef}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
      // ListFooterComponent={<View style={{ height: 500, backgroundColor: 'red' }} />}
      />
      {/* <View style={{height:500,backgroundColor:'red'}}/> */}
      {showScrollToTop && (
        // <View style={{flex:1}}>
        <TouchableOpacity
          onPress={scrollToTop}
          style={{
            position: 'absolute',
            // bottom: verticalScale(120),
            justifyContent: 'center',
            top: verticalScale(60),
            // right: 20,
            backgroundColor: '#000',
            padding: 10,
            borderRadius: 30,
            zIndex: 9999,
            elevation: 10,
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',

          }}
        >
          <Icon name="arrowup" size={20} color="#fff" type='AntDesign' />
          <TextComp style={{ paddingHorizontal: 5, color: COLORS.white }}>{`Scroll to top`}</TextComp>
        </TouchableOpacity>
        // </View>
      )}
      {showVariantModal && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: height,
            width: width,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            paddingHorizontal: scale(20),
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: scale(10),
              padding: scale(15),
              maxHeight: height * 0.75,
            }}
          >
            <TextComp style={{ fontSize: scale(13), fontWeight: 'bold', marginBottom: verticalScale(10), textAlign: 'center' }}>
              {`${selectedProduct?.product_name}\nHSN Code:${selectedProduct?.hsn_code}`}
            </TextComp>
            <Image
              source={{ uri: `${selectedProduct.display_image} ` }}
              style={{
                width: verticalScale(40),
                height: verticalScale(40),
                alignSelf: 'center'
              }}
              resizeMode="cover"
            />
            {selectedProduct?.variants?.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <TextComp style={{ fontSize: scale(10) }}>Size/UOM- ₹Price</TextComp>
                </View>
                <TextComp style={{ fontSize: scale(10) }}>Qty.</TextComp>
              </View>
            )}

            {selectedProduct?.variants?.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={selectedProduct.variants}
                key={(item) => item.id}
                // keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}

              />
            ) : (
              <TextComp style={{ textAlign: 'center', marginVertical: verticalScale(20), color: COLORS.red }}>
                No variants
              </TextComp>
            )}

            {/* Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(20) }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.greyOpacity(1),
                  paddingVertical: scale(10),
                  borderRadius: scale(6),
                  flex: 1,
                  marginRight: scale(10),
                }}
                onPress={() => {
                  setShowVariantModal(false)
                  setVariantQuantities({});
                }}
              >
                <TextComp style={{ textAlign: 'center', color: COLORS.white }}>Cancel</TextComp>
              </TouchableOpacity>
              {selectedProduct?.variants?.length > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primaryAppColor,
                    paddingVertical: scale(10),
                    borderRadius: scale(6),
                    flex: 1,
                  }}
                  onPress={() => {
                    // TODO: Handle submit
                    setShowVariantModal(false);
                    setVariantQuantities({});
                  }}
                >
                  <TextComp style={{ textAlign: 'center', color: COLORS.white }}>Submit</TextComp>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
      <FilterModal visible={isFilterVisible} onClose={() => setIsFilterVisible(false)} />

    </Wrapper>

  )
}

export default Home