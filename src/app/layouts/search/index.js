import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Wrapper from '../../components/wrapper';
import { getSearchAction } from '../../../redux/action';
import TextInputComp from '../../components/textInputComp';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { height, width } from '../../hooks/responsive';
import { COLORS } from '../../../res/colors';
import Icon from '../../../utils/icon';
import { useNavigation } from '@react-navigation/native';
import TextComp from '../../components/textComp';
import { SCREEN } from '..';
// import { getSearchAction } from '../../redux/actions/productActions'; // update import as needed

const DEBOUNCE_DELAY = 500;

const SearchResults = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [searchText, setSearchText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounce logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedText(searchText);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeout);
    }, [searchText]);

    // Dispatch debounced API call
    useEffect(() => {
        if (!debouncedText.trim()) {
            setResults([]);
            return;
        }
    
        const payload = { search: debouncedText };
        setLoading(true);
    
        dispatch(
            getSearchAction(payload, (res) => {
                try {
                    if (res?.status) {
                        const products = (res?.data?.products || []).map((item) => ({ ...item, type: 'product' }));
                        setResults(products);
                    } else {
                        console.warn('Search failed:', res?.message || 'Unknown error');
                        setResults([]);
                    }
                } catch (error) {
                    console.error('Error parsing search response:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            })
        );
    }, [debouncedText]);
    
    const navigateToScreen = (item) => {
        navigation.navigate(SCREEN.SINGLE_PRODUCT_SCREEN, { data: item });
    };
   
    
    const renderProductItem = ({ item }) =>{
        // const isLiked = favorites.some(fav => fav.id === item.id);
        return (
          <TouchableOpacity onPress={() => { navigateToScreen(item) }} style={{ width: width, alignSelf: 'center', }}>
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
                      <TextComp style={{ fontSize: scale(20), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item?.price}`}
                        <TextComp style={{ fontSize: scale(8), color: COLORS.secondaryAppColor }}> Incl GST</TextComp>
                      </TextComp>
      
                      <TouchableOpacity style={{ backgroundColor: COLORS.black, position: 'absolute', right:10, borderRadius: scale(30), paddingHorizontal: scale(14), paddingVertical: scale(9) }}>
                        <TextComp style={{ fontSize: scale(10), color: COLORS.white, }}>Add to cart</TextComp>
                      </TouchableOpacity>
                    </View>
                    {item.variants && item.variants.length > 0 ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextComp numberOfLines={1} style={{ fontSize: scale(12), color: COLORS.secondaryAppColor, maxWidth: width * 0.25 }}>
                          {`Size: ${item.variants[0]?.size || 'N/A'}`}
                        </TextComp>
                        <TextComp
                        //   onPress={() => {
                        //     setSelectedProduct(item);
                        //     setShowVariantModal(true);
                        //   }}
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
                  {/* <TouchableOpacity onPress={() => toggleLike(item)} style={{ marginRight: moderateScale(10), marginTop: verticalScale(10) }}>
                    <Icon type="AntDesign" name="heart" size={scale(22)} color={isLiked ? COLORS.red : COLORS.secondaryAppColor} />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }

    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity
            onPress={() => { navigateToScreen(item) }}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderBottomWidth: 0.5,
                borderColor: '#ccc',
                // width:width*0.90
                flex: 1,
                // backgroundColor:'blue'
            }}
        >
            <Image
                source={{ uri: item.image || item.display_image }}
                style={{ width: verticalScale(40), height: verticalScale(40), borderRadius: 6, marginRight: 10 }}
                resizeMode='cover'
            />
            <TextComp numberOfLines={2} style={{ fontSize: 16, flex: 1 }}>{item.name || item.product_name}</TextComp>
        </TouchableOpacity>
    ), []);

    return (
        <Wrapper useTopInsets={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{}}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, height: verticalScale(55), }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                    <Icon type='AntDesign' name={'arrowleft'} size={23} color={COLORS.white} />
                </TouchableOpacity>
                <View style={{ width: 10 }} />
                <TextInputComp
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder={'search'} style={{ flex: 1 }} customBorderColor={COLORS.secondaryAppColor} customContainerStyle={{ borderRadius: 100, }} />
            </View>
            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={results}
                    keyExtractor={(item, index) => item._id + item.type + index}
                    renderItem={renderProductItem}
                    contentContainerStyle={{ paddingBottom: verticalScale(100), width: width }}
                    // ListFooterComponent={()=>{
                    //     return(
                    //         <View>
                    //             <View style={{}}/>
                    //         </View>
                    //     )
                    // }}
                    ListEmptyComponent={
                        debouncedText ? (
                            <Text style={{ padding: 20, textAlign: 'center' }}>No results found.</Text>
                        ) : null
                    }
                />
            )}
        </Wrapper>
    );
};

export default SearchResults;
