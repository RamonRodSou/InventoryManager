import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home/Home';
import NewProduct from '../Components/NewProduct/NewProduct';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryPage from '../Components/Category/CategoryPage';
import { ProductContext } from '../contexts/product';
import Galery from '../Components/Galery/Galery';
import { StyleSheet } from 'react-native';
import { cssColors } from '../Variavel/Css';
import Sales from '../Components/Sales/Sales';
import NewProductIcon from './NewProductIcon';

const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <Home />
    )
}

const RegisterNewProduct = () => {
    return (
        <NewProduct />
    )
}

const RegisterNewCategory = () => {
    return (
        <CategoryPage />
    )
}

const GaleryTabImg = () => {
    return (
        <Galery />
    )
}
const SalesPage = () => {
    return (
        <Sales />
    )
}

const Router = () => {

    const { setEditCategory } = useContext(ProductContext);
    const CategoryEdit = (state) => {
        setEditCategory(state)
    }

    return (
        <Tab.Navigator
            screenOptions={{
                showLabel: false,
                tabBarStyle: {
                    margin: 10,
                    backgroundColor: cssColors.title,
                    borderRadius: 15,
                    height: 50,
                    ...styles.shadow,
                },
                headerShown: false,
                tabBarShowLabel: false,
            }}

        >

            <Tab.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    ),
                }}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(false)
                    },
                })}
            />

            <Tab.Screen
                name="Category"
                component={RegisterNewCategory}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(true)

                    },
                })}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="layers"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Product"
                component={RegisterNewProduct}
                options={{
                    tabBarIcon: ({ focused, size }) => (
                        <NewProductIcon focused={focused} size={size} />
                    )
                }}
                listeners={({ route }) => ({
                    tabPress: (e) => {
                        CategoryEdit(false);
                    },
                })}
            />
            <Tab.Screen
                name="Galery"
                component={GaleryTabImg}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="image"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Sales"
                component={SalesPage}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="cash-multiple"
                            color={focused ? '#40cfff' : color}
                            size={size}
                        />
                    )
                }}
            />
        </Tab.Navigator>

    )
}


const styles = StyleSheet.create({
    container: {
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },

})

export default Router


