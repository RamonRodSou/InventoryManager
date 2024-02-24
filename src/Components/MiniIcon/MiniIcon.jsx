import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


const add = '../../../assets/Icone/MiniIcon/add.webp'
const edit = '../../../assets/Icone/MiniIcon/edit.webp'
const remove = '../../../assets/Icone/MiniIcon/remove.webp'


export default function MiniIcon({ handleMoreProduct, handleLessProduct, handleEdit }) {

    return (
        <View style={styles.container}
        >
            <TouchableOpacity
                style={styles.touchButton}
                onPress={handleMoreProduct}
            >
                <Image
                    style={styles.image}
                    source={require(add)}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchButton}
                onPress={handleEdit}

            >
                <Image
                    style={styles.image}
                    source={require(edit)}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchButton}
                onPress={handleLessProduct}
            >
                <Image
                    style={styles.image}
                    source={require(remove)}
                />
            </TouchableOpacity>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop:5,

    },
    touchButton: {
        padding: 3,

    },
    image: {
        width: 26,
        height: 26
    },
});
