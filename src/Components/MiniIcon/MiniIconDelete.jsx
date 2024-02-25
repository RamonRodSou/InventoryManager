import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
const delet = '../../../assets/Icone/MiniIcon/delet.webp'

export default function MiniIconDelete({handleDelete}) {
    return (
        <View>
            <TouchableOpacity
                style={styles.touchButton}
                onPress={handleDelete}
            >
                <Image
                    style={styles.image}
                    source={require(delet)}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    touchButton: {
        padding: 3,
    },
    image: {
        width: 22,
        height: 22
    }
});
