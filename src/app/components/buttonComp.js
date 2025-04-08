import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../../res/colors';
import { scale, verticalScale } from 'react-native-size-matters';

const ButtonComp = ({
  title,
  onPress,
  image,
  buttonStyle,
  textStyle,
  imageStyle,
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        fullWidth && { width: '100%' },
        isDisabled && styles.disabledButton,
        buttonStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <View style={styles.content}>
          {image && <Image source={image} style={[styles.image, imageStyle]} resizeMode="contain" />}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryAppColor,
    // paddingVertical: 12,
    // paddingHorizontal: 16,
    height:verticalScale(44),
    borderRadius: scale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
});
