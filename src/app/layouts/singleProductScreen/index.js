import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Animated, Share } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { WebView } from 'react-native-webview';
import Wrapper from '../../components/wrapper';
import TextComp from '../../components/textComp';
import { COLORS } from '../../../res/colors';
import Icon from '../../../utils/icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHtml from 'react-native-render-html';
import { IMAGES } from '../../../res/images';
import Toast from "react-native-simple-toast";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, removeFromFavourites } from '../../../redux/slices/favouritesSlice';
import { height } from '../../hooks/responsive';
import { isIOS } from '../../hooks/platform';

const { width } = Dimensions.get('window');


const STICKY_HEIGHT = 80 + 80; // 80 shrunk media + 80 for thumbnails
const { height: screenHeight } = Dimensions.get('window');
const maxHeight = screenHeight * 0.3; // 30% of screen height
const minHeight = screenHeight * 0.1; // 10% of screen height

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
    const dispatch = useDispatch()
    const { data } = route?.params || {}
    const [showAttributes, setShowAttributes] = useState(false);
    // console.log('data==============>>>>>', data?.attributes);
    const favorites = useSelector(state => state.favorites.items);
    const isLiked = favorites.some(fav => fav.id === data.id);

    const toggleLike = () => {
        const isAlreadyInFavorites = favorites.some(fav => fav.id === data.id);

        if (isAlreadyInFavorites) {
            dispatch(removeFromFavourites(data.id));
            Toast.show('Item removed from favourites');
        } else {
            dispatch(addToFavourites(data));
            Toast.show('Item added to favourites');
        }
    };


    const handleShare = async () => {
        try {
            await Share.share({
                message: `${data.product_name} - ₹${data.price}\nCheck it out: ${data.display_image}`,
            });
        } catch (error) {
            console.log('Error sharing:', error.message);
        }
    };
    const mediaItems = [
        ...(data.display_image ? [{ type: 'image', uri: data.display_image }] : []),
        ...((data.more_images || []).map(uri => ({ type: 'image', uri }))),
        ...(data.video_link ? [{ type: 'video', uri: product.video_link }] : [])
    ];

    const [selectedMedia, setSelectedMedia] = useState(mediaItems[0] || null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const mediaHeight = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [maxHeight, minHeight],
        extrapolate: 'clamp',
    });


    const renderStickyMedia = () => {
        const isImage = selectedMedia?.type === 'image';
        const hasMedia = selectedMedia?.uri;

        const defaultImage = IMAGES.NO_PRODUCT_IMG

        return (
            <Animated.View
                style={[
                    styles.stickyMediaContainer,
                    {
                        height: mediaHeight,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        zIndex: 99,
                        overflow: 'visible',
                    },
                ]}
            >
                {hasMedia ? (
                    isImage ? (
                        <Image
                            source={{ uri: selectedMedia.uri }}
                            style={styles.stickyMedia}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.stickyMedia}>
                            <WebView
                                source={{ uri: selectedMedia.uri }}
                                style={styles.stickyMedia}
                                javaScriptEnabled
                                domStorageEnabled
                            />
                        </View>
                    )
                ) : (
                    <Image
                        source={defaultImage}
                        style={styles.stickyMedia}
                        resizeMode="contain"
                    />
                )}
            </Animated.View>
        );
    };



    const renderAttributes = () => {
        if (!data?.attributes?.length) return null;

        return (
            <View style={{ marginTop: verticalScale(10), paddingHorizontal: scale(15) }}>
                <TouchableOpacity
                    onPress={() => setShowAttributes(prev => !prev)}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: verticalScale(5),
                        borderColor: COLORS.grey,
                    }}
                >
                    <TextComp style={{ fontSize: scale(16), fontWeight: 'bold' }}>Specifications</TextComp>
                    <Icon
                        type="AntDesign"
                        name={showAttributes ? 'up' : 'down'}
                        size={scale(16)}
                        color={COLORS.black}
                    />
                </TouchableOpacity>

                {showAttributes && (
                    <View style={{ marginTop: verticalScale(10) }}>
                        {data.attributes.map((attr, idx) => (
                            <View
                                key={idx}
                                style={{
                                    marginBottom: verticalScale(6),
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    gap: scale(10),
                                }}
                            >
                                <TextComp
                                    style={{
                                        fontWeight: '600',
                                        color: COLORS.black,
                                        flexShrink: 0,
                                        fontSize: scale(15),
                                        maxWidth: '40%',
                                    }}
                                >
                                    {attr?.label}:
                                </TextComp>
                                <TextComp
                                    style={{
                                        color: COLORS.textGray,
                                        flex: 1,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {attr?.value}
                                </TextComp>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };



    return (
        <Wrapper bottomInsetBgColor={COLORS.secondaryAppColor} childrenStyles={{ backgroundColor: COLORS.white, flex: 1, width: width }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
                </TouchableOpacity>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={handleShare} style={{ padding: 15 }}>
                        <Icon type='Entypo' name='share' color={COLORS.secondaryAppColor} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleLike(data.id)} style={{ padding: 15 }}>
                        <Icon type='FontAwesome' name='heart' color={isLiked ? COLORS.red : COLORS.secondaryAppColor} size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, }}>
                {renderStickyMedia()}
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                >

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailRow}>
                        {mediaItems && mediaItems.length > 0 ? (
                            mediaItems.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedMedia(item)}
                                    style={[
                                        styles.thumbnailWrapper,
                                        selectedMedia?.uri === item.uri && styles.activeThumbnail
                                    ]}
                                >
                                    {item.type === 'image' ? (
                                        <Image source={{ uri: item.uri }} style={styles.thumbnail} resizeMode='contain' />
                                    ) : (
                                        <View style={styles.videoThumb}>
                                            <Icon type="Entypo" name="video" color="white" size={20} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={[styles.thumbnailWrapper, { justifyContent: 'center', alignItems: 'center' }]}>
                                <Image
                                    source={IMAGES.NO_PRODUCT_IMG}
                                    style={styles.thumbnail}
                                    resizeMode="contain"
                                />
                            </View>
                        )}
                    </ScrollView>


                    {/* Product Info */}
                    <View style={styles.infoContainer}>
                        <TextComp style={styles.title}>{data.product_name}</TextComp>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            {data.variants && data.variants.length > 0 ? (
                                <TouchableOpacity style={{ backgroundColor: COLORS.secondaryAppColor, paddingVertical: verticalScale(5), paddingHorizontal: verticalScale(8), borderRadius: 6, marginTop: verticalScale(3) }}>
                                    <TextComp style={{ color: COLORS.white }}>{`See all variants`}</TextComp>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <View>
                                        <TextComp style={styles.price}>₹{data.price || 100} <TextComp style={{
                                            fontSize: scale(10),
                                            marginLeft: 8
                                        }}
                                        >Incl GST</TextComp></TextComp>
                                        <TextComp style={{ fontSize: scale(14) }}>MRP: <TextComp style={styles.mrp}>₹{data.mrp || 200}</TextComp></TextComp>
                                    </View>
                                </>
                            )}

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={IMAGES.WARRENTY} style={{ height: verticalScale(40), width: verticalScale(40), marginRight: moderateScale(5) }} resizeMode='contain' />
                                <View style={{ backgroundColor: `#ccc`, paddingHorizontal: verticalScale(8), paddingVertical: verticalScale(3), borderRadius: 5 }}>
                                    <TextComp>{data.hsn_code || ''}</TextComp>
                                </View>
                            </View>
                        </View>
                    </View>
                    {renderAttributes()}
                    <View style={styles.descriptionContainer}>
                        <TextComp style={styles.sectionTitle}>Description</TextComp>

                        {data?.description && (
                            <RenderHtml source={{ html: data.description }} baseStyle={{fontSize:scale(14)}} contentWidth={width} />
                        )}
                        {/* <TextComp>{stripHtml(product.description)}</TextComp> */}
                    </View>
                    <TextComp>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </TextComp>
                       <TextComp>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </TextComp>
                </Animated.ScrollView>
            </View>
            <View style={styles.bottomBar}>
                <TextComp style={styles.bottomPrice}>₹{data.price}</TextComp>
                <TouchableOpacity style={styles.addToCartBtn}>
                    <TextComp style={styles.addToCartText}>Add to Cart</TextComp>
                </TouchableOpacity>
            </View>
        </Wrapper>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        height: verticalScale(50),
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(15),
        // borderBottomWidth: 0.5,
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
        height: scale(80),
        paddingVertical: verticalScale(10),
        paddingLeft: moderateScale(10),
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        marginTop:  screenHeight * 0.30
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
        fontSize: scale(16),
        fontWeight: '600',
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
    stickyMediaContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        borderBottomWidth: 1,
        borderColor: COLORS.greyOpacity(0.3),
    },
    stickyMedia: {
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
    },


});

export default SingleProductScreen;
