import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '../../../utils/icon';
import { COLORS } from '../../../res/colors';
import { width } from '../../hooks/responsive';
import TextComp from '../../components/textComp';
import Wrapper from '../../components/wrapper';
import { IMAGES } from '../../../res/images';
import { useNavigation } from '@react-navigation/native';
import { productsData } from '../../../utils/data';

const Cart = () => {
  const [products, setProducts] = useState(productsData || []);
  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'credit'

  const renderFooter = () => {
    return (

      <View style={{ paddingHorizontal: moderateScale(16), paddingVertical: verticalScale(10), }}>
        <View style={{ marginBottom: verticalScale(15) }}>
          <TextComp style={{ fontSize: scale(16), fontWeight: 'bold', marginBottom: verticalScale(8) }}>
            Select Payment Method
          </TextComp>

          <TouchableOpacity
            onPress={() => setPaymentMethod('cash')}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(8) }}
          >
            <Icon
              type='MaterialIcons'
              name={paymentMethod === 'cash' ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={20}
              color={COLORS.primaryAppColor}
            />
            <TextComp style={{ marginLeft: moderateScale(10), fontSize: scale(14), color: COLORS.secondaryAppColor }}>
              Buy on Cash
            </TextComp>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPaymentMethod('credit')}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon
              type='MaterialIcons'
              name={paymentMethod === 'credit' ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={20}
              color={COLORS.primaryAppColor}
            />
            <TextComp style={{ marginLeft: moderateScale(10), fontSize: scale(14), color: COLORS.secondaryAppColor }}>
              Buy on Credit
            </TextComp>
          </TouchableOpacity>
        </View>

        <TextComp style={{ fontSize: scale(18), fontWeight: 'bold', marginBottom: scale(5) }}>
          Price Details
        </TextComp>
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            borderStyle: 'dashed',
            marginBottom: verticalScale(10),
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextComp>Subtotal</TextComp>
          <TextComp>₹999</TextComp>
        </View>



        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextComp>Discount</TextComp>
          <TextComp>-₹100</TextComp>
        </View>
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            borderStyle: 'dashed',
            marginTop: verticalScale(50)
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(10) }}>
          <TextComp style={{ fontWeight: 'bold' }}>Total</TextComp>
          <TextComp style={{ fontWeight: 'bold' }}>₹899</TextComp>
        </View>
      </View>
    );
  };


  const renderProductItem = ({ item }) => {
    // const isLiked = likedItems.includes(item._id);
    return (

      <View style={{ width: width, alignSelf: 'center', backgroundColor: COLORS.greyOpacity(0.2) }}>
        <View
          style={{
            flexDirection: 'row',
            // borderTopWidth: 1,
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.greyOpacity(1),
            overflow: 'hidden',

          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: width * 0.92 * 0.4,
              height: verticalScale(100),
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
                <TextComp numberOfLines={2} style={{ fontSize: scale(13), fontWeight: `500`, color: COLORS.secondaryAppColor }}>
                  {item.description}
                </TextComp>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    
  
                    {/* <TouchableOpacity style={{ backgroundColor: COLORS.black, position: 'absolute', right: -10, borderRadius: scale(30), paddingHorizontal: scale(14), paddingVertical: scale(9) }}>
                      <TextComp style={{ fontSize: scale(10), color: COLORS.white, }}>Add to cart</TextComp>
                    </TouchableOpacity> */}
                {/* </View> */}
                <View style={{ flexDirection: 'row' }}>
                  <TextComp style={{ fontSize: scale(12), color: COLORS.secondaryAppColor }}>{`Size:${item.mainSize.value}${item.mainSize.unit}`}
                  </TextComp>
                  {/* <TextComp onPress={() => {
                    setSelectedProduct(item);
                    setShowVariantModal(true);
                  }} style={{ marginLeft: scale(6), fontSize: scale(12), color: COLORS.blue, fontWeight: '800' }}>{`More`}
                  </TextComp> */}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: moderateScale(10) }}>
                  <TextComp style={{ fontSize: scale(15), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item.price}`}
                  </TextComp>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <TextComp style={{ fontSize: scale(10), paddingRight: 5, color: COLORS.secondaryAppColor }}>total Amount</TextComp>
                    <TextComp style={{ fontSize: scale(15), fontWeight: `900`, color: COLORS.secondaryAppColor }}>{`₹${item.price}`}
                    </TextComp>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          height: verticalScale(43), width: width, backgroundColor: COLORS.primaryAppColor,
          //  shadowColor: '#000',
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.1,
          // shadowRadius: scale(4),
          // elevation: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(10),
          marginBottom: 14
        }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>
            <Icon type='EvilIcons' name={`trash`} color={COLORS.white} size={20} />
            <TextComp style={{ color: COLORS.white }}>{`Remove`}</TextComp>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ padding: 8 }}>
              <Icon type='AntDesign' name={`minus`} color={COLORS.white} size={22} />
            </TouchableOpacity>
            <TextComp style={{ fontSize: scale(20), color: COLORS.white, paddingHorizontal: moderateScale(8) }}>{`5`}</TextComp>
            <TouchableOpacity style={{ padding: 8 }}>
              <Icon type='AntDesign' name={`plus`} color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

  }
  return (
    <Wrapper childrenStyles={{ backgroundColor: 'white', flex: 1, width: width }}>
      <View style={{ height: verticalScale(50), width: width, alignSelf: 'center', paddingLeft: moderateScale(15), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 0.5, borderColor: COLORS.greyOpacity(0.5) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <TouchableOpacity hitSlop={{ left: 30 }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
          </TouchableOpacity> */}
          <TextComp style={{ fontSize: scale(24), paddingLeft: 13, fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`Cart`}</TextComp>
        </View>
        <TouchableOpacity style={{ backgroundColor: COLORS.red, paddingVertical: 8, paddingHorizontal: 8, borderRadius: 100, marginRight: moderateScale(16), marginTop: verticalScale(3) }}>
          <TextComp style={{ fontSize: scale(12), color: COLORS.white }}>{`Remove all`}</TextComp>
        </TouchableOpacity>
      </View>
      <FlatList
        // ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        ListFooterComponent={renderFooter}
        data={products}
        key={(item) => { item.id }}
        // keyExtractor={(item) => item.id}
        renderItem={renderProductItem}

        contentContainerStyle={{ paddingBottom: verticalScale(110) }}
      />
     <View style={{    position: 'absolute', bottom: -1,
        elevation: 15,

     }}>
     <View style={{
        // position: 'absolute',
       
        width: width,
        backgroundColor: 'lightblue',
        paddingVertical: verticalScale(10),
        paddingHorizontal: moderateScale(16),
        borderTopLeftRadius: scale(12),
        borderTopRightRadius: scale(12),
        borderColor: 'skyblue',
        // #D4EDDA,#C3E6CB
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: scale(4),
      }}>
        <TextComp style={{ color: '#155724', fontWeight: 'bold', fontSize: scale(14) }}>
          You saved ₹2500 on this order!
        </TextComp>
        <Icon type='Feather' name='check-circle' color={'#155724'} size={20} />
      </View>
      <View style={styles.bottomBar}>
        {/* <TextComp style={styles.bottomPrice}>₹{product.price}</TextComp> */}
        <TextComp style={styles.bottomPrice}>₹{`700`}</TextComp>
        <TouchableOpacity style={styles.addToCartBtn}>
          <TextComp style={styles.addToCartText}>Proceed to buy</TextComp>
        </TouchableOpacity>
      </View>
     </View>

    </Wrapper>
  )
}

export default Cart

const styles = StyleSheet.create({
  bottomBar: {

    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.secondaryAppColor,
    // borderTopWidth: 0.5,
    // borderColor: '#ccc',
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

})