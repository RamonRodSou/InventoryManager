import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function MiniIconImage({handle, miniIconStyle, source}) {

    return (
        <View style={[styles.container, miniIconStyle]}> 
            <TouchableOpacity
                style={styles.touchButton}
                onPress={handle}
            >
                <Image
                    style={[styles.image]}
                    source={source}
                />
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
