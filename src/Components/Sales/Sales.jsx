import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { cssColors } from '../../Variavel/Css'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Sales = () => {
    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={cssColors.gradientColors} style={[styles.container, styles.transparentBackground]}>
            <View>
                <Text style={{fontSize:45}}>
                    Manutenção!
                </Text>
            </View>
        </LinearGradient >
    </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    transparentBackground: {
        backgroundColor: 'transparent',
    },
})
export default Sales
