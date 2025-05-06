import { View, Text, TouchableOpacity, Image, FlatList, Alert, Button, } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { productsData } from '../../../utils/data';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '..';
import { useDispatch } from 'react-redux';
import { getBannersAction, getCategoriesAction } from '../../../redux/action';
import Toast from "react-native-simple-toast";


const Home = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [products, setProducts] = useState(productsData || []);
  const [likedItems, setLikedItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [variantQuantities, setVariantQuantities] = useState({});
  const [bannerImages, setBannerImages] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    SystemNavigationBar.setNavigationColor(COLORS.primaryAppColor, 'dark'); // 'dark' makes buttons grey
  }, []);

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
        console.log('categories-------->>>', categoryData);

      } else {
        Toast.show(response?.data?.message || "category fetch failed", Toast.LONG);
      }
    }))
  }

  useEffect(() => {
    fetchCategories()
    fetchBanner()
  }, [])


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


  const toggleLike = async (item) => {
    const isLiked = likedItems.includes(item._id);
    let updatedLikes;

    if (isLiked) {
      updatedLikes = likedItems.filter(id => id !== item._id);
    } else {
      updatedLikes = [...likedItems, item._id];
      // 🔜 In future, store liked item in AsyncStorage
      // await AsyncStorage.setItem('likedItems', JSON.stringify(updatedLikes));
    }

    setLikedItems(updatedLikes);
  };

  const categories1 = [
    { id: 1, name: 'Electronics', image: 'https://picsum.photos/60?random=1' },
    { id: 2, name: 'Fashion', image: 'https://picsum.photos/60?random=2' },
    { id: 3, name: 'Home', image: 'https://picsum.photos/60?random=3' },
    { id: 4, name: 'Beauty', image: 'https://picsum.photos/60?random=4' },
    { id: 5, name: 'Toys', image: 'https://picsum.photos/60?random=5' },
    { id: 6, name: 'Groceries', image: 'https://picsum.photos/60?random=6' },
    { id: 7, name: 'Books', image: 'https://picsum.photos/60?random=7' },
    { id: 8, name: 'Fitness', image: 'https://picsum.photos/60?random=8' },
  ];


  const RenderItem = ({ item, index }) => {
    const key = `${selectedProduct._id}_${index}`;
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
        <TextComp>{`${item.value}${item.unit} - ₹${item.price}`}</TextComp>

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

  const renderProductItem = ({ item }) => {
    const isLiked = likedItems.includes(item._id);
    return (

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
                  <TextComp onPress={() => {
                    setSelectedProduct(item);
                    setShowVariantModal(true);
                  }} style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue, fontWeight: '800' }}>{`More`}</TextComp>
                </View>
                <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Unit:${item.mainSize.unit}`}
                </TextComp>
              </View>
              <TouchableOpacity onPress={() => toggleLike(item)} style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
                <Icon type="AntDesign" name="heart" size={scale(22)} color={isLiked ? COLORS.red : COLORS.secondaryAppColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );

  }
  const renderHeader = () => (
    <View style={{}}>
      {/* 🔹 Carousel */}
      {
        bannerImages.length > 0 && (
          <View style={{ height: height * 0.2, marginTop: verticalScale(12) }}>
            <Carousel
              data={bannerImages}
              // onPressItem={(item, index) => console.log('Image pressed:', item)}
              onPressItem={(item, index) => { navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: item }) }}
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
              <TouchableOpacity
                activeOpacity={0.9}
                key={cat.id}
                onPress={() => { navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: cat }) }}
                style={{
                  width: (width - scale(13) * 2) / 4 - scale(4), // Adjusted width with scale(13) padding
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
                    elevation: 7, // for Android
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
            ))}
          </View>
        )}
      </View>
      {/* <Button title='fetch categories' onPress={fetchCategories} /> */}

      {/* 🔹 Divider + Products Section */}
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
    </View>
  );

  return (

    <Wrapper useTopInsets={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{}}>
      <StaticeHeader />
      <FlatList
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        numColumns={1}

        data={products}
        key={(item) => { item.id }}
        // keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
      />

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
              maxHeight: height * 0.6,
            }}
          >
            <TextComp style={{ fontSize: scale(15), fontWeight: 'bold', marginBottom: verticalScale(10) }}>
              {selectedProduct?.description}
            </TextComp>

            {selectedProduct?.variants?.length > 0 ? (
              <FlatList
                data={selectedProduct.variants}
                key={(item) => item._id}
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
                    backgroundColor: COLORS.black,
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

    </Wrapper>

  )
}

export default Home