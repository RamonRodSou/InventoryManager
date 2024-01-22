import React from "react";
import { View, StyleSheet} from "react-native";
import NavegationBar from "../Navegation/Navegation";
import Worked from "../Worked/Worked";
import Top from "../Top/Top";




export default function Home () {

    return (
        <View style={styles.container}>
            <Top/>
            <Worked/>
            <NavegationBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
  });
  