import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../res/colors'; // Assuming static colors
import Icon from '../../utils/icon';


const TextInputComp = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconRightName,
  iconRightType = 'MaterialIcons',
  onIconPress,
  iconRightColor,
  secureTextEntry = false,
  style,
  inputStyle,
  labelStyle,
  ...props
}) => {
  return (
    <View style={style}>
      {label && (
        <Text style={[styles.label, { color: COLORS.primaryTextColor }, labelStyle]}>
          {label}
        </Text>
      )}
      <View style={[styles.container, { borderColor: COLORS.borderColor }]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.secondaryTextColor}
          secureTextEntry={secureTextEntry}
          style={[styles.input, { color: COLORS.primaryTextColor }, inputStyle]}
          {...props}
        />
        {iconRightName && (
          <TouchableOpacity onPress={onIconPress} style={styles.icon}>
            <Icon
              name={iconRightName}
              type={iconRightType}
              color={iconRightColor || COLORS.primaryAppColor}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  container: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  icon: {
    marginLeft: 8,
  },
});

export default TextInputComp;
