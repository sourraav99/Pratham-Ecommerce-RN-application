import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Icon from '../../utils/icon'; // AntDesign assumed
import TextComp from './textComp';
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../res/colors';

const filterOptions = ['Brand', 'Price'];

const brandsList = ['Havells', 'Siemens', 'Bajaj', 'Polycab', 'V-Guard'];
const priceRanges = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'];

const FilterModal = ({ visible, onClose }) => {
    const [selectedFilter, setSelectedFilter] = useState('Brand');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const handleApply = () => {
        const filterData = {
            brands: selectedBrands,
            price: selectedPrice,
        };
        console.log('Applied Filters:', filterData);
        onClose();
    };

    const handleClear = () => {
        setSelectedBrands([]);
        setSelectedPrice(null);
    };

    const renderFilterContent = () => {
        switch (selectedFilter) {
            case 'Brand':
                return (
                    <View style={styles.optionContainer}>
                        {brandsList.map((brand) => (
                            <TouchableOpacity
                                key={brand}
                                onPress={() => toggleBrand(brand)}
                                style={styles.checkboxRow}
                            >
                                 <TextComp style={styles.checkboxLabel}>{brand}</TextComp>
                                <Icon
                                    type="AntDesign"
                                    name={selectedBrands.includes(brand) ? 'checkcircle' : 'checkcircleo'}
                                    size={20}
                                    color={selectedBrands.includes(brand) ? COLORS.primaryAppColor : '#ccc'}
                                />
                               
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            case 'Price':
                return (
                    <View style={styles.optionContainer}>
                        {priceRanges.map((range) => (
                            <TouchableOpacity
                                key={range}
                                onPress={() => setSelectedPrice(range)}
                                style={styles.checkboxRow}
                            >
                                <Icon
                                    type="AntDesign"
                                    name={selectedPrice === range ? 'checkcircle' : 'checkcircleo'}
                                    size={20}
                                    color={selectedPrice === range ? COLORS.primaryAppColor : '#ccc'}
                                />
                                <TextComp style={styles.checkboxLabel}>{range}</TextComp>
                            </TouchableOpacity>
                        ))}
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>

                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Icon type="AntDesign" name="close" size={24} />
                        </TouchableOpacity>
                        <TextComp style={styles.headerTitle}>Filter</TextComp>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Body */}
                    <View style={styles.body}>
                        {/* Left filter list */}
                        <View style={styles.leftPanel}>
                            {filterOptions.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => setSelectedFilter(item)}
                                    style={[
                                        styles.filterItem,
                                        selectedFilter === item && styles.activeFilterItem,
                                    ]}
                                >
                                    {selectedFilter === item && <View style={styles.activeBar} />}
                                    <TextComp style={{ color: selectedFilter === item ? '#000' : '#666',fontWeight:selectedFilter === item ? '700' : '500' }}>{item}</TextComp>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Right content */}
                        <ScrollView style={styles.rightPanel}>
                            {renderFilterContent()}
                        </ScrollView>
                    </View>

                    {/* Footer */}
                    <View style={[styles.footer,{paddingBottom:verticalScale(28)}]}>
                        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
                            <TextComp style={{ color: COLORS.white }}>Clear</TextComp>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                            <TextComp style={{ color: COLORS.secondaryAppColor }}>Apply</TextComp>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        height: '90%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: scale(21),
        fontWeight: 'bold',
        // marginLeft:5
        color:COLORS.secondaryAppColor
    },
    body: {
        flexDirection: 'row',
        flex: 1,
    },
    leftPanel: {
        width: '30%',
        backgroundColor: '#f0f0f0',
    },
    rightPanel: {
        width: '70%',
        padding: 10,
    },
    filterItem: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeFilterItem: {
        backgroundColor: '#e0e0e0',
    },
    activeBar: {
        width: 5,
        height: '100%',
        backgroundColor: COLORS.primaryAppColor,
        marginRight: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    optionContainer: {
        paddingVertical: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent:'space-between',
        paddingRight:7
    },
    checkboxLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor:COLORS.secondaryAppColor
    },
    clearBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 8,
    },
    applyBtn: {
        backgroundColor: COLORS.yellow,
        // paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems:'center',
        justifyContent:'center'
    },
});

export default FilterModal;

