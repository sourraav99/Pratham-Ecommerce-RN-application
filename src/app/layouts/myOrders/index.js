import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Icon from '../../../utils/icon';
import { COLORS } from '../../../res/colors';
import { width } from '../../hooks/responsive';
import TextComp from '../../components/textComp';
import Wrapper from '../../components/wrapper';
import { IMAGES } from '../../../res/images';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '..';

const MyOrders = () => {
  const navigation = useNavigation()
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Replace these with real API calls
      const current = await fetchCurrentOrders();
      const past = await fetchPastOrders();
      setCurrentOrders(current);
      setPastOrders(past);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  // Dummy API simulation
  const fetchCurrentOrders = async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        {
          orderId: "ORD123456",
          isCashPayment: true,
          noOfItems: 3,
          date: "2025-04-28",
          time: "14:30",
          amount: 249.99,
          arrivalDate: "2025-05-5",
        },
        {
          orderId: "ORD12343u",
          isCashPayment: false,
          noOfItems: 3,
          date: "2025-04-28",
          time: "14:30",
          amount: 249.99,
          arrivalDate: "2025-05-5",
        },
      ]);
    }, 500));
  };

  const fetchPastOrders = async () => {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        {
          orderId: "ORD123457",
          isCashPayment: false,
          noOfItems: 5,
          date: "2025-04-25",
          time: "10:15",
          amount: 599.0,
          isCancelled: true
        },
        {
          orderId: "ORD123458",
          isCashPayment: true,
          noOfItems: 2,
          date: "2025-04-20",
          time: "18:45",
          amount: 149.5,
          isCancelled: false
        },
        {
          orderId: "ORD123456",
          isCashPayment: false,
          noOfItems: 5,
          date: "2025-04-25",
          time: "10:15",
          amount: 599.0,
          isCancelled: true
        },
        {
          orderId: "ORD123455",
          isCashPayment: true,
          noOfItems: 2,
          date: "2025-04-20",
          time: "18:45",
          amount: 149.5,
          isCancelled: false
        },
      ]);
    }, 700));
  };

  const getDayMonth = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    return { day, month };
  };

  const renderCurrentOrder = (item) => {
    const { day, month } = getDayMonth(item.date);
    const isExpanded = expandedOrderId === item.orderId;
  
    return (
      <View key={item.orderId}>
        <Pressable
          onPress={() => {
            setExpandedOrderId(isExpanded ? null : item.orderId);
          }}
          style={({ pressed }) => ({
            padding: moderateScale(10),
            marginVertical: verticalScale(5),
            backgroundColor: pressed ? COLORS.greyOpacity(0.1) : COLORS.white,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: COLORS.secondaryAppColor,
            flexDirection: 'row',
            alignItems: 'center',
            opacity: pressed ? 0.8 : 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: scale(4),
            elevation: 3,
            overflow: 'hidden',
          })}
        >
          <Image
            source={item.isCashPayment ? IMAGES.CASH : IMAGES.CREDIT}
            style={{
              width: verticalScale(70),
              height: verticalScale(70),
              tintColor: COLORS.black,
            }}
            resizeMode="contain"
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: `87%`,
              }}
            >
              <TextComp
                style={{
                  color: COLORS.secondaryAppColor,
                  fontSize: scale(16),
                }}
              >{`Order: ${item.orderId}`}</TextComp>
              <View style={{ alignItems: 'center' }}>
                <TextComp
                  style={{
                    fontSize: scale(18),
                    fontWeight: 'bold',
                    color: COLORS.secondaryAppColor,
                  }}
                >
                  {day}
                </TextComp>
                <TextComp
                  style={{
                    fontSize: scale(12),
                    color: COLORS.secondaryAppColor,
                  }}
                >
                  {month}
                </TextComp>
              </View>
            </View>
            <TextComp
              style={{
                color: COLORS.secondaryAppColor,
                fontSize: scale(12),
              }}
            >{`Items: ${item.noOfItems}`}</TextComp>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: `87%`,
              }}
            >
              <TextComp
                style={{
                  color: COLORS.secondaryAppColor,
                  fontSize: scale(12),
                }}
              >{`${item.date} • ${item.time}`}</TextComp>
              <TextComp style={{ color: COLORS.secondaryAppColor }}>{`₹${item.amount}`}</TextComp>
            </View>
          </View>
        </Pressable>
  
        {/* BUTTONS OUTSIDE THE CARD */}
        {isExpanded && (
          <View
            style={{
              marginTop: verticalScale(5),
              marginBottom: verticalScale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10),
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primaryAppColor,
                padding: scale(8),
                borderRadius: 100,
                flex: 1,
                marginRight: scale(5),
                alignItems: 'center',
              }}
              onPress={() => {navigation.navigate(SCREEN.ORDER_STATUS, { data:item});}}
            >
              <TextComp style={{ color: COLORS.white }}>Track Order</TextComp>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.secondaryAppColor,
                padding: scale(8),
                borderRadius: 100,
                flex: 1,
                marginLeft: scale(5),
                alignItems: 'center',
              }}
              onPress={() => console.log('Cancel order')}
            >
              <TextComp style={{ color: COLORS.white }}>Cancel Order</TextComp>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  
  const renderPastOrder = (item) => (
    <Pressable
      key={item.orderId}
      style={({ pressed }) => ({
        padding: moderateScale(10),
        marginVertical: verticalScale(5),
        backgroundColor: pressed ? COLORS.greyOpacity(0.1) : COLORS.white, // Press effect
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.secondaryAppColor,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: pressed ? 0.8 : 1, // optional visual feedback
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: scale(4),
        elevation: 3, // for Android
        overflow: 'hidden'
      })}
    >
      <View style={{ marginRight: verticalScale(10), width: verticalScale(70), height: verticalScale(70), backgroundColor: COLORS.black, alignItems: 'center', justifyContent: 'center', borderRadius: verticalScale(70) / 2 }}>
        <Image
          source={item.isCashPayment ? IMAGES.CASH : IMAGES.CREDIT}
          style={{ width: verticalScale(35), height: verticalScale(35), tintColor: COLORS.white }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
          <TextComp style={{ color: COLORS.secondaryAppColor, fontSize: scale(16) }}>{`Order: ${item.orderId}`}</TextComp>
          <View style={{ alignItems: 'center' }}>
            {item.isCancelled ?
              (<Icon type='Entypo' name={`circle-with-cross`} color={COLORS.red} size={18} />) :
              (<Icon type='AntDesign' name={`checkcircle`} color={COLORS.green} size={16} />)
            }
            <TextComp style={{ fontSize: scale(8), color: COLORS.secondaryAppColor }}>{`${item.isCancelled ? `Cancelled` : `Delivered`}`}</TextComp>
          </View>
        </View>
        <TextComp style={{ color: COLORS.secondaryAppColor, fontSize: scale(12) }}>{`Items: ${item.noOfItems}`}</TextComp>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextComp style={{ color: COLORS.secondaryAppColor, fontSize: scale(12) }}>{`${item.date} • ${item.time}`}</TextComp>
          <TextComp style={{ color: COLORS.secondaryAppColor }}>{`₹${item.amount}`}</TextComp>
        </View>
      </View>
    </Pressable>
  );


  return (
    <Wrapper childrenStyles={{ backgroundColor: 'white', flex: 1, width: width * 0.94 }}>
      <View style={{ height: verticalScale(50), width: width, alignSelf: 'center', paddingLeft: moderateScale(15), flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ left: 30 }} style={{ backgroundColor: COLORS.secondaryAppColor, height: verticalScale(30), width: verticalScale(30), borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={'arrowleft'} color={COLORS.white} size={scale(22)} type='AntDesign' />
        </TouchableOpacity>
        <TextComp style={{ fontSize: scale(20), paddingLeft: 13, fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`My Orders`}</TextComp>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primaryAppColor} style={{ marginTop: verticalScale(20) }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(20) }}>
          {currentOrders.length > 0 && (
            <>
              <TextComp style={{ marginTop: verticalScale(20), fontSize: scale(17), fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`Current Orders`}</TextComp>
              {currentOrders.map(renderCurrentOrder)}
            </>
          )}

          {pastOrders.length > 0 && (
            <>
              <TextComp style={{ marginTop: verticalScale(20), fontSize: scale(17), fontWeight: 'bold', color: COLORS.secondaryAppColor }}>{`Last Orders`}</TextComp>
              {pastOrders.map(renderPastOrder)}
            </>
          )}

        </ScrollView>
      )}
    </Wrapper>
  );
};

export default MyOrders;
