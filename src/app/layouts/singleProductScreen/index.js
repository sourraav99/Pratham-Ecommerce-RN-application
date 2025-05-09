import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { WebView } from 'react-native-webview';
import Wrapper from '../../components/wrapper';
import TextComp from '../../components/textComp';
import { COLORS } from '../../../res/colors';
import Icon from '../../../utils/icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { IMAGES } from '../../../res/images';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const product = {
    product_name: "Angle Grinder GWS 600",
    description: "<h1><strong>GWS 600 Professional</strong></h1><h3><strong>Powerful and reliable tool for tradesmen</strong></h3><ul><li>Good handling due to ergonomically adapted housing</li><li>Spindle lock for easy disc change</li></ul>",
    display_image: "https://pratham.markletech.com/uploads/products/1746253763_Angle Grinder Machine Bosch - GWS 800.png",
    more_images: [
        "https://pratham.markletech.com/uploads/products/1746253763_gws6001.webp",
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQcbAR7vwYHEufOXYK1vCqLe6EU77Sxz3_-sWr7tkueUwUWd97Mu0w6DgPdrtCs7B2FfXhV1YQ2SxW1DSpKlbeKhDO7GIr0LKbvvXV0EkgHpoU3uIjewMSuPQ",
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR1QxAjuerMdC-TyEuzNjcGc2oJVJIDbdE_hWNSnVt5Gn03ZuIBeV8ezfoD0TRaf7VVRejoxbJYAxzlvLttZS5FZkzqhDof6UBcAfBniI453p7KziYBGGCMnw",
        "https://pratham.markletech.com/uploads/products/1746284035_PHOTO-2024-10-09-18-48-13.jpg",
    ],
    video_link: "https://www.youtube.com/embed/mGSi4PkoatI",
    price: "2033",
    mrp: "4100",
    size: "4 Inch",
    unit: "pcs",
};

const source = {
    html: `
  <p style='text-align:center;'>
    Hello World!
  </p>`
};
const SingleProductScreen = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const { data } = route?.params || {}
    console.log('data==============>>>>>', data.display_image);
    const cartItems = useSelector(state => state.cart.items);
    const isInCart = cartItems.some(item => item.id === data.id); // or match on another unique key

    const mediaItems = [
        ...(data.display_image ? [{ type: 'image', uri: data.display_image }] : []),
        ...((data.more_images || []).map(uri => ({ type: 'image', uri }))),
        ...(data.video_link ? [{ type: 'video', uri: product.video_link }] : [])
    ];

    const [selectedMedia, setSelectedMedia] = useState(mediaItems[0] || null);


    const renderSelectedMedia = () => {
        if (!selectedMedia) return null;

        if (selectedMedia.type === 'image') {
            return (
                <Image
                    source={{ uri: selectedMedia.uri }}
                    style={styles.mainMedia}
                    resizeMode="contain"
                />
            );
        } else {
            return (
                <View style={styles.mainMedia}>
                    <WebView
                        source={{ uri: selectedMedia.uri }}
                        style={{ flex: 1 }}
                        javaScriptEnabled
                        domStorageEnabled
                    />
                </View>
            );
        }
    };


    return (
        <Wrapper childrenStyles={{ backgroundColor: 'white', flex: 1, width: width }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={{ padding: 15 }}>
                        <Icon type='Entypo' name='share' color={COLORS.secondaryAppColor} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{console.log(`dtaa=====>>>>${cartItems}`);
                    }} style={{ padding: 15 }}>
                        <Icon type='FontAwesome' name='heart'  color={isInCart ? COLORS.red: COLORS.secondaryAppColor} size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                {renderSelectedMedia()}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailRow}>
                    {mediaItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedMedia(item)}
                            style={[styles.thumbnailWrapper, selectedMedia.uri === item.uri && styles.activeThumbnail]}
                        >
                            {item.type === 'image' ? (
                                <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                            ) : (
                                <View style={styles.videoThumb}>
                                    <Icon type="Entypo" name="video" color="white" size={20} />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <TextComp style={styles.title}>{data.product_name}</TextComp>
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                  <View>
                        <TextComp style={styles.price}>₹{data.price} <TextComp style={{
                            fontSize: scale(14),
                            marginLeft: 8
                        }}
                        >Incl GST</TextComp></TextComp>
                        {/* <TextComp style={styles.meta}>Size: {data.size} | Unit: {data.unit}</TextComp> */}
                        <TextComp style={{ fontSize: scale(14) }}>MRP: <TextComp style={styles.mrp}>₹{data.mrp}</TextComp></TextComp>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={IMAGES.WARRENTY} style={{ height: verticalScale(40), width: verticalScale(40),marginRight:moderateScale(5) }} resizeMode='contain' />
                        <View style={{ backgroundColor: `#ccc`, paddingHorizontal: verticalScale(8), paddingVertical: verticalScale(3), borderRadius: 5 }}>
                            <TextComp>{data.hsn_code||''}</TextComp>
                        </View>
                    </View>
                  </View>
                </View>
                {/* ₹{data.mrp} */}
                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <TextComp style={styles.sectionTitle}>Description</TextComp>

                    {data?.description && (
                        <RenderHtml source={{ html: data.description }} contentWidth={width} />
                    )}
                    {/* <TextComp>{stripHtml(product.description)}</TextComp> */}
                </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <TextComp style={styles.bottomPrice}>₹{data.price}</TextComp>
                <TouchableOpacity style={styles.addToCartBtn}>
                    <TextComp style={styles.addToCartText}>Add to Cart</TextComp>
                </TouchableOpacity>
            </View>
        </Wrapper>
    );
};

const stripHtml = (html) => html.replace(/<[^>]*>?/gm, '');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        height: verticalScale(50),
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        borderBottomWidth: 0.5,
        borderColor: COLORS.greyOpacity(0.5),
    },
    backButton: {
        backgroundColor: COLORS.secondaryAppColor,
        height: verticalScale(30),
        width: verticalScale(30),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIcons: {
        flexDirection: 'row'
    },
    mainMedia: {
        width: width,
        height: verticalScale(250),
        backgroundColor: COLORS.white,
    },
    thumbnailRow: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: width * 0.97
    },
    thumbnailWrapper: {
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    activeThumbnail: {
        borderColor: COLORS.secondaryAppColor,
        borderWidth: 2,
    },
    thumbnail: {
        width: scale(70),
        height: scale(70),
    },
    videoThumb: {
        width: scale(70),
        height: scale(70),
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
        // backgroundColor: 'red'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222'
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a8b1a',
        marginTop: 4
    },
    mrp: {
        fontSize: scale(14),
        color: COLORS.red,
        textDecorationLine: 'line-through',
        marginLeft: 8
    },
    meta: {
        fontSize: 14,
        color: '#666',
        marginTop: 2
    },
    descriptionContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        // marginBottom: 10
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.secondaryAppColor,
        borderTopWidth: 0.5,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bottomPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },

    addToCartBtn: {
        backgroundColor: 'orange',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 100,
    },

    addToCartText: {
        color: COLORS.secondaryAppColor,
        fontWeight: 'bold',
    },

});

export default SingleProductScreen;
