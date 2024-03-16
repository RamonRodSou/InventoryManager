import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { cssColors } from '../../Variavel/Css'

const Btn = ({ name, OnP, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={OnP}>
            <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: cssColors.btn,
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        width: '100%',

    },

})
export default Btn