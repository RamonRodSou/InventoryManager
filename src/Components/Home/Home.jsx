import React from "react";
import { View, StyleSheet} from "react-native";
import Worked from "../Worked/Worked";

export default function Home () {

    return (
        <View style={styles.container}>
            <Worked/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#042B3B',
    },
  });
  