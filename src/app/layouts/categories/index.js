import { View, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../../components/wrapper'
import { width } from '../../hooks/responsive'
import StaticeHeader from '../../components/staticeHeader'
import { SCREEN } from '..'
import { scale, verticalScale } from 'react-native-size-matters'
import TextComp from '../../components/textComp'
import { COLORS } from '../../../res/colors'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCategoryAction } from '../../../redux/action'
import { useNavigation } from '@react-navigation/native'

const Categories = () => {
  const dispatch = useDispatch()
  const navigation=useNavigation()
  const categories1 = useSelector(state => state.category.categories) || [];
  const [data, setData] = useState(categories1 || [])
  const buttonPress = () => {
    const payload = {
      category_id: '2'
    }
    dispatch(getProductsByCategoryAction(payload, (response) => {
      console.log(`response of products--------->>>>>>>>>${response?.data}`);

    }))
  }
  return (
    <Wrapper useTopInsets={true} childrenStyles={{ width: width * 0.96 }} safeAreaContainerStyle={{}}>
      <StaticeHeader showFilterIcon={false} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingBottom: verticalScale(100) }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: verticalScale(16) }}>
          {Array.isArray(data) && data.map((cat) => (
            <TouchableOpacity activeOpacity={0.7}
              key={cat.id}
              onPress={() => { navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: cat }) }}
              style={{
                width: (width - scale(13) * 2) / 3 - scale(4), // Adjusted width with scale(13) padding
                alignItems: 'center',
                marginVertical: verticalScale(5),

              }}
            >
              <Image
                source={{ uri: cat.image }}
                style={{
                  height: scale(92),
                  width: scale(90),
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
        {/* <Button title='Button' onPress={buttonPress} /> */}
        <View style={{ height: verticalScale(80) }} />
      </ScrollView>
      {/* <Button title='Button' onPress={buttonPress} /> */}
      {/* <FlatList
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        numColumns={1}

        data={products}
        key={(item) => { item.id }}
        // keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
      /> */}
      {/* <Image source={IMAGES.BLACK_LOGO_WITH_TEXT} style={{height:50,width:50}}/>
        <View style={{}}/> */}
    </Wrapper>
  )
}

export default Categories