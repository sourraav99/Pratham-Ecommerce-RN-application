import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Wrapper from '../../components/wrapper'
import { width } from '../../hooks/responsive'
import StaticeHeader from '../../components/staticeHeader'
import { SCREEN } from '..'
import { scale, verticalScale } from 'react-native-size-matters'
import TextComp from '../../components/textComp'
import { COLORS } from '../../../res/colors'

const Categories = () => {
  const categories = [
    { id: 1, name: 'Electronics', image: 'https://picsum.photos/60?random=1' },
    { id: 2, name: 'Fashion', image: 'https://picsum.photos/60?random=2' },
    { id: 3, name: 'Home', image: 'https://picsum.photos/60?random=3' },
    { id: 4, name: 'Beauty', image: 'https://picsum.photos/60?random=4' },
    { id: 5, name: 'Toys', image: 'https://picsum.photos/60?random=5' },
    { id: 6, name: 'Groceries', image: 'https://picsum.photos/60?random=6' },
    { id: 7, name: 'Books', image: 'https://picsum.photos/60?random=7' },
    { id: 8, name: 'Fitness', image: 'https://picsum.photos/60?random=8' },
    { id: 9, name: 'Fitness2', image: 'https://picsum.photos/60?random=8' },
  ];
    return (
        <Wrapper useTopInsets={true} childrenStyles={{ width: width*0.96 }} safeAreaContainerStyle={{}}>
      <StaticeHeader showFilterIcon={false}/>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' ,marginTop:verticalScale(16)}}>
          {categories.map((cat) => (
            <TouchableOpacity activeOpacity={0.7}
              key={cat.id}
              // onPress={() => { navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: cat.name }) }}
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
                  overflow:'hidden'
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