import { StyleSheet } from 'react-native';
import Router from './src/Router/Router';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Home/>
    // </View>

    <NavigationContainer style={styles.container}>
      <Router/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042B3B',

  },
});
