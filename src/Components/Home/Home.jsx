import React from "react";
import { View, StyleSheet} from "react-native";
import Product from "../Product/Product";

export default function Home () {

    return (
        <View style={styles.container}>
            <Product/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#006691',
    },
  });
  