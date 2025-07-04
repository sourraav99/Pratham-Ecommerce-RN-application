import { View, TouchableOpacity, Image, FlatList, Button, ActivityIndicator, } from 'react-native'
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
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { getBannersAction, getBrandsAction, getCategoriesAction, getProductsAction } from '../../../redux/action';
import Toast from "react-native-simple-toast";
import { addToFavourites, removeFromFavourites } from '../../../redux/slices/favouritesSlice';
import FilterModal from '../../components/filter';
import { setBrandsRedux } from '../../../redux/slices/brandsSlice';
import ProductList from '../../components/productList';
import { addToCart } from '../../../redux/slices/cartSlice';


const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const flatListRef = useRef(null);
  const favorites = useSelector(state => state.favorites.items);
  const cartItems = useSelector(state => state.cart.items);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantQuantities, setVariantQuantities] = useState({});
  const [bannerImages, setBannerImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [brands, setBrands] = useState([]);
  const [filterPayload, setFilterPayload] = useState({});
  const [ourBestLoading, setourBestLoading] = useState(false);

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(COLORS.primaryAppColor, 'dark'); // 'dark' makes buttons grey
  }, []);

  // const isInCart = cartItems.some(fav => fav.id === item.id);

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


  const fetchbrand = () => {
    // console.log('DISPATCHING BANNER ACTION'); // ✅ Check if this appears
    dispatch(getBrandsAction((response) => {
      // console.log('INSIDE CALLBACK'); // ✅ Check if this appears
      if (response?.data?.status) {
        const brands = response?.data?.data || [];
        dispatch(setBrandsRedux(brands));
        setBrands(brands)
        console.log('brands-------->>>', brands);

      } else {
        console.log(response?.data?.message || "Banner fetch failed");
        // Toast.show(response?.data?.message || "Banner fetch failed", Toast.LONG);
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

  const fetchProducts = (customPayload) => {
    const payload = customPayload || filterPayload || {};
    // console.log(`fetchProducts payload-----???????`,payload);
    setourBestLoading(true);

    dispatch(getProductsAction(payload, (response) => {
      setProducts(response?.data?.data || []);
      // console.log('data from api res---------->>>>>',products);

      setourBestLoading(false);
    }));
  };

  useEffect(() => {
    fetchCategories()
    fetchBanner()
    fetchProducts()
    fetchbrand()
  }, [])


  const handleScroll = useCallback((event) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 300 && !showScrollToTop) setShowScrollToTop(true);
    else if (y <= 300 && showScrollToTop) setShowScrollToTop(false);
  }, [showScrollToTop]);

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };



  const navigateToSingleProductScreen = (item) => {
    navigation.navigate(SCREEN.SINGLE_PRODUCT_SCREEN, { data: item })
    // console.log('length------->>>', products.length);

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


  const increaseQuantity = useCallback((key, sizeRaw) => {
    const size = Math.max(parseInt(sizeRaw) || 0, 1);
    setVariantQuantities(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + size,
    }));
  }, []);

  const decreaseQuantity = useCallback((key, sizeRaw) => {
    const size = Math.max(parseInt(sizeRaw) || 0, 1);
    setVariantQuantities(prev => {
      const current = prev[key] || 0;
      const newQty = current - size;
      return {
        ...prev,
        [key]: newQty >= size ? newQty : 0,
      };
    });
  }, []);


  // 👇 No quantity passed — fetch quantity inside the memo component
  const MemoizedRenderItem = React.memo(({ item, index, id, getQuantity, onIncrease, onDecrease }) => {
    console.log('varients rendering-------->>>>>');

    const quantity = getQuantity(id);
    const size = item?.details?.size;

    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.greyOpacity(0.3), paddingVertical: verticalScale(10), flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: '30%' }}>
          <TextComp numberOfLines={1}>{size}</TextComp>
        </View>

        <View style={{ width: '30%', alignItems: 'center' }}>
          <TextComp numberOfLines={1}>₹{item?.details?.price}</TextComp>
        </View>

        <View style={{ width: '40%', alignItems: 'flex-end' }}>
          <View style={{ width: scale(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.greyOpacity(0.1), borderRadius: scale(20), paddingHorizontal: scale(10), paddingVertical: scale(6) }}>
            <TouchableOpacity onPress={() => onDecrease(id, size)}>
              <Icon type="AntDesign" name="minus" size={scale(14)} color={COLORS.black} />
            </TouchableOpacity>

            <View style={{ width: scale(24), alignItems: 'center' }}>
              <TextComp style={{ fontSize: scale(12) }}>{quantity}</TextComp>
            </View>

            <TouchableOpacity onPress={() => onIncrease(id, size)}>
              <Icon type="AntDesign" name="plus" size={scale(14)} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, (prev, next) => prev.id === next.id && prev.getQuantity(prev.id) === next.getQuantity(next.id));

  // 👇 this function is stable via useCallback
  const getQuantity = useCallback(
    (key) => variantQuantities[key] || 0,
    [variantQuantities]
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      const key = `${selectedProduct?.id}_${index}`;
      return (
        <MemoizedRenderItem
          key={key}
          id={key}
          item={item}
          index={index}
          getQuantity={getQuantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      );
    },
    [selectedProduct?.id, getQuantity, increaseQuantity, decreaseQuantity]
  );







  const onMoreButtonPress = useCallback((item) => {
    setSelectedProduct(item);
    setShowVariantModal(true);
  }, [])


  const ProductItem = React.memo(({ item, navigation, dispatch }) => {
    const isLiked = favorites.some(fav => fav.id === item.id);
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);




    const handleAddToCart = () => {


      if (isInCart) {
        navigation.navigate('Cart');
      } else {
        if (item?.variants && item?.variants?.length > 0) {
          onMoreButtonPress(item);
        } else {
          const productToAdd = {
            id: item?.id,
            product_name: item?.product_name,
            display_image: item?.display_image,
            stock_discount: item?.stock_discount,
            price: item?.price,
            tax: item?.tax,
            quantity: 1,
            multipleSize:false,
            variant:{}
          };
          console.log(`productToAdd`, productToAdd);

          dispatch(addToCart(productToAdd));
        }
      } 
    };

    return (

      <TouchableOpacity
        onPress={() => { navigateToSingleProductScreen(item) }}
        //  onPress={() => {console.log(item.id) }} 

        style={{ width: width, alignSelf: 'center', }}>

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
                // backgroundColor:'red'
              }}
              resizeMode='contain'
            />
            {item?.best_products && (
              <View style={{
                position: 'absolute',
                top: verticalScale(-5),
                // left: 8,
                backgroundColor: COLORS.white,
                paddingHorizontal: 6,
                paddingVertical: 2,
                // borderRadius: 4,
                borderBottomRightRadius: 7,
                zIndex: 10,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.20,
                shadowRadius: 5.62,
                elevation: 8
              }}>
                <Image source={IMAGES.BEST_PRODUCT_ICON} style={{ height: verticalScale(13), width: verticalScale(13) }} />
                <TextComp style={{ color: COLORS.black, fontSize: scale(10) }}>{`Our best product`}</TextComp>
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
                  {item?.brand?.name}
                </TextComp>
                {/* <TextComp style={{ fontSize: scale(12), marginTop: scale(3), color: COLORS.secondaryAppColor }}>
                  Pioneer
                </TextComp> */}
                <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `900`, color: COLORS.secondaryAppColor, height: height * 0.050 }}>
                  {item?.product_name}
                </TextComp>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(6) }}>
                  <TextComp style={{ fontSize: scale(20), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item?.variants?.length ? item.variants[0].details?.price : item?.price || 0}`}
                    <TextComp style={{ fontSize: scale(8), color: COLORS.secondaryAppColor }}> Incl GST</TextComp>
                  </TextComp>

                  <TouchableOpacity onPress={handleAddToCart} style={{ backgroundColor: COLORS.black, position: 'absolute', right: -15, borderRadius: scale(30), paddingHorizontal: scale(14), paddingVertical: scale(9) }}>
                    <TextComp style={{ fontSize: scale(10), color: COLORS.white, }}>{isInCart ? "View in Cart" : "Add to Cart"}</TextComp>
                  </TouchableOpacity>
                </View>
                {item.variants && item.variants.length > 0 ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextComp numberOfLines={1} style={{ fontSize: scale(12), color: COLORS.secondaryAppColor, maxWidth: width * 0.25 }}>
                      {`Size: ${item.variants[0]?.details?.size || 'N/A'}`}
                    </TextComp>
                    <TextComp
                      onPress={() => onMoreButtonPress(item)}
                      style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue, fontWeight: '800' }}
                    >
                      More
                    </TextComp>
                  </View>
                ) : (
                  <>
                    <View style={{ height: 10, width: 60, }} />
                  </>
                )}
              </View>
              <TouchableOpacity onPress={() => toggleLike(item)} style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
                <Icon type="AntDesign" name="heart" size={scale(22)} color={isLiked ? COLORS.red : COLORS.secondaryAppColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
  )


  const renderProductItem = useCallback(({ item }) => {
    return <ProductItem item={item} navigation={navigation} dispatch={dispatch} />;
  }, [favorites,cartItems]);



  const handleCategoryPress = useCallback((cat) => {
    navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: cat });
  }, [navigation]);


  const CategoryItem = React.memo(({ cat, onPress }) => {
    console.log('CategoryItem item render-------------');
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



  const memoizedHeader = useMemo(() => {
    console.log('Header rendered');
    return (
      <View>
        {/* 🔹 Carousel */}
        {bannerImages.length > 0 && (
          <View style={{ height: height * 0.2, marginTop: verticalScale(12) }}>
            <Carousel
              data={bannerImages}
              onPressItem={(item, index) => {
                navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, {
                  data: item,
                  bannerClick: true,
                });
              }}
              interval={4000}
              height={height * 0.2}
            />
          </View>
        )}

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

        {/* 🔹 Divider + Products Section */}
        {products.length > 0 && (
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
        )}
      </View>
    );
  }, [bannerImages, navigation, categories, handleCategoryPress, products]);

  const handleApplyFilters = (filters) => {
    setIsFilterVisible(false);
    setFilterPayload(filters);
    fetchProducts(filters);
  };



  return (

    <Wrapper useTopInsets={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{}}>
      <StaticeHeader onpressFilter={() => {
        setIsFilterVisible(true)
      }} />
      <ProductList
        ref={flatListRef}
        data={products}
        renderItem={renderProductItem}
        renderHeader={memoizedHeader}
        onScroll={handleScroll}
        ourBestLoading={ourBestLoading}
      />
      {/* <View style={{ height: 500, backgroundColor: 'red' }} /> */}
      {showScrollToTop && (
        // <View style={{flex:1}}>
        <TouchableOpacity
          onPress={scrollToTop}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            top: verticalScale(60),
            // right: 20,
            backgroundColor: '#000',
            padding: 10,
            borderRadius: 30,
            zIndex: 100,
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
            zIndex: 200,
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
              source={{ uri: `${encodeURI(selectedProduct.display_image)}` }}
              style={{
                width: verticalScale(40),
                height: verticalScale(40),
                alignSelf: 'center',
              }}
              resizeMode="cover"
            />
            {selectedProduct?.variants?.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                  paddingVertical: verticalScale(8),
                  // justifyContent:'space-around',
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.greyOpacity(0.5),
                  marginBottom: verticalScale(5),
                }}
              >
                <TextComp style={{ flex: 0.8, textAlign: 'left', fontWeight: 'bold', marginLeft: width * 0.010 }}>Size</TextComp>
                <TextComp style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Price</TextComp>
                <TextComp style={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>Qty</TextComp>
              </View>

            )}

            {selectedProduct?.variants?.length > 0 ? (
              <FlatList
                data={selectedProduct.variants}
                keyExtractor={(item, index) => `${selectedProduct?.id}_${item.id || index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                extraData={variantQuantities}
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
                    console.log(' products size--------', selectedProduct?.variants[0]?.details?.size);

                    // setShowVariantModal(false);
                    // setVariantQuantities({});
                  }}
                >
                  <TextComp style={{ textAlign: 'center', color: COLORS.white }}>Submit</TextComp>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        brands={brands}
        onApply={handleApplyFilters}
      />


    </Wrapper>

  )
}

export default Home
