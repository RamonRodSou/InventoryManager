import React from "react";
import { StyleSheet, View } from "react-native";
import Product from "../Product/Product";



export default function Worked () {

    return (
        <View style={styles.container}>
            <Product/> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: '#006691',
    },

    titulo: {
        fontSize:24,
        padding:10
    }
  });
  