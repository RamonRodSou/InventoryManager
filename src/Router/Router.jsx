import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/Home';
import NewProduct from '../Components/NewProduct/NewProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <Home/>
    )
}

const RegisterNewProduct = () => {
    return (
        <NewProduct/>
    )
}

const Router = () => {
  return (
    <Tab.Navigator initialRouteName="Feed"
    tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray', 
        tabBarStyle: {
            backgroundColor: 'red', 
          },
      }}
      
      >
        <Tab.Screen 
            name="Home" 
            component={HomePage} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen 
            name="Cadastrar" 
            component={RegisterNewProduct}
            options={{
            tabBarLabel: 'New',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus" color={color} size={size} />
            )
            }}
        />
    </Tab.Navigator>
  )
}

  
export default Router