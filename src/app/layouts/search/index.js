import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import Wrapper from '../../components/wrapper';
import { getSearchAction } from '../../../redux/action';
import TextInputComp from '../../components/textInputComp';
import { verticalScale } from 'react-native-size-matters';
import { width } from '../../hooks/responsive';
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

        // const payload = { search: debouncedText };
        const payload = {
            search: debouncedText
        }
        setLoading(true);

        dispatch(
            getSearchAction(payload, (res) => {
                try {
                    if (res?.status) {
                        const data = res?.data || {};
                        const categories = (data.categories || []).map((item) => ({ ...item, type: 'category' }));
                        const products = (data.products || []).map((item) => ({ ...item, type: 'product' }));
                        setResults([...categories, ...products]);
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
        if (item.type === 'product') {
            navigation.navigate(SCREEN.SINGLE_PRODUCT_SCREEN, { data: item });
        } else if (item.type === 'category') {
            navigation.navigate(SCREEN.CATEGORY_PRODUCT_SCREEN, { data: item });
        } else {
            console.warn('Unknown item type:', item.type);
        }
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
                    renderItem={renderItem}
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
