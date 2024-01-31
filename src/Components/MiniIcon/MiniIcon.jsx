import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const add = '../../../assets/Icone/MiniIcon/add.webp'
const delet = '../../../assets/Icone/MiniIcon/delete.webp'
const edit = '../../../assets/Icone/MiniIcon/edit.webp'
const remove = '../../../assets/Icone/MiniIcon/remove.webp'


export default function MiniIcon ({handleMoreProduct, handleLessProduct}) {

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
                onPress={handleLessProduct}
                
            >
                <Image 
                    style={styles.image}
                    source={require(remove)}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchButton}>
                <Image 
                    style={styles.image}
                    source={require(edit)}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchButton}>
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
      flexDirection:'row',
      justifyContent: 'space-between',
      width:'100%',
    },
    touchButton: {
        padding:3,
        borderWidth: 1,
        borderColor: '#002266',
        borderRadius: 5,
    },
    image: {
        width:20,
        height:20
    }
  });
  