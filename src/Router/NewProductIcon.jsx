import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cssColors } from '../Variavel/Css';

const NewProductIcon = React.memo(({ focused, size }) => {
  return (
    <View style={[styles.container, focused && styles.containerFocused]}>
      <MaterialCommunityIcons
        name="plus"
        color={cssColors.title}
        size={size}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: cssColors.blue,
  },
  containerFocused: {
    backgroundColor: cssColors.btn, 
    justifyContent: 'center',
    alignItems: 'center',
    width: 60, 
    height: 60, 
    borderRadius: 30, 
  },
});

export default NewProductIcon;
