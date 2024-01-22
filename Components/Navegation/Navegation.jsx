import React from "react";
import { StyleSheet, View } from "react-native";
import Menu from "../Menu/Menu";

export default function NavegationBar () {

    return (
        <View style={styles.container}>
            <Menu/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      justifyContent: 'center',
      backgroundColor: '#000',
    },
  });
  