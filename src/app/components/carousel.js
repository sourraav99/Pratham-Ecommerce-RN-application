import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { width, height } from '../hooks/responsive';

const Carousel = ({ data = [], onPressItem = () => { }, interval = 3000, borderRadius = 20 }) => {
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!data.length) return;

        const timer = setInterval(() => {
            let nextIndex = (currentIndex + 1) % data.length;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, data.length]);

    const renderItem = ({ item, index }) => (
        <View  style={{
            width: width,
            alignItems:'center',
            justifyContent:'center'
        }}>
            <TouchableOpacity
            
            onPress={() => onPressItem(item, index)} activeOpacity={0.8}>
                <Image
                  source={{ uri: item.banner_image }}
                    style={{
                        width: width*0.92,
                        // width:`100%`,
                        height: height * 0.2,
                        borderRadius,
                    }}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ alignSelf: 'center' }}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />
        </View>
    );
};

export default Carousel;
