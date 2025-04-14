import { View, Text } from 'react-native'
import React from 'react'
import Wrapper from '../../components/wrapper'
import { width } from '../../hooks/responsive'
import StaticeHeader from '../../components/staticeHeader'

const Categories = () => {
    return (
        <Wrapper useTopInsets={true} childrenStyles={{ width: width }} safeAreaContainerStyle={{}}>
      <StaticeHeader />
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