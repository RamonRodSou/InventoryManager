import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { cssColors } from '../../Variavel/Css'

export default function MiniIconDelete({handleDelete, miniIconStyle, deletImg}) {

     const removeOrange = '../../../assets/Icone/MiniIcon/removeOrange.webp'
    const removeW = '../../../assets/Icone/MiniIcon/removeW.webp'


    return (
        <View style={[styles.container, miniIconStyle]}> 
            <TouchableOpacity
                style={styles.touchButton}
                onPress={handleDelete}
            >
                <Image
                    style={[styles.image]}
                    source={deletImg ? require(removeOrange) : require(removeW)} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    touchButton: {
        padding: 3,

    },
    image: {
        width: 22,
        height: 22
    }
});
